import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useInverter } from '../context/InverterContext';

interface ElevatorTractionVisualizerProps {
  loadTorquePercent?: number;
}

export const ElevatorTractionVisualizer: React.FC<ElevatorTractionVisualizerProps> = ({
  loadTorquePercent = 0,
}) => {
  const { state } = useInverter();
  const mountRef = useRef<HTMLDivElement | null>(null);

  const stateRef = useRef(state);
  stateRef.current = state;

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sheaveRotorGroupRef = useRef<THREE.Group | null>(null);
  const cablesGroupRef = useRef<THREE.Group | null>(null);

  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cameraAngleRef = useRef<{ theta: number; phi: number; radius: number }>({
    theta: Math.PI / 3.8,
    phi: Math.PI / 3.2,
    radius: 4.8,
  });

  const isMotorReverse = (s: any): boolean => {
    if (!s) return false;
    if (s.isForwardDirection === false) return true;
    if (s.rotationDirection === 'REV' || s.direction === 'REV' || s.isReverse === true) return true;
    const isRem = s.controlSource === 'REM' || s.isLocal === false;
    const di2 = Boolean(s.digitalInputs?.di2 || s.digitalInputs?.DI2);
    if (isRem && di2) return true;
    return false;
  };

  const rawFreq = Math.abs(Number(state.outputFrequency ?? 0));
  const isRev = isMotorReverse(state);
  const isRunning = (state.motorStatus === 'RUNNING' || rawFreq > 0.1) && state.motorStatus !== 'FAULT';
  // Máquinas Gearless operam em rotação mais baixa com alto torque (ex: nominal 180 RPM a 60Hz)
  const elevatorRpm = Math.round((rawFreq / 60) * 180);
  const linearSpeedMs = ((Math.PI * 0.45 * elevatorRpm) / 60).toFixed(2); // Polia Ø450mm
  const currentAmps = state.outputCurrent ?? (isRunning ? (2.4 + (rawFreq / 60) * 7.8).toFixed(1) : '0.0');

  const updateCameraPosition = () => {
    if (!cameraRef.current) return;
    const { theta, phi, radius } = cameraAngleRef.current;
    cameraRef.current.position.x = radius * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = radius * Math.cos(phi);
    cameraRef.current.position.z = radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(0, 0.2, 0);
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 320;
    const height = mountRef.current.clientHeight || 260;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#070a0e');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    cameraRef.current = camera;
    updateCameraPosition();

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    // Iluminação de estúdio industrial
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mainSpot = new THREE.DirectionalLight(0xffffff, 1.6);
    mainSpot.position.set(6, 10, 6);
    scene.add(mainSpot);

    const blueBackLight = new THREE.DirectionalLight(0x00e676, 0.5);
    blueBackLight.position.set(-6, 2, -6);
    scene.add(blueBackLight);

    const metalDarkMat = new THREE.MeshStandardMaterial({ color: 0x1f242d, roughness: 0.5, metalness: 0.8 });
    const castIronMat = new THREE.MeshStandardMaterial({ color: 0x2d3436, roughness: 0.7, metalness: 0.5 });
    const steelPolishedMat = new THREE.MeshStandardMaterial({ color: 0xdcdde1, roughness: 0.25, metalness: 0.9 });
    const brakePadMat = new THREE.MeshStandardMaterial({ color: 0xd63031, roughness: 0.4, metalness: 0.3 });
    const copperCoilMat = new THREE.MeshStandardMaterial({ color: 0xe17055, roughness: 0.3, metalness: 0.7 });
    const cableMat = new THREE.MeshStandardMaterial({ color: 0x718093, roughness: 0.35, metalness: 0.95 });

    const machineGroup = new THREE.Group();
    scene.add(machineGroup);

    // ==========================================
    // 1. BASE ESTRUTURAL DE VIGA I (CHASSIS)
    // ==========================================
    const baseBedGeo = new THREE.BoxGeometry(2.4, 0.16, 1.4);
    const baseBedMesh = new THREE.Mesh(baseBedGeo, metalDarkMat);
    baseBedMesh.position.set(0, -0.9, 0);
    machineGroup.add(baseBedMesh);

    // Coxins de borracha anti-vibração
    for (let x = -0.9; x <= 0.9; x += 1.8) {
      for (let z = -0.5; z <= 0.5; z += 1.0) {
        const isolatorGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.1, 16);
        const isolatorMesh = new THREE.Mesh(isolatorGeo, castIronMat);
        isolatorMesh.position.set(x, -0.98, z);
        machineGroup.add(isolatorMesh);
      }
    }

    // ==========================================
    // 2. ESTATOR PMSM CILÍNDRICO (CORPO DO MOTOR)
    // ==========================================
    const statorGeo = new THREE.CylinderGeometry(0.95, 0.95, 0.75, 48);
    statorGeo.rotateZ(Math.PI / 2);
    const statorMesh = new THREE.Mesh(statorGeo, castIronMat);
    statorMesh.position.set(-0.25, 0.1, 0);
    machineGroup.add(statorMesh);

    // Aletas radiais de refrigeração
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
      const ribGeo = new THREE.BoxGeometry(0.72, 0.04, 0.08);
      const ribMesh = new THREE.Mesh(ribGeo, metalDarkMat);
      ribMesh.position.set(-0.25, 0.1 + Math.sin(a) * 0.96, Math.cos(a) * 0.96);
      ribMesh.rotation.x = a;
      machineGroup.add(ribMesh);
    }

    // ==========================================
    // 3. GRUPO ROTATIVO: POLIA DE TRAÇÃO + ROTOR
    // ==========================================
    const sheaveRotorGroup = new THREE.Group();
    sheaveRotorGroupRef.current = sheaveRotorGroup;
    sheaveRotorGroup.position.set(0.45, 0.1, 0);
    machineGroup.add(sheaveRotorGroup);

    // Eixo Central de Alta Resistência
    const mainShaftGeo = new THREE.CylinderGeometry(0.24, 0.24, 1.6, 32);
    mainShaftGeo.rotateZ(Math.PI / 2);
    const mainShaftMesh = new THREE.Mesh(mainShaftGeo, steelPolishedMat);
    mainShaftMesh.position.x = -0.3;
    sheaveRotorGroup.add(mainShaftMesh);

    // Polia de Tração Principal (Traction Sheave Ø 450mm)
    const sheaveBodyGeo = new THREE.CylinderGeometry(0.88, 0.88, 0.42, 48);
    sheaveBodyGeo.rotateZ(Math.PI / 2);
    const sheaveBodyMesh = new THREE.Mesh(sheaveBodyGeo, castIronMat);
    sheaveRotorGroup.add(sheaveBodyMesh);

    // 5 Ranhuras em V para Cabos de Aço
    for (let g = -0.15; g <= 0.15; g += 0.075) {
      const grooveGeo = new THREE.TorusGeometry(0.88, 0.02, 16, 48);
      grooveGeo.rotateY(Math.PI / 2);
      const grooveMesh = new THREE.Mesh(grooveGeo, metalDarkMat);
      grooveMesh.position.x = g;
      sheaveRotorGroup.add(grooveMesh);
    }

    // Marcações visuais de rotação na face da polia
    for (let m = 0; m < 4; m++) {
      const markGeo = new THREE.BoxGeometry(0.04, 0.35, 0.06);
      const markMesh = new THREE.Mesh(markGeo, new THREE.MeshBasicMaterial({ color: 0x00e676 }));
      const ang = (m * Math.PI) / 2;
      markMesh.position.set(0.22, Math.sin(ang) * 0.55, Math.cos(ang) * 0.55);
      markMesh.rotation.x = ang;
      sheaveRotorGroup.add(markMesh);
    }

    // ==========================================
    // 4. CABOS DE TRAÇÃO DE AÇO VERTICAIS
    // ==========================================
    const cablesGroup = new THREE.Group();
    cablesGroupRef.current = cablesGroup;
    machineGroup.add(cablesGroup);

    for (let c = -0.15; c <= 0.15; c += 0.075) {
      // Lado da Cabine (Frente Z+)
      const cableCabGeo = new THREE.CylinderGeometry(0.016, 0.016, 1.8, 12);
      const cableCabMesh = new THREE.Mesh(cableCabGeo, cableMat);
      cableCabMesh.position.set(0.45 + c, -0.8, 0.88);
      cablesGroup.add(cableCabMesh);

      // Lado do Contrapeso (Trás Z-)
      const cableCwtGeo = new THREE.CylinderGeometry(0.016, 0.016, 1.8, 12);
      const cableCwtMesh = new THREE.Mesh(cableCwtGeo, cableMat);
      cableCwtMesh.position.set(0.45 + c, -0.8, -0.88);
      cablesGroup.add(cableCwtMesh);
    }

    // ==========================================
    // 5. FREIO ELETROMECÂNICO DUPLO DE SEGURANÇA
    // ==========================================
    const brakeGroup = new THREE.Group();
    brakeGroup.position.set(-0.25, 0.1, 0);
    machineGroup.add(brakeGroup);

    // Sapata Superior
    const topShoeGeo = new THREE.BoxGeometry(0.35, 0.14, 0.4);
    const topShoeMesh = new THREE.Mesh(topShoeGeo, brakePadMat);
    topShoeMesh.position.set(0, 1.05, 0);
    brakeGroup.add(topShoeMesh);

    // Sapata Inferior
    const botShoeMesh = new THREE.Mesh(topShoeGeo, brakePadMat);
    botShoeMesh.position.set(0, -0.85, 0);
    brakeGroup.add(botShoeMesh);

    // Bobinas Eletromagnéticas do Freio (Eletroímãs)
    const coilGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.3, 24);
    const coil1 = new THREE.Mesh(coilGeo, copperCoilMat);
    coil1.position.set(0.2, 1.2, 0);
    brakeGroup.add(coil1);

    const coil2 = new THREE.Mesh(coilGeo, copperCoilMat);
    coil2.position.set(-0.2, 1.2, 0);
    brakeGroup.add(coil2);

    // ==========================================
    // 6. ENCODER ABSOLUTO ACOPLADO (EnDat/SinCos)
    // ==========================================
    const encoderGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.35, 32);
    encoderGeo.rotateZ(Math.PI / 2);
    const encoderMesh = new THREE.Mesh(encoderGeo, new THREE.MeshStandardMaterial({ color: 0x0984e3, roughness: 0.3, metalness: 0.6 }));
    encoderMesh.position.set(-0.85, 0.1, 0);
    machineGroup.add(encoderMesh);

    // Conector e Cabo Blindado do Encoder
    const encCableGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.6, 16);
    const encCableMesh = new THREE.Mesh(encCableGeo, new THREE.MeshBasicMaterial({ color: 0xf1c40f }));
    encCableMesh.position.set(-0.95, -0.15, 0);
    machineGroup.add(encCableMesh);

    // Grade do Piso da Casa de Máquinas
    const gridHelper = new THREE.GridHelper(7, 14, 0x00e676, 0x1f2937);
    gridHelper.position.y = -1.04;
    scene.add(gridHelper);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const s = stateRef.current as any;
      const curFreq = Math.abs(Number(s?.outputFrequency ?? 0));
      const isCurRunning = (s?.motorStatus === 'RUNNING' || curFreq > 0.1) && s?.motorStatus !== 'FAULT';

      if (sheaveRotorGroupRef.current && isCurRunning) {
        const currentlyRev = isMotorReverse(s);
        const dirFactor = currentlyRev ? -1 : 1;
        const currentRpm = (curFreq / 60) * 180;
        const visualSpeedFactor = 0.55;
        const radPerSec = ((2 * Math.PI * currentRpm) / 60) * visualSpeedFactor;

        sheaveRotorGroupRef.current.rotation.x += radPerSec * delta * dirFactor;
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

  const setCameraView = (theta: number, phi: number, radius = 4.8) => {
    cameraAngleRef.current = { theta, phi, radius };
    updateCameraPosition();
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <strong style={{ fontSize: '12px', color: '#00e676' }}>
            Máquina de Tração Gearless PMSM • Polia Ø450mm (3D Realista)
          </strong>
          <span style={{ fontSize: '10px', color: '#90a4ae', display: 'block' }}>
            🖱️ Clique e arraste para inspecionar em 360° | Freio Duplo & Encoder EnDat
          </span>
        </div>

        <div style={{ display: 'flex', gap: '4px' }}>
          <button onClick={() => setCameraView(Math.PI / 3.8, Math.PI / 3.2)} style={btnCamStyle}>
            📐 Isométrica
          </button>
          <button
            onClick={() => setCameraView(0, Math.PI / 2.3, 3.2)}
            style={{ ...btnCamStyle, background: '#0288d1', color: '#fff' }}
            title="Foco na Polia de Tração e Cabos de Aço"
          >
            ⚙️ Polia & Cabos
          </button>
          <button onClick={() => setCameraView(Math.PI, Math.PI / 2.3, 3.0)} style={btnCamStyle}>
            🎯 Encoder PG
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
          <span style={telemetryLabelStyle}>VELOCIDADE LINEAR</span>
          <strong style={{ color: '#00e676', fontSize: '13px' }}>{linearSpeedMs} m/s</strong>
        </div>
        <div style={telemetryCardStyle}>
          <span style={telemetryLabelStyle}>ROTAÇÃO DO EIXO</span>
          <strong style={{ color: '#81d4fa', fontSize: '13px' }}>{elevatorRpm} RPM</strong>
        </div>
        <div style={telemetryCardStyle}>
          <span style={telemetryLabelStyle}>SENTIDO DE VIAGEM</span>
          <strong style={{ color: isRev ? '#ffb74d' : '#81d4fa', fontSize: '13px' }}>
            {isRev ? '▼ DESCIDA (REV)' : '▲ SUBIDA (FWD)'}
          </strong>
        </div>
        <div style={telemetryCardStyle}>
          <span style={telemetryLabelStyle}>CORRENTE PMSM</span>
          <strong style={{ color: '#ffb74d', fontSize: '13px' }}>{currentAmps} A</strong>
        </div>
        <div style={telemetryCardStyle}>
          <span style={telemetryLabelStyle}>CARGA NA CABINE</span>
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
  flexWrap: 'wrap',
  gap: '6px',
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
  height: '260px',
  borderRadius: '8px',
  overflow: 'hidden',
  cursor: 'grab',
  userSelect: 'none',
};

const telemetryRowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
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