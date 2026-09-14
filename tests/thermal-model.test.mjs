import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import ts from 'typescript';
const code=ts.transpileModule(readFileSync('src/utils/thermalModel.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020}}).outputText;
const {advanceThermal,RESET_HEAT}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
let heat=0;
for(let i=0;i<1000;i++){const r=advanceThermal(heat,1,.1);heat=r.heat;assert.equal(r.trip,false);}
heat=0;let elapsed=0;
while(heat<1&&elapsed<60){heat=advanceThermal(heat,2,.1).heat;elapsed+=.1;}
assert.ok(heat>=1);assert.ok(elapsed<60);
const hot=heat;heat=advanceThermal(heat,0,.1).heat;assert.ok(heat<hot&&heat>RESET_HEAT);
for(let i=0;i<1000;i++)heat=advanceThermal(heat,0,.1).heat;
assert.ok(heat<RESET_HEAT);
assert.equal(advanceThermal(0,0,1).trip,false);
console.log('PASS: corrente nominal não dispara; sobrecarga aquece e dispara; resfriamento não é instantâneo.');
