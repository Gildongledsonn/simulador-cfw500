import React, { useState } from 'react';
import { useInverterAudio } from '../hooks/useInverterAudio';

export const AudioControls: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [audioStarted, setAudioStarted] = useState(false);

  const { initAudio } = useInverterAudio({ isMuted, masterVolume: volume });

  const handleToggleSound = () => {
    if (!audioStarted) {
      initAudio();
      setAudioStarted(true);
    }
    setIsMuted(!isMuted);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1a1d21', padding: '8px 14px', borderRadius: '8px', border: '1px solid #323842', width: '100%' }}>
      <button onClick={handleToggleSound} style={{ background: '#263238', border: '1px solid #455a64', color: '#eceff1', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
        {isMuted || !audioStarted ? '🔇 Áudio Desativado' : '🔊 Efeitos Sonoros ON'}
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#90a4ae' }}>
        <span>Volume:</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => {
            if (!audioStarted) {
              initAudio();
              setAudioStarted(true);
            }
            setVolume(parseFloat(e.target.value));
          }}
          style={{ width: '80px', accentColor: '#0288d1', cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};