import {readFileSync} from 'node:fs';import assert from 'node:assert/strict';import ts from 'typescript';
async function load(p){const code=ts.transpileModule(readFileSync(p,'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020}}).outputText;return import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));}
const {motorConnection,advanceStarDelta}=await load('src/utils/motorConnection.ts');
const {createVoltageModel}=await load('src/utils/voltageModel.ts');
const {buildControlCircuit}=await load('src/utils/controlCircuit.ts');
const comps=[{id:'g',category:'REDE_TRIFASICA'},{id:'m',category:'MOTOR_TRIFASICO_6P'}];
const feed=[['g:R','m:U1'],['g:S','m:V1'],['g:T','m:W1']];
function check(extra){const cables=[...feed,...extra].map(([a,b])=>{const [fromComponentId,fromTerminalId]=a.split(':');const [toComponentId,toTerminalId]=b.split(':');return {fromComponentId,fromTerminalId,toComponentId,toTerminalId};});const path=buildControlCircuit(comps,cables);return motorConnection('m',path,createVoltageModel(comps,path).voltage);}
const star=[['m:U2','m:V2'],['m:V2','m:W2']];const delta=[['m:U1','m:W2'],['m:V1','m:U2'],['m:W1','m:V2']];
assert.equal(check(star),'STAR');assert.equal(check(delta),'DELTA');assert.equal(check([]),'INVALID');assert.equal(check([...star,...delta]),'INVALID');
let t=advanceStarDelta(0,true,.1,1);assert.equal(t.star,true);t=advanceStarDelta(.95,true,.1,1);assert.equal(t.star,false);assert.equal(t.delta,false);t=advanceStarDelta(1.15,true,.1,1);assert.equal(t.delta,true);t=advanceStarDelta(t.elapsed,false,.1,1);assert.deepEqual(t,{elapsed:0,star:false,delta:false});
console.log('PASS: estrela, triângulo, sobreposição inválida, intervalo com ambos abertos e reset sem alimentação.');
