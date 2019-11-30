import * as fs from 'fs';
import * as rd from 'readline';
import { NodeWeight, findWeightFrom } from './utils';

var reader = rd.createInterface(fs.createReadStream(__dirname + '/input.txt'));
// var reader = rd.createInterface(fs.createReadStream(__dirname + "/test.txt"))

var left: Array<NodeWeight> = [];
var right: Array<string> = [];
let result: Array<NodeWeight> = [];

// uylvg (403) -> xrvcjq, hihltxf, junpjcj, onkvtu, cckdoyb, favay, xsygurk
reader.on('line', (l: string) => {
  let line = l.split(' ');
  let name = line[0].trim();
  let weight = parseInt(line[1].slice(1, -1));

  let childs: Array<string> = [];
  try {
    // console.log(l.split('->'))
    line = l.split('->')[1].split(',');
    line.forEach((element) => {
      right.push(element.trim());
      childs.push(element.trim());
    });
  } catch (e) {}

  left.push({ name: name, weight: weight, childs: childs });
});

reader.on('close', () => {
  console.log('Result 1: ' + main1());
  console.log('Result 2: ' + main2());
});

function main1() {
  left.forEach((element) => {
    let found = right.find((value, index, array) => value == element.name);

    if (found == undefined) {
      result.push(element);
    }
  });

  return JSON.stringify(result);
}

function main2() {
  let output: Array<number> = [];
  left.forEach((res) => {
    let min: number = Infinity;
    let max: number = -Infinity;
    let maxNode: string;

    res.childs.forEach((element) => {
      let sum = findWeightFrom(element, left);
      // console.log(sum)

      if (sum > max) {
        max = sum;
        maxNode = element;
      }

      if (sum < min) {
        min = sum;
      }
    });

    let diff = max - min;
    let node = left.find((value, index, array) => value.name == maxNode);

    // console.log(node);
    // console.log(diff)
    // console.log('****')

    if (diff > 0) {
      // console.log('result')
      output.push(node.weight - diff);
    }
  });

  return JSON.stringify(output[0]);
}
