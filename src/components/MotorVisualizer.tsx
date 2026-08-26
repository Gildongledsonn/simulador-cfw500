import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useInverter } from '../context/InverterContext';

interface MotorVisualizerProps {
  loadTorquePercent?: number;
}

export const MotorVisualizer: React.FC<MotorVisualizerProps> = ({ loadTorquePercent = 0 }) => {
  const { state } = useInverter();
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Referência sempre atualizada do state
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Referências do Three.js
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const shaftGroupRef = useRef<THREE.Group | null>(null);

  // Controle de rotação da câmera (Orbital)
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cameraAngleRef = useRef<{ theta: number; phi: number; radius: number }>({
    theta: Math.PI / 4,
    phi: Math.PI / 3,
    radius: 4.2,
  });

  const freq = Number(state.outputFrequency ?? 0);
  const isRunning = state.motorStatus === 'RUNNING' || freq > 0.1;
  const targetRpm = Math.round((freq / 60) * 1750);
  const currentAmps =
    state.outputCurrent ?? (isRunning ? (1.2 + (freq / 60) * 3.3).toFixed(1) : '0.0');

  const updateCameraPosition = () => {
    if (!cameraRef.current) return;
    const { theta, phi, radius } = cameraAngleRef.current;
    cameraRef.current.position.x = radius * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = radius * Math.cos(phi);
    cameraRef.current.position.z = radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(0, 0, 0);
  };

  const createNameplateTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.fillStyle = '#dcdde1';
      ctx.fillRect(0, 0, 512, 256);

      ctx.strokeStyle = '#2f3640';
      ctx.lineWidth = 6;
      ctx.strokeRect(6, 6, 500, 244);

      ctx.fillStyle = '#005ea6';
      ctx.fillRect(10, 10, 492, 45);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px Arial, sans-serif';
      ctx.fillText('WEG', 20, 42);

      ctx.font = 'bold 18px Arial, sans-serif';
      ctx.fillText('MOTOR DE INDUÇÃO TRIFÁSICO - W22', 100, 40);

      ctx.fillStyle = '#1e272e';
      ctx.font = 'bold 15px monospace';

      ctx.fillText('MOD: W22 Plus IE3', 20, 80);
      ctx.fillText('POTÊNCIA: 1.5 cv (1.1 kW)', 260, 80);

      ctx.fillText('TENSÃO: 220 / 380 V', 20, 110);
      ctx.fillText('CORRENTE: 4.50 / 2.60 A', 260, 110);

      ctx.fillText('FREQ: 60 Hz   FS: 1.15', 20, 140);
      ctx.fillText('ROTAÇÃO: 1750 RPM', 260, 140);

      ctx.fillText('REND(η): 84.5%   COS φ: 0.81', 20, 170);
      ctx.fillText('ISOL: Cl. F (ΔT 80K)', 260, 170);

      ctx.fillText('GRAU PROT: IP55', 20, 200);
      ctx.fillText('REGIME: S1 CONTÍNUO', 260, 200);

      ctx.fillStyle = '#718093';
      ctx.font = '12px Arial';
      ctx.fillText('FABRICADO NO BRASIL - NBR 17094', 20, 235);
      ctx.fillText('DATA: 2026', 380, 235);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    return texture;
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 300;
    const height = mountRef.current.clientHeight || 250;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#0a0d12');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    cameraRef.current = camera;
    updateCameraPosition();

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x81d4fa, 0.6);
    dirLight2.position.set(-5, -2, -5);
    scene.add(dirLight2);

    const wegBlueMaterial = new THREE.MeshStandardMaterial({
      color: 0x005ea6,
      roughness: 0.35,
      metalness: 0.25,
    });

    const castIronMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e272e,
      roughness: 0.6,
      metalness: 0.4,
    });

    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0xdcdde1,
      roughness: 0.2,
      metalness: 0.85,
    });

    const pulleyMaterial = new THREE.MeshStandardMaterial({
      color: 0x2f3640,
      roughness: 0.4,
      metalness: 0.7,
    });

    const motorGroup = new THREE.Group();
    scene.add(motorGroup);

    // Carcaça
    const statorGeo = new THREE.CylinderGeometry(0.85, 0.85, 1.8, 32);
    statorGeo.rotateZ(Math.PI / 2);
    const statorMesh = new THREE.Mesh(statorGeo, wegBlueMaterial);
    motorGroup.add(statorMesh);

    // Aletas
    for (let i = -0.7; i <= 0.7; i += 0.14) {
      const finGeo = new THREE.CylinderGeometry(0.92, 0.92, 0.04, 32);
      finGeo.rotateZ(Math.PI / 2);
      const finMesh = new THREE.Mesh(finGeo, wegBlueMaterial);
      finMesh.position.x = i;
      motorGroup.add(finMesh);
    }

    // Tampa Defletora
    const fanCoverGeo = new THREE.CylinderGeometry(0.86, 0.86, 0.5, 32);
    fanCoverGeo.rotateZ(Math.PI / 2);
    const fanCoverMesh = new THREE.Mesh(fanCoverGeo, castIronMaterial);
    fanCoverMesh.position.x = -1.1;
    motorGroup.add(fanCoverMesh);

    // Caixa de Ligação
    const termBoxGeo = new THREE.BoxGeometry(0.6, 0.35, 0.55);
    const termBoxMesh = new THREE.Mesh(termBoxGeo, wegBlueMaterial);
    termBoxMesh.position.set(0, 0.95, 0);
    motorGroup.add(termBoxMesh);

    // Pés de Fixação
    const feetGeo = new THREE.BoxGeometry(1.6, 0.15, 0.3);
    const foot1 = new THREE.Mesh(feetGeo, castIronMaterial);
    foot1.position.set(0, -0.85, 0.65);
    motorGroup.add(foot1);

    const foot2 = new THREE.Mesh(feetGeo, castIronMaterial);
    foot2.position.set(0, -0.85, -0.65);
    motorGroup.add(foot2);

    // Placa de Identificação
    const nameplateTex = createNameplateTexture();
    const nameplateGeo = new THREE.PlaneGeometry(0.75, 0.38);
    const nameplateMat = new THREE.MeshStandardMaterial({
      map: nameplateTex,
      roughness: 0.3,
      metalness: 0.4,
      side: THREE.DoubleSide,
    });
    const nameplateMesh = new THREE.Mesh(nameplateGeo, nameplateMat);
    nameplateMesh.position.set(0, 0.05, 0.87);
    motorGroup.add(nameplateMesh);

    // Grupo Rotativo (Eixo e Polia)
    const shaftGroup = new THREE.Group();
    shaftGroupRef.current = shaftGroup;
    shaftGroup.position.set(0.9, 0, 0);
    motorGroup.add(shaftGroup);

    const shaftGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.8, 24);
    shaftGeo.rotateZ(Math.PI / 2);
    const shaftMesh = new THREE.Mesh(shaftGeo, steelMaterial);
    shaftMesh.position.x = 0.3;
    shaftGroup.add(shaftMesh);

    const pulleyGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 32);
    pulleyGeo.rotateZ(Math.PI / 2);
    const pulleyMesh = new THREE.Mesh(pulleyGeo, pulleyMaterial);
    pulleyMesh.position.x = 0.55;
    shaftGroup.add(pulleyMesh);

    const keywayGeo = new THREE.BoxGeometry(0.32, 0.08, 0.52);
    const keywayMat = new THREE.MeshBasicMaterial({ color: 0xff1744 });
    const keywayMesh = new THREE.Mesh(keywayGeo, keywayMat);
    keywayMesh.position.x = 0.55;
    shaftGroup.add(keywayMesh);

    const gridHelper = new THREE.GridHelper(6, 12, 0x0288d1, 0x1f2937);
    gridHelper.position.y = -0.93;
    scene.add(gridHelper);

    // Relógio Three.js para cálculo dinâmico baseado em delta de tempo
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const currentState = stateRef.current;
      const currentFreq = Number(currentState?.outputFrequency ?? 0);
      const isMotorRunning = currentState?.motorStatus === 'RUNNING' || currentFreq > 0.1;

      if (shaftGroupRef.current && isMotorRunning) {
        // Cálculo da rotação real do motor 4 polos (1750 RPM a 60Hz)
        const currentRpm = (currentFreq / 60) * 1750;

        // Fator visual dinâmico com proporção real por segundo
        const visualSpeedFactor = 0.35;
        const radPerSec = ((2 * Math.PI * currentRpm) / 60) * visualSpeedFactor;
        const direction = (currentState as any)?.rotationDirection === 'REV' ? -1 : 1;

        shaftGroupRef.current.rotation.x += radPerSec * delta * direction;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    cameraAngleRef.current.theta -= deltaX * 0.008;
    cameraAngleRef.current.phi = Math.max(
      0.1,
      Math.min(Math.PI / 2 - 0.05, cameraAngleRef.current.phi - deltaY * 0.008)
    );

    updateCameraPosition();
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const setCameraView = (theta: number, phi: number, radius = 4.2) => {
    cameraAngleRef.current = { theta, phi, radius };
    updateCameraPosition();
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <strong style={{ fontSize: '12px', color: '#fff' }}>Motor de Indução WEG W22 (3D Realista)</strong>
          <span style={{ fontSize: '10px', color: '#90a4ae', display: 'block' }}>
            🖱️ Clique e arraste para girar em 360°
          </span>
        </div>

        <div style={{ display: 'flex', gap: '4px' }}>
          <button onClick={() => setCameraView(Math.PI / 4, Math.PI / 3)} style={btnCamStyle}>
            📐 Isométrica
          </button>
          <button
            onClick={() => setCameraView(0, Math.PI / 2.2, 2.5)}
            style={{ ...btnCamStyle, background: '#0288d1', color: '#fff' }}
            title="Aproxima e foca na Placa de Identificação lateral"
          >
            🏷️ Ler Placa
          </button>
          <button onClick={() => setCameraView(Math.PI / 2, Math.PI / 2.2, 3.2)} style={btnCamStyle}>
            ⚙️ Eixo
          </button>
        </div>
      </div>

      <div
        ref={mountRef}
        style={viewport3DStyle}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      <div style={telemetryRowStyle}>
        <div style={telemetryCardStyle}>
          <span style={telemetryLabelStyle}>FREQUÊNCIA</span>
          <strong style={{ color: '#00e676', fontSize: '13px' }}>{freq.toFixed(1)} Hz</strong>
        </div>
        <div style={telemetryCardStyle}>
          <span style={telemetryLabelStyle}>VELOCIDADE</span>
          <strong style={{ color: '#81d4fa', fontSize: '13px' }}>{targetRpm} RPM</strong>
        </div>
        <div style={telemetryCardStyle}>
          <span style={telemetryLabelStyle}>CORRENTE</span>
          <strong style={{ color: '#ffb74d', fontSize: '13px' }}>{currentAmps} A</strong>
        </div>
        <div style={telemetryCardStyle}>
          <span style={telemetryLabelStyle}>CARGA NO EIXO</span>
          <strong style={{ color: '#f06292', fontSize: '13px' }}>{loadTorquePercent}%</strong>
        </div>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  background: '#11151a',
  border: '1px solid #252e3b',
  borderRadius: '12px',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  boxSizing: 'border-box',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #21262d',
  paddingBottom: '8px',
};

const btnCamStyle: React.CSSProperties = {
  background: '#1f2937',
  border: '1px solid #374151',
  borderRadius: '6px',
  color: '#b0bec5',
  padding: '4px 8px',
  fontSize: '10px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const viewport3DStyle: React.CSSProperties = {
  width: '100%',
  height: '250px',
  borderRadius: '8px',
  overflow: 'hidden',
  cursor: 'grab',
  userSelect: 'none',
};

const telemetryRowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
  gap: '8px',
};

const telemetryCardStyle: React.CSSProperties = {
  background: '#161b22',
  border: '1px solid #21262d',
  borderRadius: '6px',
  padding: '6px 8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
};

const telemetryLabelStyle: React.CSSProperties = {
  fontSize: '9px',
  color: '#90a4ae',
  fontWeight: 'bold',
};