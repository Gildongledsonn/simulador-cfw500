import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useInverter } from '../context/InverterContext';

export interface MotorNameplateData {
  id: string;
  model: string;
  poles: number;
  powerCv: string;
  powerKw: string;
  voltage: string;
  current: string;
  frequency: string;
  syncRpm: number;
  nominalRpm: number;
  efficiency: string;
  powerFactor: string;
  serviceFactor: string;
  protection: string;
  isolation: string;
}

export const MOTOR_NAMEPLATES: Record<string, MotorNameplateData> = {
  default: {
    id: 'default',
    model: 'W22 Plus IE3',
    poles: 4,
    powerCv: '1.5 cv',
    powerKw: '1.1 kW',
    voltage: '220 / 380 V',
    current: '4.50 / 2.60 A',
    frequency: '60 Hz',
    syncRpm: 1800,
    nominalRpm: 1750,
    efficiency: '84.5%',
    powerFactor: '0.81',
    serviceFactor: '1.15',
    protection: 'IP55',
    isolation: 'Cl. F',
  },
  high_speed: {
    id: 'high_speed',
    model: 'W21 2 Polos',
    poles: 2,
    powerCv: '1.0 cv',
    powerKw: '0.75 kW',
    voltage: '220 / 380 V',
    current: '3.10 / 1.80 A',
    frequency: '60 Hz',
    syncRpm: 3600,
    nominalRpm: 3480,
    efficiency: '82.0%',
    powerFactor: '0.85',
    serviceFactor: '1.15',
    protection: 'IP55',
    isolation: 'Cl. F',
  },
  heavy_duty: {
    id: 'heavy_duty',
    model: 'W22 Premium IE4',
    poles: 4,
    powerCv: '3.0 cv',
    powerKw: '2.2 kW',
    voltage: '220 / 380 V',
    current: '8.40 / 4.85 A',
    frequency: '60 Hz',
    syncRpm: 1800,
    nominalRpm: 1745,
    efficiency: '89.5%',
    powerFactor: '0.83',
    serviceFactor: '1.25',
    protection: 'IP66',
    isolation: 'Cl. H',
  },
};

interface MotorVisualizerProps {
  loadTorquePercent?: number;
  customNameplate?: MotorNameplateData;
}

