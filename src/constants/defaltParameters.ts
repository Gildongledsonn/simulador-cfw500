import { ParameterMap } from '../types/cfw500';

export const INITIAL_PARAMETERS: ParameterMap = {
  // === LEITURA & MONITORAMENTO ===
  P0000: { code: 'P0000', description: 'Acesso aos Parâmetros (Senha: 5)', min: 0, max: 9999, step: 1, defaultValue: 5, currentValue: 5, unit: '' },
  P0001: { code: 'P0001', description: 'Velocidade do Motor (RPM)', min: 0, max: 18000, step: 1, defaultValue: 0, currentValue: 0, unit: 'RPM', readOnly: true },
  P0002: { code: 'P0002', description: 'Frequência de Saída', min: 0, max: 500, step: 0.1, defaultValue: 0, currentValue: 0, unit: 'Hz', readOnly: true },
  P0003: { code: 'P0003', description: 'Corrente de Saída (RMS)', min: 0, max: 100, step: 0.1, defaultValue: 0, currentValue: 0, unit: 'A', readOnly: true },
  P0004: { code: 'P0004', description: 'Tensão do Barramento CC (Link DC)', min: 0, max: 1000, step: 1, defaultValue: 310, currentValue: 310, unit: 'V', readOnly: true },
  P0005: { code: 'P0005', description: 'Frequência da Rede', min: 0, max: 100, step: 0.1, defaultValue: 60, currentValue: 60, unit: 'Hz', readOnly: true },
  P0006: { code: 'P0006', description: 'Estado do Inversor', min: 0, max: 9, step: 1, defaultValue: 0, currentValue: 0, unit: '', readOnly: true },
  P0007: { code: 'P0007', description: 'Tensão de Saída para o Motor', min: 0, max: 600, step: 1, defaultValue: 0, currentValue: 0, unit: 'V', readOnly: true },
  P0009: { code: 'P0009', description: 'Torque no Motor Estimado', min: -200, max: 200, step: 1, defaultValue: 0, currentValue: 0, unit: '%', readOnly: true },
  P0014: { code: 'P0014', description: 'Última Falha Ocorrida', min: 0, max: 999, step: 1, defaultValue: 0, currentValue: 0, unit: '', readOnly: true },

  // === RAMPAS & REFERÊNCIAS ===
  P0100: { code: 'P0100', description: 'Tempo de Aceleração (Rampa Subida)', min: 0.1, max: 999.0, step: 0.1, defaultValue: 5.0, currentValue: 5.0, unit: 's' },
  P0101: { code: 'P0101', description: 'Tempo de Desaceleração (Rampa Descida)', min: 0.1, max: 999.0, step: 0.1, defaultValue: 5.0, currentValue: 5.0, unit: 's' },
  P0102: { code: 'P0102', description: 'Tempo de Aceleração 2ª Rampa', min: 0.1, max: 999.0, step: 0.1, defaultValue: 10.0, currentValue: 10.0, unit: 's' },
  P0103: { code: 'P0103', description: 'Tempo de Desaceleração 2ª Rampa', min: 0.1, max: 999.0, step: 0.1, defaultValue: 10.0, currentValue: 10.0, unit: 's' },
  P0104: { code: 'P0104', description: 'Forma da Rampa (0=Linear, 1=Rampa S)', min: 0, max: 1, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0105: { code: 'P0105', description: '1ª/2ª Rampa Seleção (0=1ª, 1=2ª, 2=DI)', min: 0, max: 2, step: 1, defaultValue: 0, currentValue: 0, unit: '' },

  // === REFERÊNCIAS DE VELOCIDADE & MULTISPEED ===
  P0120: { code: 'P0120', description: 'Backup da Referência de Velocidade', min: 0, max: 1, step: 1, defaultValue: 1, currentValue: 1, unit: '' },
  P0121: { code: 'P0121', description: 'Referência de Velocidade via IHM', min: 0.0, max: 300.0, step: 0.1, defaultValue: 60.0, currentValue: 60.0, unit: 'Hz' },
  P0122: { code: 'P0122', description: 'Velocidade de Jog (Avanço Manual)', min: 0.0, max: 60.0, step: 0.1, defaultValue: 5.0, currentValue: 5.0, unit: 'Hz' },
  P0124: { code: 'P0124', description: 'Referência Multispeed 1 (Esteira Base)', min: 0.0, max: 300.0, step: 0.1, defaultValue: 15.0, currentValue: 15.0, unit: 'Hz' },
  P0125: { code: 'P0125', description: 'Referência Multispeed 2 (Sensor Detecção)', min: 0.0, max: 300.0, step: 0.1, defaultValue: 50.0, currentValue: 50.0, unit: 'Hz' },
  P0126: { code: 'P0126', description: 'Referência Multispeed 3', min: 0.0, max: 300.0, step: 0.1, defaultValue: 20.0, currentValue: 20.0, unit: 'Hz' },
  P0127: { code: 'P0127', description: 'Referência Multispeed 4', min: 0.0, max: 300.0, step: 0.1, defaultValue: 30.0, currentValue: 30.0, unit: 'Hz' },
  P0128: { code: 'P0128', description: 'Referência Multispeed 5', min: 0.0, max: 300.0, step: 0.1, defaultValue: 40.0, currentValue: 40.0, unit: 'Hz' },
  P0129: { code: 'P0129', description: 'Referência Multispeed 6', min: 0.0, max: 300.0, step: 0.1, defaultValue: 45.0, currentValue: 45.0, unit: 'Hz' },
  P0130: { code: 'P0130', description: 'Referência Multispeed 7', min: 0.0, max: 300.0, step: 0.1, defaultValue: 55.0, currentValue: 55.0, unit: 'Hz' },
  P0131: { code: 'P0131', description: 'Referência Multispeed 8', min: 0.0, max: 300.0, step: 0.1, defaultValue: 60.0, currentValue: 60.0, unit: 'Hz' },

  // === LIMITES DE FREQUÊNCIA E CORRENTE ===
  P0133: { code: 'P0133', description: 'Frequência Mínima de Operação', min: 0.0, max: 300.0, step: 0.1, defaultValue: 3.0, currentValue: 3.0, unit: 'Hz' },
  P0134: { code: 'P0134', description: 'Frequência Máxima de Operação', min: 0.0, max: 300.0, step: 0.1, defaultValue: 60.0, currentValue: 60.0, unit: 'Hz' },
  P0135: { code: 'P0135', description: 'Corrente Máxima de Saída (Sobrecarga)', min: 0.0, max: 20.0, step: 0.1, defaultValue: 10.0, currentValue: 10.0, unit: 'A' },

  // === CONTROLE V/F & BOOST DE TORQUE ===
  P0136: { code: 'P0136', description: 'Boost de Torque Manual (Compensação I*R)', min: 0.0, max: 30.0, step: 0.1, defaultValue: 2.0, currentValue: 2.0, unit: '%' },
  P0137: { code: 'P0137', description: 'Boost de Torque Automático', min: 0.0, max: 30.0, step: 0.1, defaultValue: 0.0, currentValue: 0.0, unit: '%' },
  P0138: { code: 'P0138', description: 'Compensação de Escorregamento', min: 0.0, max: 10.0, step: 0.1, defaultValue: 1.0, currentValue: 1.0, unit: '%' },
  P0142: { code: 'P0142', description: 'Tensão Máxima de Saída V/F', min: 0.0, max: 100.0, step: 0.1, defaultValue: 100.0, currentValue: 100.0, unit: '%' },
  P0145: { code: 'P0145', description: 'Frequência de Início de Enfraquecimento', min: 0.0, max: 300.0, step: 0.1, defaultValue: 60.0, currentValue: 60.0, unit: 'Hz' },

  // === FRENAGEM REOSTÁTICA & CC ===
  P0150: { code: 'P0150', description: 'Tipo de Frenagem CC (0=Desab, 1=Rampa, 2=Início)', min: 0, max: 2, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0151: { code: 'P0151', description: 'Nível de Corrente da Frenagem CC', min: 0.0, max: 100.0, step: 1.0, defaultValue: 20.0, currentValue: 20.0, unit: '%' },
  P0153: { code: 'P0153', description: 'Nível de Tensão de Atuação Frenagem Reostática', min: 300, max: 800, step: 1, defaultValue: 380, currentValue: 380, unit: 'V' },
  P0156: { code: 'P0156', description: 'Corrente de Sobrecarga Térmica 100%', min: 0.1, max: 20.0, step: 0.1, defaultValue: 4.5, currentValue: 4.5, unit: 'A' },

  // === CONTROLE & FUNÇÕES ESPECIAIS (SLEEP MODE P0217 / P0218) ===
  P0202: { code: 'P0202', description: 'Tipo de Controle (0=V/F linear, 1=V/F quadrático, 2=Vetorial)', min: 0, max: 2, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0204: { code: 'P0204', description: 'Carregar Padrão de Fábrica (5=Reset)', min: 0, max: 5, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0217: { code: 'P0217', description: 'Frequência de Sleep / Dormir', min: 0.0, max: 300.0, step: 0.1, defaultValue: 20.0, currentValue: 20.0, unit: 'Hz', },
  P0218: { code: 'P0218',    description: 'Tempo de Atraso do Modo Sleep', min: 0.0, max: 999.0, step: 0.1, defaultValue: 5.0, currentValue: 5.0, unit: 's',},  P0219: { code: 'P0219', description: 'Frequência de Wake-Up (Reativação da Esteira)', min: 0.0, max: 300.0, step: 0.1, defaultValue: 5.0, currentValue: 5.0, unit: 'Hz' },
  P0220: { code: 'P0220', description: 'Seleção Fonte Local/Remoto (0=Sempre LOC, 1=Sempre REM, 2=IHM, 3=DI)', min: 0, max: 3, step: 1, defaultValue: 2, currentValue: 2, unit: '' },
  P0221: { code: 'P0221', description: 'Seleção Referência Modo Local (0=IHM, 1=AI1, 2=Multispeed)', min: 0, max: 2, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0222: { code: 'P0222', description: 'Seleção Referência Modo Remoto (0=IHM, 1=AI1, 6=Multispeed, 7=Modbus)', min: 0, max: 8, step: 1, defaultValue: 1, currentValue: 1, unit: '' },
  P0223: { code: 'P0223', description: 'Seleção Sentido de Giro Local (0=Horário, 1=Anti-horário, 2=IHM)', min: 0, max: 2, step: 1, defaultValue: 2, currentValue: 2, unit: '' },
  P0226: { code: 'P0226', description: 'Seleção Sentido de Giro Remoto (0=Horário, 1=Anti-horário, 4=DIx)', min: 0, max: 5, step: 1, defaultValue: 4, currentValue: 4, unit: '' },
  P0227: { code: 'P0227', description: 'Seleção Gira/Para Modo Local (0=IHM Teclado, 1=DI)', min: 0, max: 1, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0228: { code: 'P0228', description: 'Seleção Gira/Para Modo Remoto (0=IHM, 1=DIx Bornes, 2=Modbus)', min: 0, max: 3, step: 1, defaultValue: 1, currentValue: 1, unit: '' },

  // === CONFIGURAÇÃO DE ENTRADAS & SAÍDAS (I/O) ===
  P0231: { code: 'P0231', description: 'Sinal da Entrada Analógica AI1 (0=0-10V, 1=4-20mA)', min: 0, max: 1, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0233: { code: 'P0233', description: 'Sinal Mínimo de Entrada AI1', min: 0.0, max: 100.0, step: 0.1, defaultValue: 0.0, currentValue: 0.0, unit: '%' },
  P0234: { code: 'P0234', description: 'Sinal Máximo de Entrada AI1', min: 0.0, max: 100.0, step: 0.1, defaultValue: 100.0, currentValue: 100.0, unit: '%' },
  P0251: { code: 'P0251', description: 'Função da Saída Analógica AO1 (0=Freq, 1=Corrente, 2=RPM)', min: 0, max: 5, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0252: { code: 'P0252', description: 'Ganho da Saída Analógica AO1', min: 0.0, max: 9.99, step: 0.01, defaultValue: 1.0, currentValue: 1.0, unit: '' },
  P0263: { code: 'P0263', description: 'Função da Entrada DI1 (1=Gira/Para, 6=Start 3 fios)', min: 0, max: 20, step: 1, defaultValue: 1, currentValue: 1, unit: '' },
  P0264: { code: 'P0264', description: 'Função da Entrada DI2 (0=Sentido, 7=Stop 3 fios, 8=Multispeed bit0)', min: 0, max: 20, step: 1, defaultValue: 8, currentValue: 8, unit: '' },
  P0265: { code: 'P0265', description: 'Função da Entrada DI3 (8=Multispeed bit1, 10=Reset Falha)', min: 0, max: 20, step: 1, defaultValue: 8, currentValue: 8, unit: '' },
  P0266: { code: 'P0266', description: 'Função da Entrada DI4 (8=Multispeed bit2, 12=LOC/REM)', min: 0, max: 20, step: 1, defaultValue: 8, currentValue: 8, unit: '' },
  P0275: { code: 'P0275', description: 'Função do Relé RL1 (1=Em Marcha RUN, 2=Pronto RDY)', min: 0, max: 15, step: 1, defaultValue: 1, currentValue: 1, unit: '' },
  P0277: { code: 'P0277', description: 'Função do Relé RL2 (1=Sem Falha, 2=Com Falha FAULT)', min: 0, max: 15, step: 1, defaultValue: 2, currentValue: 2, unit: '' },
  P0279: { code: 'P0279', description: 'Função do Relé RL3', min: 0, max: 15, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0295: { code: 'P0295', description: 'Frequência de Chaveamento PWM (2.5 a 15 kHz)', min: 2.5, max: 15.0, step: 0.5, defaultValue: 5.0, currentValue: 5.0, unit: 'kHz' },

  // === COMUNICAÇÃO SERIAL & MODBUS RTU ===
  P0308: { code: 'P0308', description: 'Endereço Modbus Serial (1 a 247)', min: 1, max: 247, step: 1, defaultValue: 1, currentValue: 1, unit: '' },
  P0310: { code: 'P0310', description: 'Baud Rate RS-485 (1=9600, 2=19200, 3=38400, 4=57600)', min: 1, max: 4, step: 1, defaultValue: 2, currentValue: 2, unit: '' },
  P0311: { code: 'P0311', description: 'Configuração da Paridade Serial (0=Nenhum, 1=Ímpar, 2=Par)', min: 0, max: 2, step: 1, defaultValue: 2, currentValue: 2, unit: '' },
  P0312: { code: 'P0312', description: 'Tipo de Protocolo (0=Desativado, 1=Modbus RTU)', min: 0, max: 2, step: 1, defaultValue: 1, currentValue: 1, unit: '' },
  P0313: { code: 'P0313', description: 'Ação em Caso de Erro de Comunicação (0=Desliga, 1=Mantém)', min: 0, max: 3, step: 1, defaultValue: 0, currentValue: 0, unit: '' },
  P0314: { code: 'P0314', description: 'Tempo Limite para Timeout de Rede Modbus', min: 0.0, max: 99.9, step: 0.1, defaultValue: 2.0, currentValue: 2.0, unit: 's' },
  P0316: { code: 'P0316', description: 'Status da Interface Serial RS-485', min: 0, max: 5, step: 1, defaultValue: 1, currentValue: 1, unit: '', readOnly: true },

  // === DADOS DO MOTOR (PLACA / CATALOGO) ===
  P0400: { code: 'P0400', description: 'Tensão Nominal do Motor (Placa)', min: 100, max: 500, step: 1, defaultValue: 220, currentValue: 220, unit: 'V' },
  P0401: { code: 'P0401', description: 'Frequência Nominal do Motor', min: 30.0, max: 120.0, step: 0.1, defaultValue: 60.0, currentValue: 60.0, unit: 'Hz' },
  P0402: { code: 'P0402', description: 'Rotação Nominal do Motor (RPM Placa)', min: 500, max: 18000, step: 1, defaultValue: 1750, currentValue: 1750, unit: 'RPM' },
  P0403: { code: 'P0403', description: 'Corrente Nominal do Motor (In)', min: 0.1, max: 20.0, step: 0.1, defaultValue: 4.5, currentValue: 4.5, unit: 'A' },
  P0404: { code: 'P0404', description: 'Potência Nominal do Motor', min: 0.1, max: 10.0, step: 0.1, defaultValue: 1.5, currentValue: 1.5, unit: 'cv' },
  P0407: { code: 'P0407', description: 'Fator de Potência Nominal (cos φ)', min: 0.5, max: 0.99, step: 0.01, defaultValue: 0.82, currentValue: 0.82, unit: '' },
  P0408: { code: 'P0408', description: 'Rendimento Nominal do Motor (η)', min: 50.0, max: 99.0, step: 0.1, defaultValue: 84.5, currentValue: 84.5, unit: '%' },
  P0409: { code: 'P0409', description: 'Classe de Isolamento Térmico (1=B, 2=F, 3=H)', min: 1, max: 3, step: 1, defaultValue: 2, currentValue: 2, unit: '' },
};