import { useEffect, useRef } from 'react';
import { useInverter } from '../context/InverterContext';

interface AudioOptions {
  isMuted?: boolean;
  masterVolume?: number;
}

export const useInverterAudio = ({ isMuted = false, masterVolume = 0.3 }: AudioOptions = {}) => {
  const { state } = useInverter();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const pwmGainRef = useRef<GainNode | null>(null);
  const motorHumOscRef = useRef<OscillatorNode | null>(null);
  const motorHumGainRef = useRef<GainNode | null>(null);
  const alarmIntervalRef = useRef<number | null>(null);

  const initAudio = () => {
    if (audioCtxRef.current) {
      if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
      return;
    }

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.setValueAtTime(isMuted ? 0 : masterVolume, ctx.currentTime);
    master.connect(ctx.destination);
    masterGainRef.current = master;

    // Chaveamento PWM (4 kHz)
    const pwmOsc = ctx.createOscillator();
    pwmOsc.type = 'sine';
    pwmOsc.frequency.setValueAtTime(4000, ctx.currentTime);
    const pwmGain = ctx.createGain();
    pwmGain.gain.setValueAtTime(0, ctx.currentTime);
    pwmOsc.connect(pwmGain);
    pwmGain.connect(master);
    pwmOsc.start();
    pwmGainRef.current = pwmGain;

    // Tom magnético do estator
    const humOsc = ctx.createOscillator();
    humOsc.type = 'triangle';
    humOsc.frequency.setValueAtTime(20, ctx.currentTime);
    const humGain = ctx.createGain();
    humGain.gain.setValueAtTime(0, ctx.currentTime);
    humOsc.connect(humGain);
    humGain.connect(master);
    humOsc.start();
    motorHumOscRef.current = humOsc;
    motorHumGainRef.current = humGain;
  };

  const playBeep = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || isMuted || ctx.state === 'suspended') return;
    const beepOsc = ctx.createOscillator();
    const beepGain = ctx.createGain();
    beepOsc.type = 'square';
    beepOsc.frequency.setValueAtTime(1200, ctx.currentTime);
    beepGain.gain.setValueAtTime(0.15 * masterVolume, ctx.currentTime);
    beepGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
    beepOsc.connect(beepGain);
    beepGain.connect(ctx.destination);
    beepOsc.start();
    beepOsc.stop(ctx.currentTime + 0.2);
  };

  useEffect(() => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const now = ctx.currentTime;
    const isRunning = state.motorStatus === 'RUNNING' && state.outputFrequency > 0.1;

    if (masterGainRef.current) {
      masterGainRef.current.gain.setTargetAtTime(isMuted ? 0 : masterVolume, now, 0.05);
    }

    if (isRunning && !state.activeFault) {
      const maxFreq = state.parameters.P0134.currentValue || 60;
      const ratio = Math.min(1, state.outputFrequency / maxFreq);
      motorHumOscRef.current?.frequency.setTargetAtTime(25 + ratio * 95, now, 0.05);
      motorHumGainRef.current?.gain.setTargetAtTime(0.08 * ratio, now, 0.05);
      pwmGainRef.current?.gain.setTargetAtTime(0.04 * ratio, now, 0.05);
    } else {
      motorHumGainRef.current?.gain.setTargetAtTime(0, now, 0.05);
      pwmGainRef.current?.gain.setTargetAtTime(0, now, 0.05);
    }
  }, [state.outputFrequency, state.motorStatus, state.activeFault, isMuted, masterVolume, state.parameters.P0134]);

  useEffect(() => {
    if (state.activeFault && !isMuted) {
      playBeep();
      alarmIntervalRef.current = window.setInterval(() => playBeep(), 700);
    } else {
      if (alarmIntervalRef.current !== null) {
        clearInterval(alarmIntervalRef.current);
        alarmIntervalRef.current = null;
      }
    }
    return () => {
      if (alarmIntervalRef.current !== null) clearInterval(alarmIntervalRef.current);
    };
  }, [state.activeFault, isMuted]);

  return { initAudio };
};