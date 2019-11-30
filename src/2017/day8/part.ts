import * as fs from 'fs';
import * as rd from 'readline';
import { REQ, OP, checkCondition, makeOP, findMaxRegistry } from './utils';

var reader = rd.createInterface(fs.createReadStream(__dirname + '/input.txt'));
// var reader = rd.createInterface(fs.createReadStream(__dirname + "/test.txt"))

var registry: Array<REQ> = [];
let operations: Array<OP> = [];

// pmp inc -432 if sdj <= -648
reader.on('line', (l: string) => {
  let line = l.split(' ');
  let reg = line[0].trim();

  if (registry.find((value, index, array) => value.name == reg) == undefined) {
    registry.push({ name: reg, value: 0 });
  }

  operations.push({
    registry: reg,
    op: line[1].trim(),
    value: parseInt(line[2].trim()),
    registry_compare: line[4].trim(),
    cond_compare: line[5].trim(),
    value_compare: parseInt(line[6]),
  });
});

reader.on('close', () => {
  console.log('Result 1: ' + main1());
  console.log('Result 2: ' + main2());
});

// pmp inc -432 if sdj <= -648
let max = 0;
function main1() {
  // console.log(operations)

  operations.forEach((operation) => {
    let reg = registry.find((value, index, array) => value.name == operation.registry_compare);

    // console.log(reg)
    if (checkCondition(operation, reg)) {
      let reg_m = registry.find((value, index, array) => value.name == operation.registry);
      reg_m.value = makeOP(reg_m, operation);
    }

    // console.log(registry)

    let v = findMaxRegistry(registry);
    if (max < v) {
      max = v;
    }
  });

  // console.log(registry)
  return findMaxRegistry(registry);
}

function main2() {
  return max;
}
