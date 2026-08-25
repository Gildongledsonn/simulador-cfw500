import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { InverterState, ParameterKey, ParameterMap, ParameterMetadata } from '../types/cfw500';
import { inverterReducer, InverterAction } from './inverterReducer';

export const INITIAL_PARAMETERS: ParameterMap = {
  // ==========================================
  // GRUPO 1: MONITORAMENTO (P0000 - P0099)
  // ==========================================
  P0000: { code: 'P0000', description: 'Acesso aos Parâmetros', min: 0, max: 9999, step: 1, defaultValue: 0, currentValue: 5, unit: '' },
  P0001: { code: 'P0001', description: 'Velocidade de Saída (RPM)', min: 0, max: 18000, step: 1, defaultValue: 0, currentValue: 0, unit: 'RPM', readOnly: true },
  P0002: { code: 'P0002', description: 'Frequência de Saída', min: 0, max: 300.0, step: 0.1, defaultValue: 0, currentValue: 0, unit: 'Hz', readOnly: true },
  P0003: { code: 'P0003', description: 'Corrente do Motor', min: 0, max: 100.0, step: 0.1, defaultValue: 0, currentValue: 0, unit: 'A', readOnly: true },
  P0004: { code: 'P0004', description: 'Tensão Barramento CC', min: 0, max: 1000, step: 1, defaultValue: 310, currentValue: 310, unit: 'V', readOnly: true },
  P0005: { code: 'P0005', description: 'Frequência da Referência', min: 0, max: 300.0, step: 0.1, defaultValue: 60.0, currentValue: 60.0, unit: 'Hz', readOnly: true },
  P0006: { code: 'P0006', description: 'Estado do Inversor', min: 0, max: 10, step: 1, defaultValue: 0, currentValue: 0, unit: '', readOnly: true },
  P0007: { code: 'P0007', description: 'Tensão de Saída Motor', min: 0, max: 500, step: 1, defaultValue: 0, currentValue: 0, unit: 'V', readOnly: true },
  P0008: { code: 'P0008', description: 'Fator de Potência', min: 0, max: 1.0, step: 0.01, defaultValue: 0.82, currentValue: 0.82, unit: '', readOnly: true },
  P0009: { code: 'P0009', description: 'Torque do Motor', min: -200.0, max: 200.0, step: 0.1, defaultValue: 0.0, currentValue: 0.0, unit: '%', readOnly: true },
  P0010: { code: 'P0010', description: 'Potência de Saída', min: 0, max: 100.0, step: 0.1, defaultValue: 0.0, currentValue: 0.0, unit: 'kW', readOnly: true },
  P0011: { code: 'P0011', description: 'Sobrecarga Inversor Ixt', min: 0, max: 100, step: 1, defaultValue: 0, currentValue: 0, unit: '%', readOnly: true },
  P0012: { code: 'P0012', description: 'Status Entradas DI1-DI4', min: 0, max: 15, step: 1, defaultValue: 0, currentValue: 0, unit: '', readOnly: true },
  P0013: { code: 'P0013', description: 'Status Saídas Relé', min: 0, max: 7, step: 1, defaultValue: 1, currentValue: 1, unit: '', readOnly: true },
  P0014: { code: 'P0014', description: 'Valor Entrada AI1 (%)', min: 0, max: 100.0, step: 0.1, defaultValue: 0.0, currentValue: 0.0, unit: '%', readOnly: true },
  P0018: { code: 'P0018', description: 'Valor Entrada AI1 (V)', min: 0, max: 10.0, step: 0.1, defaultValue: 0.0, currentValue: 0.0, unit: 'V', readOnly: true },
  P0023: { code: 'P0023', description: 'Versão do Software', min: 0, max: 99.99, step: 0.01, defaultValue: 3.20, currentValue: 3.20, unit: '', readOnly: true },
  P0030: { code: 'P0030', description: 'Temperatura Dissipador', min: 0, max: 150, step: 1, defaultValue: 38, currentValue: 38, unit: '°C', readOnly: true },
  P0037: { code: 'P0037', description: 'Sobrecarga Motor Ixt', min: 0, max: 100, step: 1, defaultValue: 0, currentValue: 0, unit: '%', readOnly: true },
  P0050: { code: 'P0050', description: 'Última Falha Ocorrida', min: 0, max: 999, step: 1, defaultValue: 0, currentValue: 0, unit: '', readOnly: true },

  // ==========================================
  // GRUPO 2: RAMPAS E LIMITES (P0100 - P0149)
  // ==========================================
  P0100: { code: 'P0100', description: 'Tempo de Aceleração 1', min: 0.1, max: 999.0, step: 0.1, defaultValue: 5.0, currentValue: 5.0, unit: 's' },
  P0101: { code: 'P0101', description: 'Tempo de Desaceleração 1', min: 0.1, max: 999.0, step: 0.1, defaultValue: 5.0, currentValue: 5.0, unit: 's' },
  P0102: { code: 'P0102', description: 'Tempo de Aceleração 2', min: 0.1, max: 999.0, step: 0.1, defaultValue: 10.0, currentValue: 10.0, unit: 's' },
  P0103: { code: 'P0103', description: 'Tempo de Desaceleração 2', min: 0.1, max: 999.0, step: 0.1, defaultValue: 10.0, currentValue: 10.0, unit: 's' },
  P0104: { code: 'P0104', description: 'Forma da Rampa (0=Linear, 1=S)', min: 0, max: 1, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0105: { code: 'P0105', description: 'Seleção 2ª Rampa', min: 0, max: 2, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0120: { code: 'P0120', description: 'Backup Referência IHM', min: 0.0, max: 300.0, step: 0.1, defaultValue: 60.0, currentValue: 60.0, unit: 'Hz' },
  P0121: { code: 'P0121', description: 'Referência Frequência IHM', min: 0.0, max: 300.0, step: 0.1, defaultValue: 3.0, currentValue: 60.0, unit: 'Hz' },
  P0122: { code: 'P0122', description: 'Frequência de JOG', min: 0.0, max: 300.0, step: 0.1, defaultValue: 5.0, currentValue: 5.0, unit: 'Hz' },
  P0123: { code: 'P0123', description: 'Aceleração JOG', min: 0.1, max: 999.0, step: 0.1, defaultValue: 5.0, currentValue: 5.0, unit: 's' },
  P0124: { code: 'P0124', description: 'Multispeed Referência 1', min: 0.0, max: 300.0, step: 0.1, defaultValue: 5.0, currentValue: 5.0, unit: 'Hz' },
  P0125: { code: 'P0125', description: 'Multispeed Referência 2', min: 0.0, max: 300.0, step: 0.1, defaultValue: 10.0, currentValue: 10.0, unit: 'Hz' },
  P0126: { code: 'P0126', description: 'Multispeed Referência 3', min: 0.0, max: 300.0, step: 0.1, defaultValue: 20.0, currentValue: 20.0, unit: 'Hz' },
  P0127: { code: 'P0127', description: 'Multispeed Referência 4', min: 0.0, max: 300.0, step: 0.1, defaultValue: 30.0, currentValue: 30.0, unit: 'Hz' },
  P0128: { code: 'P0128', description: 'Multispeed Referência 5', min: 0.0, max: 300.0, step: 0.1, defaultValue: 40.0, currentValue: 40.0, unit: 'Hz' },
  P0129: { code: 'P0129', description: 'Multispeed Referência 6', min: 0.0, max: 300.0, step: 0.1, defaultValue: 50.0, currentValue: 50.0, unit: 'Hz' },
  P0130: { code: 'P0130', description: 'Multispeed Referência 7', min: 0.0, max: 300.0, step: 0.1, defaultValue: 55.0, currentValue: 55.0, unit: 'Hz' },
  P0131: { code: 'P0131', description: 'Multispeed Referência 8', min: 0.0, max: 300.0, step: 0.1, defaultValue: 60.0, currentValue: 60.0, unit: 'Hz' },
  P0133: { code: 'P0133', description: 'Frequência Mínima', min: 0.0, max: 300.0, step: 0.1, defaultValue: 3.0, currentValue: 3.0, unit: 'Hz' },
  P0134: { code: 'P0134', description: 'Frequência Máxima', min: 0.0, max: 300.0, step: 0.1, defaultValue: 60.0, currentValue: 60.0, unit: 'Hz' },
  P0135: { code: 'P0135', description: 'Corrente Máxima de Saída', min: 0.0, max: 50.0, step: 0.1, defaultValue: 10.0, currentValue: 10.0, unit: 'A' },
  P0136: { code: 'P0136', description: 'Boost de Torque Manual (V/F)', min: 0.0, max: 30.0, step: 0.1, defaultValue: 5.0, currentValue: 5.0, unit: '%' },
  P0137: { code: 'P0137', description: 'Boost de Torque Automático', min: 0.0, max: 30.0, step: 0.1, defaultValue: 0.0, currentValue: 0.0, unit: '%' },
  P0138: { code: 'P0138', description: 'Compensação Escorregamento', min: 0.0, max: 10.0, step: 0.1, defaultValue: 1.0, currentValue: 1.0, unit: '%' },
  P0139: { code: 'P0139', description: 'Frequência Chaveamento PWM', min: 2.5, max: 15.0, step: 0.5, defaultValue: 5.0, currentValue: 5.0, unit: 'kHz' },
  P0140: { code: 'P0140', description: 'Tipo de Frenagem (0=Rampa, 1=Inércia)', min: 0, max: 1, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0142: { code: 'P0142', description: 'Tensão de Frenagem CC', min: 0.0, max: 30.0, step: 0.1, defaultValue: 0.0, currentValue: 0.0, unit: '%' },
  P0143: { code: 'P0143', description: 'Tempo Frenagem CC', min: 0.0, max: 15.0, step: 0.1, defaultValue: 0.0, currentValue: 0.0, unit: 's' },
  P0145: { code: 'P0145', description: 'Freq Início Frenagem CC', min: 0.0, max: 15.0, step: 0.1, defaultValue: 2.0, currentValue: 2.0, unit: 'Hz' },

// ==========================================
  // GRUPO DE FRENAGEM CC (P0150 - P0159)
  // ==========================================
  P0150: {
    code: 'P0150',
    description: 'Tempo de Duração da Frenagem CC na Parada',
    min: 0.0,
    max: 15.0,
    step: 0.1,
    defaultValue: 1.0,
    currentValue: 1.0,
    unit: 's',
  },
  P0151: {
    code: 'P0151',
    description: 'Frequência de Início da Frenagem CC',
    min: 0.0,
    max: 15.0,
    step: 0.1,
    defaultValue: 1.0,
    currentValue: 1.0,
    unit: 'Hz',
  },
  P0152: {
    code: 'P0152',
    description: 'Corrente de Injeção de Frenagem CC',
    min: 0.0,
    max: 100.0,
    step: 0.1,
    defaultValue: 20.0,
    currentValue: 20.0,
    unit: '%',
  },

  // ==========================================
  // COMPLEMENTOS DE CONTROLE E PROTEÇÃO
  // ==========================================
  P0156: {
    code: 'P0156',
    description: 'Corrente de Sobrecarga do Motor (Limite Térmico)',
    min: 0.1,
    max: 30.0,
    step: 0.1,
    defaultValue: 5.0,
    currentValue: 5.0,
    unit: 'A',
  },
  P0169: {
    code: 'P0169',
    description: 'Frequência de Ressonância (Bypass Mecânico 1)',
    min: 0.0,
    max: 300.0,
    step: 0.1,
    defaultValue: 0.0,
    currentValue: 0.0,
    unit: 'Hz',
  },


  // ==========================================
  // GRUPO 3: MODOS DE CONTROLE (P0200 - P0229)
  // ==========================================
  P0202: { code: 'P0202', description: 'Tipo de Controle (0=V/F, 1=VVW)', min: 0, max: 2, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0204: { code: 'P0204', description: 'Carrega Padrão Fábrica (5=Reset)', min: 0, max: 5, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0205: { code: 'P0205', description: 'Parâmetro Inicial Display', min: 1, max: 9, step: 1, defaultValue: 2, currentValue: 2, unit: '' },
  P0206: { code: 'P0206', description: 'Auto-Reset de Falhas', min: 0, max: 1, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0208: { code: 'P0208', description: 'Tensão Nominal Rede CA', min: 200, max: 480, step: 10, defaultValue: 220, currentValue: 220, unit: 'V' },
  P0217: { code: 'P0217', description: 'Função Sleep / Dormir', min: 0, max: 300, step: 1, defaultValue: 15, currentValue: 15, unit: 'Hz' },
  P0218: { code: 'P0218', description: 'Tempo Inatividade Sleep', min: 0, max: 999, step: 1, defaultValue: 120, currentValue: 120, unit: 's' },
  P0219: { code: 'P0219', description: 'Frequência Despertar Sleep', min: 0.0, max: 300.0, step: 0.1, defaultValue: 10.0, currentValue: 10.0, unit: 'Hz' },
  P0220: { code: 'P0220', description: 'Seleção Modo Local/Remoto', min: 0, max: 3, step: 1, defaultValue: 2, currentValue: 2, unit: '' },
  P0221: { code: 'P0221', description: 'Referência Local (0=IHM, 1=AI1)', min: 0, max: 2, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0222: { code: 'P0222', description: 'Referência Remota (0=IHM, 1=AI1, 6=Multi, 7=Modbus)', min: 0, max: 7, step: 1, defaultValue: 1, currentValue: 1, unit: '' },
  P0223: { code: 'P0223', description: 'Sentido Giro Modo Local', min: 0, max: 2, step: 1, defaultValue: 2, currentValue: 2, unit: '' },
  P0224: { code: 'P0224', description: 'Gira/Para Modo Local', min: 0, max: 1, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0225: { code: 'P0225', description: 'JOG Modo Local', min: 0, max: 2, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0226: { code: 'P0226', description: 'Sentido Giro Modo Remoto', min: 0, max: 2, step: 1, defaultValue: 2, currentValue: 2, unit: '' },
  P0227: { code: 'P0227', description: 'Gira/Para Modo Remoto', min: 0, max: 1, step: 1, defaultValue: 1, currentValue: 1, unit: '' },
  P0228: { code: 'P0228', description: 'JOG Modo Remoto', min: 0, max: 2, step: 1, defaultValue: 0, currentValue: 0, unit: '' },

  // ==========================================
  // GRUPO 4: ENTRADAS & SAÍDAS (P0230 - P0299)
  // ==========================================
  P0231: { code: 'P0231', description: 'Função Sinal Entrada AI1', min: 0, max: 2, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0232: { code: 'P0232', description: 'Ganho da Entrada AI1', min: 0.0, max: 10.0, step: 0.01, defaultValue: 1.0, currentValue: 1.0, unit: '' },
  P0233: { code: 'P0233', description: 'Sinal Entrada AI1 (0=0-10V, 1=4-20mA)', min: 0, max: 2, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0234: { code: 'P0234', description: 'Offset Entrada AI1', min: -100.0, max: 100.0, step: 0.1, defaultValue: 0.0, currentValue: 0.0, unit: '%' },
  P0235: { code: 'P0235', description: 'Filtro Entrada AI1', min: 0.0, max: 10.0, step: 0.01, defaultValue: 0.05, currentValue: 0.05, unit: 's' },
  P0251: { code: 'P0251', description: 'Função Saída Analógica AO1', min: 0, max: 5, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0252: { code: 'P0252', description: 'Ganho Saída AO1', min: 0.0, max: 10.0, step: 0.01, defaultValue: 1.0, currentValue: 1.0, unit: '' },
  P0253: { code: 'P0253', description: 'Tipo Sinal Saída AO1', min: 0, max: 2, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0254: { code: 'P0254', description: 'Escala Máxima Saída AO1', min: 0, max: 300, step: 1, defaultValue: 60, currentValue: 60, unit: 'Hz' },
  P0263: { code: 'P0263', description: 'Função Entrada DI1 (1=Gira/Para)', min: 0, max: 20, step: 1, defaultValue: 1, currentValue: 1, unit: '' },
  P0264: { code: 'P0264', description: 'Função Entrada DI2 (1=Sentido, 2=Multi)', min: 0, max: 20, step: 1, defaultValue: 1, currentValue: 1, unit: '' },
  P0265: { code: 'P0265', description: 'Função Entrada DI3 (1=Reset, 2=Multi)', min: 0, max: 20, step: 1, defaultValue: 2, currentValue: 2, unit: '' },
  P0266: { code: 'P0266', description: 'Função Entrada DI4 (1=JOG, 2=Multi)', min: 0, max: 20, step: 1, defaultValue: 2, currentValue: 2, unit: '' },
  P0267: { code: 'P0267', description: 'Função Entrada DI5', min: 0, max: 20, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0268: { code: 'P0268', description: 'Função Entrada DI6', min: 0, max: 20, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0275: { code: 'P0275', description: 'Função Relé RL1 (15=RUN, 14=Falha)', min: 0, max: 20, step: 1, defaultValue: 15, currentValue: 15, unit: '' },
  P0276: { code: 'P0276', description: 'Função Relé RL2 (14=Falha, 1=OK)', min: 0, max: 20, step: 1, defaultValue: 14, currentValue: 14, unit: '' },
  P0277: { code: 'P0277', description: 'Função Saída Transistor DO1', min: 0, max: 20, step: 1, defaultValue: 14, currentValue: 14, unit: '' },
  P0278: { code: 'P0278', description: 'Atraso Ligação Relé RL1', min: 0.0, max: 99.9, step: 0.1, defaultValue: 0.0, currentValue: 0.0, unit: 's' },
  P0279: { code: 'P0279', description: 'Atraso Desligamento Relé RL1', min: 0.0, max: 99.9, step: 0.1, defaultValue: 0.0, currentValue: 0.0, unit: 's' },
  P0295: { code: 'P0295', description: 'Corrente Nominal Inversor', min: 0.1, max: 100.0, step: 0.1, defaultValue: 7.3, currentValue: 7.3, unit: 'A', readOnly: true },
  P0297: { code: 'P0297', description: 'PWM Automático por Temp.', min: 0, max: 1, step: 1, defaultValue: 1, currentValue: 1, unit: '' },

  // ==========================================
  // GRUPO 5: COMUNICAÇÃO & IHM (P0300 - P0399)
  // ==========================================
  P0308: { code: 'P0308', description: 'Endereço Modbus RTU', min: 1, max: 247, step: 1, defaultValue: 1, currentValue: 1, unit: '' },
  P0310: { code: 'P0310', description: 'Baud Rate (1=19200)', min: 0, max: 3, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0311: { code: 'P0311', description: 'Paridade Serial (1=Par 1Stop)', min: 0, max: 2, step: 1, defaultValue: 1, currentValue: 1, unit: '' },
  P0312: { code: 'P0312', description: 'Protocolo Comunicação', min: 0, max: 2, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0313: { code: 'P0313', description: 'Ação Timeout Comunicação', min: 0, max: 3, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0314: { code: 'P0314', description: 'Tempo Limite Timeout Serial', min: 0.0, max: 99.9, step: 0.1, defaultValue: 1.0, currentValue: 1.0, unit: 's' },
  P0316: { code: 'P0316', description: 'Telegramas Modbus Válidos', min: 0, max: 65535, step: 1, defaultValue: 142, currentValue: 142, unit: '', readOnly: true },
  P0340: { code: 'P0340', description: 'Habilita Tecla LOC/REM', min: 0, max: 1, step: 1, defaultValue: 1, currentValue: 1, unit: '' },
  P0341: { code: 'P0341', description: 'Habilita Tecla Sentido Giro', min: 0, max: 1, step: 1, defaultValue: 1, currentValue: 1, unit: '' },

  // ==========================================
  // GRUPO 6: DADOS DO MOTOR (P0400 - P0409)
  // ==========================================
  P0400: { code: 'P0400', description: 'Tensão Nominal Motor', min: 100, max: 600, step: 1, defaultValue: 220, currentValue: 220, unit: 'V' },
  P0401: { code: 'P0401', description: 'Frequência Nominal Motor', min: 10.0, max: 300.0, step: 0.1, defaultValue: 60.0, currentValue: 60.0, unit: 'Hz' },
  P0402: { code: 'P0402', description: 'Rotação Nominal Motor', min: 0, max: 18000, step: 1, defaultValue: 1750, currentValue: 1750, unit: 'RPM' },
  P0403: { code: 'P0403', description: 'Corrente Nominal Motor', min: 0.1, max: 50.0, step: 0.1, defaultValue: 4.5, currentValue: 4.5, unit: 'A' },
  P0404: { code: 'P0404', description: 'Potência Nominal Motor', min: 0.1, max: 20.0, step: 0.1, defaultValue: 1.5, currentValue: 1.5, unit: 'cv' },
  P0405: { code: 'P0405', description: 'Rendimento Nominal (Eta)', min: 50.0, max: 99.0, step: 0.1, defaultValue: 83.5, currentValue: 83.5, unit: '%' },
  P0406: { code: 'P0406', description: 'Fator de Potência Motor', min: 0.5, max: 0.99, step: 0.01, defaultValue: 0.82, currentValue: 0.82, unit: '' },
  P0407: { code: 'P0407', description: 'Fator de Serviço Motor', min: 1.0, max: 1.5, step: 0.01, defaultValue: 1.15, currentValue: 1.15, unit: '' },
  P0408: { code: 'P0408', description: 'Auto-Ajuste do Motor', min: 0, max: 1, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0409: { code: 'P0409', description: 'Resistência Estatórica (Rs)', min: 0.0, max: 99.9, step: 0.1, defaultValue: 2.8, currentValue: 2.8, unit: 'Ω' },
};

const STORAGE_KEY = '@CFW500_EEPROM_STORAGE_V3';

const loadSavedParameters = (): ParameterMap => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return INITIAL_PARAMETERS;
    const parsed = JSON.parse(saved);

    // Mescla garantindo que todos os novos parâmetros existam
    const merged: ParameterMap = { ...INITIAL_PARAMETERS };
    (Object.keys(INITIAL_PARAMETERS) as ParameterKey[]).forEach((key) => {
      if (parsed[key] && typeof parsed[key].currentValue === 'number') {
        merged[key] = {
          ...INITIAL_PARAMETERS[key],
          currentValue: parsed[key].currentValue,
        };
      }
    });
    return merged;
  } catch {
    return INITIAL_PARAMETERS;
  }
};

const initialState: InverterState = {
  parameters: loadSavedParameters(),
  selectedParamIndex: 0,
  editBuffer: 0,
  ihmMode: 'MONIT',
  controlSource: 'LOC',
  motorStatus: 'READY',
  isForwardDirection: true,
  activeFault: null,
  digitalInputs: { di1: false, di2: false, di3: false, di4: false },
  ai1Voltage: 0,
  outputFrequency: 0,
  outputCurrent: 0,
  motorRPM: 0,
  dcBusVoltage: 310,
};

interface InverterContextType {
  state: InverterState;
  dispatch: React.Dispatch<InverterAction>;
  currentDisplayValue: string;
  selectedParameter: ParameterMetadata;
}

const InverterContext = createContext<InverterContextType | undefined>(undefined);

export const InverterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(inverterReducer, initialState);

  // Sincroniza sempre com o localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.parameters));
  }, [state.parameters]);

  const paramKeys = Object.keys(state.parameters) as ParameterKey[];
  const selectedParameter = state.parameters[paramKeys[state.selectedParamIndex]] || INITIAL_PARAMETERS.P0000;

 let currentDisplayValue = 'rdy';
  if (state.activeFault) {
    currentDisplayValue = typeof state.activeFault === 'object' ? state.activeFault.code : state.activeFault;
  } else if (state.ihmMode === 'MONIT') {
    const freq = state.outputFrequency ?? 0;
    currentDisplayValue = (state.motorStatus === 'RUNNING' || freq > 0) ? freq.toFixed(1) : 'rdy';
  } else if (state.ihmMode === 'PARAM_SELECT') {
    currentDisplayValue = selectedParameter ? selectedParameter.code : 'P0000';
  } else if (state.ihmMode === 'PARAM_EDIT') {
    const step = selectedParameter?.step ?? 1;
    const decimals = step < 1 ? 1 : 0;
    currentDisplayValue = selectedParameter ? Number(state.editBuffer ?? 0).toFixed(decimals) : '0';
  }

  return (
    <InverterContext.Provider value={{ state, dispatch, currentDisplayValue, selectedParameter }}>
      {children}
    </InverterContext.Provider>
  );
};

export const useInverter = (): InverterContextType => {
  const context = useContext(InverterContext);
  if (!context) throw new Error('useInverter deve ser usado dentro de InverterProvider');
  return context;
};