export const MotorVisualizer: React.FC<MotorVisualizerProps> = ({
  loadTorquePercent = 0,
  customNameplate,
}) => {
  const { state } = useInverter();
  const mountRef = useRef<HTMLDivElement | null>(null);

  const [selectedNameplateKey, setSelectedNameplateKey] = useState<string>('default');
  const [showPlateModal, setShowPlateModal] = useState<boolean>(false);
  const activeNameplate = customNameplate || MOTOR_NAMEPLATES[selectedNameplateKey] || MOTOR_NAMEPLATES.default;

  const stateRef = useRef(state);
  stateRef.current = state;

  const activeNameplateRef = useRef(activeNameplate);
  activeNameplateRef.current = activeNameplate;

  // Referências Three.js
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const shaftGroupRef = useRef<THREE.Group | null>(null);
  const nameplateMeshRef = useRef<THREE.Mesh | null>(null);

  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cameraAngleRef = useRef<{ theta: number; phi: number; radius: number }>({
    theta: Math.PI / 4,
    phi: Math.PI / 3,
    radius: 4.2,
  });

  const isMotorReverse = (s: any): boolean => {
    if (!s) return false;
    if (s.isForwardDirection === false) return true;
    if (
      s.rotationDirection === 'REV' ||
      s.direction === 'REV' ||
      s.motorDirection === 'REV' ||
      s.localDirection === 'REV' ||
      s.isReverse === true
    ) {
      return true;
    }
    const p223 = s.parameters?.P0223;
    const p223Val = typeof p223 === 'object' ? Number(p223?.currentValue ?? p223?.value ?? 0) : Number(p223 ?? 0);
    if (p223Val === 1) return true;

    if (typeof s.outputFrequency === 'number' && s.outputFrequency < 0) return true;
    if (typeof s.targetFrequency === 'number' && s.targetFrequency < 0) return true;

    const isRem = s.controlSource === 'REM' || s.isLocal === false;
    const di2 = Boolean(
      s.digitalInputs?.[1] ||
      s.digitalInputs?.DI2 ||
      s.digitalInputs?.di2 ||
      s.digitalInputs?.['2']
    );
    if (isRem && di2) return true;

    return false;
  };

  const rawFreq = Math.abs(Number(state.outputFrequency ?? 0));
  const isRev = isMotorReverse(state);
  const isRunning = (state.motorStatus === 'RUNNING' || rawFreq > 0.1) && state.motorStatus !== 'FAULT';
  const targetRpm = Math.round((rawFreq / 60) * activeNameplate.nominalRpm);
  const currentAmps = state.outputCurrent ?? (isRunning ? (1.2 + (rawFreq / 60) * 3.3).toFixed(1) : '0.0');

  const updateCameraPosition = () => {
    if (!cameraRef.current) return;
    const { theta, phi, radius } = cameraAngleRef.current;
    cameraRef.current.position.x = radius * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = radius * Math.cos(phi);
    cameraRef.current.position.z = radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(0, 0, 0);
  };

  // Renderizador em Ultra Alta Resolução (2048x1024) com Tipografia Nítida
  const createUltraHdNameplateTexture = (data: MotorNameplateData): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d', { alpha: false });

    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Fundo em alumínio escovado com alto contraste
      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(0, 0, 2048, 1024);

      // Moldura externa preta sólida
      ctx.strokeStyle = '#1e272e';
      ctx.lineWidth = 24;
      ctx.strokeRect(16, 16, 2016, 992);

      // Faixa Superior WEG Azul
      ctx.fillStyle = '#005ea6';
      ctx.fillRect(32, 32, 1984, 180);

      // Logotipo WEG
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 110px Arial, sans-serif';
      ctx.fillText('WEG', 70, 160);

      // Modelo e Tipo
      ctx.font = 'bold 70px Arial, sans-serif';
      ctx.fillText(`MOTOR DE INDUÇÃO 3~ | ${data.model}`, 380, 150);

      // Separador
      ctx.strokeStyle = '#005ea6';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(40, 230);
      ctx.lineTo(2008, 230);
      ctx.stroke();

      // Grade de Dados em Preto Puro (#000) e Fonte Monospace Ultra Nítida
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 58px "Courier New", monospace';

      ctx.fillText(`POTÊNCIA: ${data.powerCv} (${data.powerKw})`, 70, 320);
      ctx.fillText(`POLOS: ${data.poles}P`, 1200, 320);

      ctx.fillText(`TENSÃO: ${data.voltage}`, 70, 440);
      ctx.fillText(`CORRENTE: ${data.current}`, 1200, 440);

      ctx.fillText(`FREQ: ${data.frequency}   FS: ${data.serviceFactor}`, 70, 560);
      ctx.fillText(`ROTAÇÃO: ${data.nominalRpm} RPM`, 1200, 560);

      ctx.fillText(`REND(η): ${data.efficiency}   COS φ: ${data.powerFactor}`, 70, 680);
      ctx.fillText(`ISOLAMENTO: ${data.isolation}`, 1200, 680);

      ctx.fillText(`GRAU PROT: ${data.protection}`, 70, 800);
      ctx.fillText(`REGIME: S1 CONTÍNUO`, 1200, 800);

      // Linha de Rodapé com Norma
      ctx.fillStyle = '#2f3542';
      ctx.font = 'bold 46px Arial, sans-serif';
      ctx.fillText('FABRICADO NO BRASIL - NBR 17094 / IEC 60034', 70, 950);
      ctx.fillText('PADRÃO INDUSTRIAL', 1400, 950);
    }

    const texture = new THREE.CanvasTexture(canvas);
    // Configurações de nitidez máxima sem embaçamento
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 16;
    texture.needsUpdate = true;
    return texture;
  };

  useEffect(() => {
    if (nameplateMeshRef.current && rendererRef.current) {
      const newTex = createUltraHdNameplateTexture(activeNameplate);
      newTex.anisotropy = rendererRef.current.capabilities.getMaxAnisotropy();
      (nameplateMeshRef.current.material as THREE.MeshStandardMaterial).map = newTex;
      (nameplateMeshRef.current.material as THREE.MeshStandardMaterial).needsUpdate = true;
    }
  }, [activeNameplate]);

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

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight1.position.set(5, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x81d4fa, 0.8);
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

    // Carcaça Cilíndrica Principal
    const statorGeo = new THREE.CylinderGeometry(0.85, 0.85, 1.8, 32);
    statorGeo.rotateZ(Math.PI / 2);
    const statorMesh = new THREE.Mesh(statorGeo, wegBlueMaterial);
    motorGroup.add(statorMesh);

    // Aletas de Refrigeração
    for (let i = -0.7; i <= 0.7; i += 0.14) {
      const finGeo = new THREE.CylinderGeometry(0.92, 0.92, 0.04, 32);
      finGeo.rotateZ(Math.PI / 2);
      const finMesh = new THREE.Mesh(finGeo, wegBlueMaterial);
      finMesh.position.x = i;
      motorGroup.add(finMesh);
    }

    // Tampa Defletora Traseira
    const fanCoverGeo = new THREE.CylinderGeometry(0.86, 0.86, 0.5, 32);
    fanCoverGeo.rotateZ(Math.PI / 2);
    const fanCoverMesh = new THREE.Mesh(fanCoverGeo, castIronMaterial);
    fanCoverMesh.position.x = -1.1;
    motorGroup.add(fanCoverMesh);

    // Caixa de Ligação Superior
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

    // Suporte Externo da Placa
    const plateMountGeo = new THREE.BoxGeometry(0.98, 0.54, 0.04);
    const plateMountMat = new THREE.MeshStandardMaterial({
      color: 0x11161d,
      roughness: 0.5,
      metalness: 0.6,
    });
    const plateMountMesh = new THREE.Mesh(plateMountGeo, plateMountMat);
    plateMountMesh.position.set(0, 0.05, 0.94);
    motorGroup.add(plateMountMesh);

    // Placa de Identificação WEG Ultra Nítida
    const nameplateTex = createUltraHdNameplateTexture(activeNameplateRef.current);
    nameplateTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const nameplateGeo = new THREE.PlaneGeometry(0.94, 0.5);
    const nameplateMat = new THREE.MeshStandardMaterial({
      map: nameplateTex,
      roughness: 0.2,
      metalness: 0.1,
      side: THREE.FrontSide,
    });
    const nameplateMesh = new THREE.Mesh(nameplateGeo, nameplateMat);
    nameplateMesh.position.set(0, 0.05, 0.963);
    nameplateMeshRef.current = nameplateMesh;
    motorGroup.add(nameplateMesh);

    // Eixo e Polia Rotativa
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

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const s = stateRef.current as any;
      const curFreq = Math.abs(Number(s?.outputFrequency ?? 0));
      const isMotorRunning = (s?.motorStatus === 'RUNNING' || curFreq > 0.1) && s?.motorStatus !== 'FAULT';

      if (shaftGroupRef.current && isMotorRunning) {
        const currentlyRev = isMotorReverse(s);
        const dirFactor = currentlyRev ? -1 : 1;
        const currentRpm = (curFreq / 60) * activeNameplateRef.current.nominalRpm;
        const visualSpeedFactor = 0.35;
        const radPerSec = ((2 * Math.PI * currentRpm) / 60) * visualSpeedFactor;

        shaftGroupRef.current.rotation.x += radPerSec * delta * dirFactor;
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
          <strong style={{ fontSize: '12px', color: '#fff' }}>Motor de Indução WEG (3D Realista)</strong>
          <span style={{ fontSize: '10px', color: '#90a4ae', display: 'block' }}>
            🖱️ Arraste para girar em 360° | Placa: {activeNameplate.model} ({activeNameplate.powerCv})
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <select
            value={selectedNameplateKey}
            onChange={(e) => setSelectedNameplateKey(e.target.value)}
            style={nameplateSelectStyle}
            title="Escolha a placa de identificação para estudos e exercícios práticos"
          >
            <option value="default">🏷️ WEG W22 1.5cv 4P (Padrão)</option>
            <option value="high_speed">🏷️ WEG W21 1.0cv 2P (Alta Vel.)</option>
            <option value="heavy_duty">🏷️ WEG W22 3.0cv 4P (Industrial)</option>
          </select>

          <button onClick={() => setCameraView(Math.PI / 4, Math.PI / 3)} style={btnCamStyle}>
            📐 Isométrica
          </button>
          <button
            onClick={() => setCameraView(0, Math.PI / 2.05, 2.3)}
            style={{ ...btnCamStyle, background: '#0288d1', color: '#fff' }}
            title="Aproxima a câmera 3D na placa"
          >
            🔍 Foco 3D
          </button>
          <button
            onClick={() => setShowPlateModal(true)}
            style={{ ...btnCamStyle, background: '#00e676', color: '#000' }}
            title="Abre a placa em tela cheia 100% nítida"
          >
            📄 Ver Placa Completa
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
          <strong style={{ color: '#00e676', fontSize: '13px' }}>{rawFreq.toFixed(1)} Hz</strong>
        </div>
        <div style={telemetryCardStyle}>
          <span style={telemetryLabelStyle}>SENTIDO DE GIRO</span>
          <strong style={{ color: isRev ? '#ffb74d' : '#81d4fa', fontSize: '13px' }}>
            {isRev ? '↺ ANTI-HORÁRIO (REV)' : '↻ HORÁRIO (FWD)'}
          </strong>
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

      {/* MODAL 2D ULTRA HD PARA LEITURA IMEDIATA */}
      {showPlateModal && (
        <div style={modalOverlayStyle} onClick={() => setShowPlateModal(false)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={plateCardHeaderStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px', fontWeight: '900', color: '#fff', background: '#005ea6', padding: '2px 8px', borderRadius: '4px' }}>WEG</span>
                <strong style={{ fontSize: '14px', color: '#fff' }}>Placa de Identificação Oficial • {activeNameplate.model}</strong>
              </div>
              <button onClick={() => setShowPlateModal(false)} style={modalCloseBtnStyle}>✕</button>
            </div>

            <div style={plateTableGridStyle}>
              <div style={plateFieldStyle}><span>Modelo:</span><strong>{activeNameplate.model}</strong></div>
              <div style={plateFieldStyle}><span>Potência:</span><strong>{activeNameplate.powerCv} ({activeNameplate.powerKw})</strong></div>
              <div style={plateFieldStyle}><span>Tensão Nominal:</span><strong>{activeNameplate.voltage}</strong></div>
              <div style={plateFieldStyle}><span>Corrente Nominal:</span><strong>{activeNameplate.current}</strong></div>
              <div style={plateFieldStyle}><span>Frequência:</span><strong>{activeNameplate.frequency}</strong></div>
              <div style={plateFieldStyle}><span>Rotação Nominal:</span><strong>{activeNameplate.nominalRpm} RPM</strong></div>
              <div style={plateFieldStyle}><span>Número de Polos:</span><strong>{activeNameplate.poles} Polos</strong></div>
              <div style={plateFieldStyle}><span>Fator de Serviço:</span><strong>{activeNameplate.serviceFactor}</strong></div>
              <div style={plateFieldStyle}><span>Rendimento (η):</span><strong>{activeNameplate.efficiency}</strong></div>
              <div style={plateFieldStyle}><span>Fator de Potência (Cos φ):</span><strong>{activeNameplate.powerFactor}</strong></div>
              <div style={plateFieldStyle}><span>Grau de Proteção:</span><strong>{activeNameplate.protection}</strong></div>
              <div style={plateFieldStyle}><span>Classe de Isolamento:</span><strong>{activeNameplate.isolation}</strong></div>
            </div>

            <div style={{ marginTop: '12px', textAlign: 'right' }}>
              <button onClick={() => setShowPlateModal(false)} style={btnOkModalStyle}>Fechar Leitura</button>
            </div>
          </div>
        </div>
      )}
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
  position: 'relative',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #21262d',
  paddingBottom: '8px',
  flexWrap: 'wrap',
  gap: '8px',
};

const nameplateSelectStyle: React.CSSProperties = {
  background: '#161b22',
  border: '1px solid #30363d',
  color: '#81d4fa',
  borderRadius: '6px',
  padding: '4px 8px',
  fontSize: '10px',
  fontWeight: 'bold',
  cursor: 'pointer',
  outline: 'none',
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

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  padding: '16px',
};

const modalContentStyle: React.CSSProperties = {
  background: '#131922',
  border: '2px solid #0288d1',
  borderRadius: '12px',
  padding: '16px',
  maxWidth: '520px',
  width: '100%',
  boxShadow: '0 8px 32px rgba(0,0,0,0.7)',
};

const plateCardHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #252f3d',
  paddingBottom: '10px',
  marginBottom: '12px',
};

const modalCloseBtnStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: '#90a4ae',
  fontSize: '16px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const plateTableGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '8px',
};

const plateFieldStyle: React.CSSProperties = {
  background: '#0d1117',
  border: '1px solid #21262d',
  borderRadius: '6px',
  padding: '6px 8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  fontSize: '11px',
  color: '#cfd8dc',
};

const btnOkModalStyle: React.CSSProperties = {
  background: '#0288d1',
  border: 'none',
  borderRadius: '6px',
  color: '#fff',
  padding: '6px 14px',
  fontSize: '11px',
  fontWeight: 'bold',
  cursor: 'pointer',
};