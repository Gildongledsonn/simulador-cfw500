import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import ts from 'typescript';
const code = ts.transpileModule(readFileSync('src/utils/ovenCircuit.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const { evaluateOvenCircuit, advanceOven, initialOven } = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
const links = [
  ['comp_forca:FORCA_L','comp_dj:DJ_IN_1'], ['comp_forca:FORCA_N','comp_dj:DJ_IN_N'],
  ...[15,16,21,24].map(n => ['comp_dj:DJ_OUT_2', `comp_inova_bornes:PIN_${n}`]),
  ['comp_dj:DJ_OUT_N','comp_inova_bornes:PIN_14'],
  ...['comp_usina:USINA_N','comp_valvulas:VALV_GAS_2','comp_valvulas:VALV_AGUA_2'].map(n => ['comp_dj:DJ_OUT_N', n]),
  ['comp_inova_bornes:PIN_22','comp_usina:USINA_L'], ['comp_inova_bornes:PIN_25','comp_valvulas:VALV_GAS_1'],
  ['comp_inova_bornes:PIN_20','comp_valvulas:VALV_AGUA_1'], ['comp_usina:USINA_HV','comp_queimador:SPARK_ELECTRODE'],
  ['comp_inova_bornes:PIN_1','comp_queimador:TERMOPAR_J_MINUS'], ['comp_inova_bornes:PIN_2','comp_queimador:TERMOPAR_J_PLUS'],
  ['comp_inova_bornes:PIN_8','comp_queimador:FLAME_ROD_1'], ['comp_inova_bornes:PIN_9','comp_queimador:FLAME_ROD_2'],
  ['comp_forca:FORCA_PE','comp_inova_bornes:PIN_7'], ['comp_forca:FORCA_PE','comp_queimador:CH_TERRA'],
];
const wire = ([a,b], i) => {
  const [fromComponentId,fromTerminalId] = a.split(':'); const [toComponentId,toTerminalId] = b.split(':');
  return { id: String(i), fromComponentId,fromTerminalId,toComponentId,toTerminalId,cableType: 'FORCA_FASE' };
};
const cables = links.map(wire);
const valid = evaluateOvenCircuit(cables, true);
assert.equal(valid.shortCircuit, false);
for (const [key,value] of Object.entries(valid)) if (key !== 'shortCircuit') assert.equal(value, true, key);
assert.equal(evaluateOvenCircuit([], true).isEnergizado, false);
assert.equal(evaluateOvenCircuit(cables, false).isEnergizado, false);
assert.deepEqual(evaluateOvenCircuit(cables.map(c => ({ ...c, cableType: 'TERRA_PE' })), true), valid, 'colour must not change signal');
const without = terminal => cables.filter(c => c.toTerminalId !== terminal);
for (const [terminal,property] of [['DJ_IN_1','isEnergizado'],['DJ_IN_N','isEnergizado'],['USINA_N','usinaOk'],['SPARK_ELECTRODE','usinaOk'],['VALV_GAS_1','valvulaGasOk'],['VALV_GAS_2','valvulaGasOk'],['VALV_AGUA_2','valvulaAguaOk'],['CH_TERRA','sensor1Ok']]) {
  assert.equal(evaluateOvenCircuit(without(terminal), true)[property], false, terminal);
}
const reversed = cables.map(c => ({ ...c, toTerminalId: c.toTerminalId === 'TERMOPAR_J_PLUS' ? 'TERMOPAR_J_MINUS' : c.toTerminalId === 'TERMOPAR_J_MINUS' ? 'TERMOPAR_J_PLUS' : c.toTerminalId }));
assert.equal(evaluateOvenCircuit(reversed, true).termoparOk, false);
assert.equal(evaluateOvenCircuit([...cables,wire(['comp_forca:FORCA_L','comp_inova_bornes:PIN_25'])], true).valvulaGasOk, false, 'bypass output');
assert.equal(evaluateOvenCircuit([...cables,wire(['comp_forca:FORCA_L','comp_inova_bornes:PIN_26'])], true).valvulaGasOk, false, 'bypass redundant contact');
assert.equal(evaluateOvenCircuit([...cables,wire(['comp_forca:FORCA_L','comp_forca:FORCA_N'])], true).isEnergizado, false, 'short');
const settings = { ignition: 2, interval: 1, attempts: 3, secondSensor: false, ignitionFirst: false, delay: 0, setpoint: 26, offset: 0, hysteresis: 1 };
const tick = (s, grid = valid, config = settings, count = 1) => { for(let i=0;i<count;i++) s=advanceOven(s,grid,config,.1); return s; };
let s = tick({ ...initialOven(), phase: 'delay' });
assert.equal(s.phase, 'ignition'); assert.equal(s.gas,true); assert.equal(s.spark,true);
s = tick(s, valid, settings, 6); assert.equal(s.phase,'heating'); assert.equal(s.spark,false);
for (const broken of [{ ...valid, isEnergizado: false }, { ...valid, termoparOk: false }, { ...valid, sensor1Ok: false }, { ...valid, valvulaGasOk: false }]) {
  const failed=tick(s,broken); assert.equal(failed.phase,'fault'); assert.equal(failed.gas,false); assert.equal(failed.spark,false);
  assert.equal(tick(failed).phase,'fault','restoring wiring cannot restart');
}
const onlyFirst={...valid,sensor2Ok:false};
assert.equal(tick(s,onlyFirst).phase,'heating');
assert.equal(tick(s,onlyFirst,{...settings,secondSensor:true}).phase,'fault');
s=tick(s,valid,settings,20); assert.equal(s.phase,'satisfied'); assert.equal(s.gas,false);
s=tick(s,valid,settings,100); assert.ok(['heating','satisfied','ignition','delay'].includes(s.phase));
const noFlame={...valid,sensor1Ok:false};
let failed=tick({...initialOven(),phase:'delay'},noFlame,settings,150);
assert.equal(failed.phase,'fault'); assert.equal(failed.attempt,3); assert.equal(failed.gas,false);
let delayed=tick({...initialOven(),phase:'delay'},valid,{...settings,ignitionFirst:true});
assert.equal(delayed.spark,true); assert.equal(delayed.gas,false);
delayed=tick(delayed,valid,{...settings,ignitionFirst:true},10); assert.equal(delayed.gas,false);
assert.equal(tick(initialOven(),valid,settings,100).phase,'off');
console.log('PASS: pinagem, polaridade, cores, retornos, HV, PE, curto, S4 redundante, F-02/03/04/05/06, falhas e histerese.');
