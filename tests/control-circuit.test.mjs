import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import ts from 'typescript';
async function load(path){const code=ts.transpileModule(readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020}}).outputText;return import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));}
const {buildControlCircuit}=await load('src/utils/controlCircuit.ts');
const {createVoltageModel}=await load('src/utils/voltageModel.ts');
const components=[['g','REDE_MONOFASICA',true],['stop','BOTOEIRA_COGUMELO_NF',true],['start','BOTOEIRA_PULSO_NA',false],['k','CONTATOR_TRIPOLAR',false],['f','RELE_TERMICO',true]].map(([id,category,state])=>({id,category,state}));
const c=id=>components.find(c=>c.id===id);
const links=[['g:F','f:95NC'],['f:96NC','stop:11NC'],['stop:12NC','start:3NO'],['start:4NO','k:A1'],['k:A2','g:N'],['start:3NO','k:13NO'],['start:4NO','k:14NO']];
const cables=links.map(([a,b])=>{const [fromComponentId,fromTerminalId]=a.split(':');const [toComponentId,toTerminalId]=b.split(':');return {fromComponentId,fromTerminalId,toComponentId,toTerminalId};});
function scan(){for(let i=0;i<5;i++){const paths=buildControlCircuit(components,cables);const v=createVoltageModel(components,paths).voltage('k:A1','k:A2');const next=v===220;if(next===c('k').state)return next;c('k').state=next;}throw Error('Circuit did not settle');}
assert.equal(scan(),false,'repouso');
c('start').state=true;assert.equal(scan(),true,'liga');
c('start').state=false;assert.equal(scan(),true,'selo após soltar');
c('stop').state=false;assert.equal(scan(),false,'parada interrompe selo');
c('stop').state=true;assert.equal(scan(),false,'rearme não religa');
c('start').state=true;scan();c('start').state=false;c('f').tripped=true;assert.equal(scan(),false,'térmico interrompe comando');
c('f').tripped=false;assert.equal(scan(),false,'reset térmico não religa');
c('start').state=true;scan();c('start').state=false;const wire=cables.shift();assert.equal(scan(),false,'falta de alimentação');cables.unshift(wire);assert.equal(scan(),false,'retorno de alimentação não religa');
console.log('PASS: partida, selo, parada, rearme, contato térmico e falta/retorno de alimentação.');
