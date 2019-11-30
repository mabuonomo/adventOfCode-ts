import * as fs from 'fs';
import * as rd from 'readline';
import { walk, walk2 } from './utils';
import { trampoline } from '../utils/utils';

var reader = rd.createInterface(fs.createReadStream(__dirname + '/input.txt'));

var data: Array<number> = [];

reader.on('line', (l: string) => {
  let line = l.split('\t');

  line.forEach((element) => {
    data.push(parseInt(element));
  });

  console.log(data);
});

reader.on('close', () => {
  console.log('Result 1: ' + main1());
  console.log('Result 2: ' + main2());
});

function main1(): number {
  let res = trampoline(walk);
  return res(data, 0);
}

function main2(): number {
  let res = trampoline(walk2);
  return res(data);
}
