import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
async function load(path) {
  const reactUrl = pathToFileURL(createRequire(import.meta.url).resolve('react')).href;
  const code = ts.transpileModule(readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.React } }).outputText.replace(/from ['"]react['"]/g, `from '${reactUrl}'`);
  return import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
}
const { motorConnection, motorPhaseDirection } = await load('src/utils/motorConnection.ts');
const { createVoltageModel } = await load('src/utils/voltageModel.ts');
const { buildControlCircuit } = await load('src/utils/controlCircuit.ts');
const components = [{ id: 'grid', category: 'REDE_TRIFASICA' }, { id: 'k', category: 'CONTATOR_TRIPOLAR', state: true }, { id: 'm', category: 'MOTOR_TRIFASICO_6P' }];
const star = [['m:U2','m:V2'],['m:V2','m:W2']];
const delta = [['m:U1','m:W2'],['m:V1','m:U2'],['m:W1','m:V2']];
function inspect(sequence, closing = star, color = 'FORCA_R') {
  const links = [
    ...sequence.map((phase, i) => [`grid:${phase}`, `k:${['1L1','3L2','5L3'][i]}`]),
    ...['U1','V1','W1'].map((terminal,i) => [`k:${['2T1','4T2','6T3'][i]}`,`m:${terminal}`]),
    ...closing,
  ];
  const cables = links.map(([a,b]) => {
    const [fromComponentId,fromTerminalId] = a.split(':'); const [toComponentId,toTerminalId] = b.split(':');
    return { fromComponentId,fromTerminalId,toComponentId,toTerminalId,cableType:color };
  });
  const path = buildControlCircuit(components,cables);
  const model = createVoltageModel(components,path);
  return { connection:motorConnection('m',path,model.voltage), direction:motorPhaseDirection('m',model.potential) };
}
for (const [closing, type] of [[star,'STAR'],[delta,'DELTA']]) {
  for (const sequence of ['RST','STR','TRS']) assert.deepEqual(inspect([...sequence],closing),{connection:type,direction:'FWD'});
  for (const sequence of ['SRT','RTS','TSR']) assert.deepEqual(inspect([...sequence],closing),{connection:type,direction:'REV'});
}
assert.deepEqual(inspect(['R','S','T'],star,'CABO_PRETO'),inspect(['R','S','T']), 'colour does not reverse rotation');
for (const sequence of [['R','R','T'],['R','N','T'],['R','S','missing']]) assert.deepEqual(inspect(sequence),{connection:'INVALID',direction:null});
components[1].state = false;
assert.deepEqual(inspect(['S','R','T']),{connection:'INVALID',direction:null},'open contactor');
components[1].state = true;
assert.equal(inspect(['S','R','T']).direction,'REV','restart after swapping phases');
assert.equal(inspect(['R','S','T']).direction,'FWD','restore original wiring');
const { RealisticMotor3Phase } = await load('src/components/RealisticComponents.tsx');
for (const [direction, angle, label] of [['FWD',360,'↻ FWD'],['REV',-360,'↺ REV']]) {
  const svg = renderToStaticMarkup(React.createElement(RealisticMotor3Phase,{state:true,rotationDirection:direction}));
  assert.ok(svg.includes(`to="${angle} 8 90"`),'shaft animation direction');
  assert.ok(svg.includes(label),'visible rotation label');
}
const stopped = renderToStaticMarkup(React.createElement(RealisticMotor3Phase,{state:false,rotationDirection:'REV'}));
assert.ok(stopped.includes('PARADO')); assert.ok(!stopped.includes('animateTransform'));
console.log('PASS: seis sequências em estrela/triângulo, troca de qualquer par, cores, fase ausente/repetida, contator e retorno ao sentido original.');
