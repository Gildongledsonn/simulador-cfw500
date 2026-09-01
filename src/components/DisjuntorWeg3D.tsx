import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface DisjuntorWeg3DProps {
  initialState?: boolean;
  onStateChange?: (isOn: boolean) => void;
}

export const DisjuntorWeg3D: React.FC<DisjuntorWeg3DProps> = ({
  initialState = false,
  onStateChange,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isOn, setIsOn] = useState(initialState);
  const [isHovered, setIsHovered] = useState(false);
  const [currentLoad, setCurrentLoad] = useState(12); // Corrente em Amperes (Nominal = 16A)
  const [isTripped, setIsTripped] = useState(false);

  // Refs de controle Three.js
  const leverGroupRef = useRef<THREE.Group | null>(null);
  const targetAngleRef = useRef(initialState ? 0.6 : -0.6);
  const indicatorMeshRef = useRef<THREE.Mesh | null>(null);

  // 1. GERAÇÃO DINÂMICA DA TEXTURA FRONTAL WEG MDW C16 VIA CANVAS
  const createWegFrontTexture = (stateOn: boolean) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // Fundo cinza carcaça DIN
    ctx.fillStyle = '#e5e9ec';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ranhuras decorativas laterais
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(20, 40, canvas.width - 40, 10);
    ctx.fillRect(20, canvas.height - 50, canvas.width - 40, 10);

    // Logotipo WEG
    ctx.fillStyle = '#005ea6';
    ctx.fillRect(60, 90, 140, 60);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('WEG', 130, 136);

    // Nome da Linha e Modelo
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('MDW', 230, 125);
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('mini-disjuntor', 230, 150);

    // Corrente Nominal e Curva de Disparo (C16)
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 74px monospace';
    ctx.fillText('C16', 70, 260);

    // Dados Técnicos e Normas
    ctx.fillStyle = '#334155';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('~230/400V', 70, 310);
    ctx.fillText('50/60Hz', 70, 340);

    // Caixa de Capacidade de Ruptura (3000 A / 3kA)
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 4;
    ctx.strokeRect(70, 370, 140, 50);
    ctx.font = 'bold 32px monospace';
    ctx.fillText('3000', 90, 407);

    // Símbolo 3 (Classe de limitação de energia)
    ctx.strokeRect(220, 370, 50, 50);
    ctx.fillText('3', 235, 407);

    // Norma NBR NM 60898
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('NBR NM 60898', 70, 460);
    ctx.fillText('IEC 60947-2', 70, 490);

    // Esquema Unifilar do Disjuntor Térmico e Magnético
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 4;
    ctx.beginPath();
    // Entrada borne 1
    ctx.moveTo(380, 240);
    ctx.lineTo(380, 290);
    // Disparador térmico (bimetal)
    ctx.lineTo(365, 310);
    ctx.lineTo(395, 330);
    ctx.lineTo(380, 350);
    // Disparador magnético
    ctx.arc(380, 370, 15, Math.PI * 1.5, Math.PI * 0.5, false);
    // Contato móvel
    ctx.lineTo(380, 430);
    ctx.lineTo(410, 410);
    ctx.moveTo(380, 430);
    ctx.lineTo(380, 480);
    ctx.stroke();

    ctx.font = 'bold 22px monospace';
    ctx.fillText('1', 372, 230);
    ctx.fillText('2', 372, 510);

    // Moldura do visor mecânico (Bandeira de Status)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(330, 110, 90, 45);
    ctx.fillStyle = stateOn ? '#ef4444' : '#22c55e'; // Vermelho = Ligado (Fechado) / Verde = Desligado (Aberto)
    ctx.fillRect(336, 116, 78, 33);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(stateOn ? 'I ON' : 'O OFF', 375, 140);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    return texture;
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Dimensões do container
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Cena, Câmera e Renderizador Three.js
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f172a');

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(3.2, 2.4, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Iluminação de Estúdio Industrial
    const ambientLight = new THREE.AmbientLight('#ffffff', 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight('#ffffff', 2.0);
    dirLight1.position.set(5, 8, 5);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 1024;
    dirLight1.shadow.mapSize.height = 1024;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight('#93c5fd', 0.8);
    dirLight2.position.set(-5, -2, -4);
    scene.add(dirLight2);

    // Materiais
    const plasticMaterial = new THREE.MeshStandardMaterial({
      color: '#e2e8f0',
      roughness: 0.35,
      metalness: 0.05,
    });

    const darkPlasticMaterial = new THREE.MeshStandardMaterial({
      color: '#1e293b',
      roughness: 0.5,
      metalness: 0.1,
    });

    const metalMaterial = new THREE.MeshStandardMaterial({
      color: '#94a3b8',
      roughness: 0.2,
      metalness: 0.85,
    });

    const copperMaterial = new THREE.MeshStandardMaterial({
      color: '#d97706',
      roughness: 0.3,
      metalness: 0.7,
    });

    // 2. CONSTRUÇÃO DO CORPO 3D DO DISJUNTOR DIN
    const breakerGroup = new THREE.Group();

    // A. Corpo Central Principal (1 Módulo DIN = 18mm)
    const bodyGeo = new THREE.BoxGeometry(0.72, 3.4, 2.6);
    const bodyMesh = new THREE.Mesh(bodyGeo, plasticMaterial);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    breakerGroup.add(bodyMesh);

    // B. Rebaixo Frontal / Degrau Padrão DIN
    const frontStepGeo = new THREE.BoxGeometry(0.71, 1.8, 0.8);
    const frontStepMesh = new THREE.Mesh(frontStepGeo, plasticMaterial);
    frontStepMesh.position.set(0, 0, 1.35);
    frontStepMesh.castShadow = true;
    breakerGroup.add(frontStepMesh);

    // C. Face Frontal com Textura Técnica WEG MDW
    const frontPlateGeo = new THREE.PlaneGeometry(0.7, 1.78);
    const frontTexture = createWegFrontTexture(isOn);
    const frontPlateMat = new THREE.MeshStandardMaterial({
      map: frontTexture,
      roughness: 0.4,
      metalness: 0.0,
    });
    const frontPlate = new THREE.Mesh(frontPlateGeo, frontPlateMat);
    frontPlate.position.set(0, 0, 1.755);
    breakerGroup.add(frontPlate);

    // D. Cavidade / Rasgo da Manopla (Alavanca)
    const slotGeo = new THREE.BoxGeometry(0.32, 0.75, 0.4);
    const slotMesh = new THREE.Mesh(slotGeo, darkPlasticMaterial);
    slotMesh.position.set(0, -0.05, 1.6);
    breakerGroup.add(slotMesh);

    // E. Manopla Basculante Articulada (Alavanca de Acionamento)
    const leverGroup = new THREE.Group();
    leverGroup.position.set(0, -0.05, 1.55);

    // Base cilíndrica de rotação da manopla
    const leverPivotGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.3, 16);
    leverPivotGeo.rotateZ(Math.PI / 2);
    const leverPivotMesh = new THREE.Mesh(leverPivotGeo, darkPlasticMaterial);
    leverGroup.add(leverPivotMesh);

    // Haste de pegada da manopla com ranhuras anti-derrapantes
    const leverArmGeo = new THREE.BoxGeometry(0.28, 0.42, 0.28);
    leverArmGeo.translate(0, 0.18, 0.12);
    const leverArmMesh = new THREE.Mesh(leverArmGeo, darkPlasticMaterial);
    leverArmMesh.castShadow = true;
    leverGroup.add(leverArmMesh);

    // Tarja de identificação na manopla
    const leverStripeGeo = new THREE.BoxGeometry(0.29, 0.08, 0.05);
    leverStripeGeo.translate(0, 0.26, 0.26);
    const leverStripeMat = new THREE.MeshBasicMaterial({ color: isOn ? '#ef4444' : '#22c55e' });
    const leverStripeMesh = new THREE.Mesh(leverStripeGeo, leverStripeMat);
    leverGroup.add(leverStripeMesh);

    leverGroup.rotation.x = targetAngleRef.current;
    leverGroupRef.current = leverGroup;
    breakerGroup.add(leverGroup);

    // F. Bornes Metálicos de Entrada (Superior) e Saída (Inferior)
    const createTerminalBlock = (posY: number, isTop: boolean) => {
      const termGroup = new THREE.Group();
      termGroup.position.set(0, posY, 0.7);

      // Abertura do borne para o cabo
      const holeGeo = new THREE.BoxGeometry(0.45, 0.45, 0.5);
      const holeMesh = new THREE.Mesh(holeGeo, darkPlasticMaterial);
      termGroup.add(holeMesh);

      // Gaiola interna do borne (Latão/Cobre estanhado)
      const cageGeo = new THREE.BoxGeometry(0.35, 0.35, 0.4);
      const cageMesh = new THREE.Mesh(cageGeo, copperMaterial);
      cageMesh.position.set(0, 0, -0.05);
      termGroup.add(cageMesh);

      // Parafuso de aperto (Fenda/Phillips)
      const screwGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.1, 16);
      const screwMesh = new THREE.Mesh(screwGeo, metalMaterial);
      screwMesh.position.set(0, isTop ? 0.22 : -0.22, 0);
      termGroup.add(screwMesh);

      // Fenda do parafuso
      const slotCutGeo = new THREE.BoxGeometry(0.24, 0.04, 0.06);
      const slotCutMesh = new THREE.Mesh(slotCutGeo, darkPlasticMaterial);
      slotCutMesh.position.set(0, isTop ? 0.26 : -0.26, 0);
      termGroup.add(slotCutMesh);

      return termGroup;
    };

    breakerGroup.add(createTerminalBlock(1.42, true)); // Borne 1 (Linha)
    breakerGroup.add(createTerminalBlock(-1.42, false)); // Borne 2 (Carga)

    // G. Encaixe Traseiro para Trilho DIN TS-35
    const dinSlotGeo = new THREE.BoxGeometry(0.73, 1.4, 0.3);
    const dinSlotMesh = new THREE.Mesh(dinSlotGeo, darkPlasticMaterial);
    dinSlotMesh.position.set(0, 0, -1.2);
    breakerGroup.add(dinSlotMesh);

    // Presilha metálica móvel inferior (Mola de engate rápido DIN)
    const latchGeo = new THREE.BoxGeometry(0.4, 0.3, 0.15);
    const latchMesh = new THREE.Mesh(latchGeo, metalMaterial);
    latchMesh.position.set(0, -0.75, -1.2);
    breakerGroup.add(latchMesh);

    // Adiciona o conjunto à cena
    scene.add(breakerGroup);

    // 3. ANIMAÇÃO SUAVE E INTERAÇÃO COM O MOUSE
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Rotação orbital simples com o mouse ao segurar e arrastar
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([leverArmMesh, frontPlateMesh]);
      setIsHovered(intersects.length > 0);

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        breakerGroup.rotation.y += deltaX * 0.01;
        breakerGroup.rotation.x += deltaY * 0.01;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Clique direto na manopla 3D para comutar
    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([leverArmMesh, frontPlate]);

      if (intersects.length > 0) {
        toggleBreaker();
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('click', onClick);

    // Loop de renderização com interpolação da alavanca (Smooth Lerp)
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (leverGroupRef.current) {
        leverGroupRef.current.rotation.x +=
          (targetAngleRef.current - leverGroupRef.current.rotation.x) * 0.22;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Limpeza ao desmontar
    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('click', onClick);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // 4. LÓGICA DE CONTROLE E PROTEÇÃO TÉRMICA/MAGNÉTICA
  const toggleBreaker = () => {
    if (isTripped) {
      // Se estiver desarmado por falha, primeiro reseta
      setIsTripped(false);
      setIsOn(false);
      targetAngleRef.current = -0.6;
      return;
    }

    const nextState = !isOn;
    setIsOn(nextState);
    targetAngleRef.current = nextState ? 0.6 : -0.6;

    if (onStateChange) {
      onStateChange(nextState);
    }
  };

  // Simular Sobrecarga / Curto-Circuito (Curva C: Disparo Instantâneo para > 5x a 10x In)
  const triggerFault = (type: 'SOBRECARGA' | 'CURTO_CIRCUITO') => {
    if (!isOn) return;

    setIsTripped(true);
    setIsOn(false);
    targetAngleRef.current = -0.6; // Alavanca cai para OFF automaticamente (Disparo Livre)

    if (onStateChange) {
      onStateChange(false);
    }
  };

  return (
    <div style={containerStyle}>
      {/* PAINEL DE CONTROLE SUPERIOR */}
      <div style={headerBarStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>⚡</span>
          <div>
            <h2 style={{ fontSize: '15px', color: '#fff', margin: 0 }}>
              Minidisjuntor Monopolar WEG MDW-C16 (DIN)
            </h2>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>
              Corrente Nominal: <strong>16A</strong> • Curva de Disparo: <strong>Curva C (5 a 10 In)</strong> • Icn: <strong>3kA (230V)</strong>
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={toggleBreaker}
            style={{
              ...btnActionStyle,
              background: isOn ? '#ef4444' : '#22c55e',
              borderColor: isOn ? '#f87171' : '#4ade80',
            }}
          >
            {isOn ? '🔴 Desarmar (O OFF)' : '🟢 Armar (I ON)'}
          </button>
        </div>
      </div>

      {/* VIEWPORT 3D THREE.JS */}
      <div
        ref={mountRef}
        style={{
          ...viewportStyle,
          cursor: isHovered ? 'pointer' : 'grab',
        }}
      >
        {/* Marcadores HUD sobre o 3D */}
        <div style={hudTopTerminalStyle}>
          <span style={{ fontSize: '10px', color: '#38bdf8', fontWeight: 'bold' }}>⬆ Borne 1 (Linha / Fase)</span>
        </div>

        <div style={hudBottomTerminalStyle}>
          <span style={{ fontSize: '10px', color: '#38bdf8', fontWeight: 'bold' }}>⬇ Borne 2 (Carga / Circuito)</span>
        </div>

        <div style={hudStatusBadge}>
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: isTripped ? '#eab308' : isOn ? '#ef4444' : '#22c55e',
              boxShadow: isTripped
                ? '0 0 10px #eab308'
                : isOn
                ? '0 0 10px #ef4444'
                : '0 0 10px #22c55e',
            }}
          />
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#fff' }}>
            {isTripped ? 'DISPARADO (TRIP / FALHA)' : isOn ? 'ENERGIZADO (FECHADO)' : 'SECCIONADO (ABERTO)'}
          </span>
        </div>
      </div>

      {/* PAINEL DE SIMULAÇÃO DE CARGA E INJEÇÃO DE FALHAS */}
      <div style={controlFooterStyle}>
        <div style={{ flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#cbd5e1' }}>
            <span>Corrente de Carga no Circuito:</span>
            <strong style={{ color: currentLoad > 16 ? '#ef4444' : '#38bdf8' }}>
              {currentLoad} A {currentLoad > 16 ? '⚠️ (Sobrecarga!)' : '(Normal)'}
            </strong>
          </div>
          <input
            type="range"
            min="0"
            max="40"
            value={currentLoad}
            onChange={(e) => {
              const val = Number(e.target.value);
              setCurrentLoad(val);
              if (val > 22 && isOn) {
                triggerFault('SOBRECARGA');
              }
            }}
            style={{ width: '100%', cursor: 'pointer', accentColor: currentLoad > 16 ? '#ef4444' : '#0288d1' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => triggerFault('SOBRECARGA')}
            disabled={!isOn}
            style={{
              ...btnFaultStyle,
              background: '#b45309',
              cursor: !isOn ? 'not-allowed' : 'pointer',
              opacity: !isOn ? 0.5 : 1,
            }}
          >
            🔥 Simular Sobrecarga Térmica
          </button>

          <button
            onClick={() => triggerFault('CURTO_CIRCUITO')}
            disabled={!isOn}
            style={{
              ...btnFaultStyle,
              background: '#b91c1c',
              cursor: !isOn ? 'not-allowed' : 'pointer',
              opacity: !isOn ? 0.5 : 1,
            }}
          >
            ⚡ Simular Curto-Circuito (Magnético)
          </button>
        </div>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  background: '#090d16',
  border: '1px solid #1e293b',
  borderRadius: '14px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  maxWidth: '900px',
  width: '100%',
  margin: '0 auto',
  boxSizing: 'border-box',
  boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
};

const headerBarStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#131b2e',
  border: '1px solid #24324f',
  borderRadius: '10px',
  padding: '10px 16px',
  flexWrap: 'wrap',
  gap: '10px',
};

const viewportStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '520px',
  background: 'radial-gradient(circle at center, #1e293b 0%, #090d16 100%)',
  border: '2px solid #334155',
  borderRadius: '12px',
  overflow: 'hidden',
};

const btnActionStyle: React.CSSProperties = {
  border: '1px solid',
  borderRadius: '8px',
  color: '#fff',
  padding: '8px 16px',
  fontSize: '12px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
};

const btnFaultStyle: React.CSSProperties = {
  border: 'none',
  borderRadius: '6px',
  color: '#fff',
  padding: '8px 12px',
  fontSize: '11px',
  fontWeight: 'bold',
  transition: 'all 0.2s ease',
};

const hudTopTerminalStyle: React.CSSProperties = {
  position: 'absolute',
  top: '12px',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'rgba(15, 23, 42, 0.85)',
  border: '1px solid #38bdf8',
  borderRadius: '6px',
  padding: '4px 12px',
  pointerEvents: 'none',
};

const hudBottomTerminalStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '12px',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'rgba(15, 23, 42, 0.85)',
  border: '1px solid #38bdf8',
  borderRadius: '6px',
  padding: '4px 12px',
  pointerEvents: 'none',
};

const hudStatusBadge: React.CSSProperties = {
  position: 'absolute',
  top: '12px',
  right: '12px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'rgba(15, 23, 42, 0.9)',
  border: '1px solid #334155',
  borderRadius: '8px',
  padding: '6px 14px',
  pointerEvents: 'none',
};

const controlFooterStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#131b2e',
  border: '1px solid #24324f',
  borderRadius: '10px',
  padding: '12px 16px',
  flexWrap: 'wrap',
  gap: '12px',
};