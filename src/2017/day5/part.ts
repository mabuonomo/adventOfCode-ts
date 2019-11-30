import * as fs from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(fs.createReadStream(__dirname + '/input.txt'));

var data: Array<number> = [];
var data2: Array<number> = [];

reader.on('line', (l: string) => {
  data.push(parseInt(l));
  data2.push(parseInt(l));
});

reader.on('close', () => {
  console.log('Result 1: ' + main1());
  console.log('Result 2: ' + main2());
});

function main1(): number {
  let step = 0;
  let index = 0;

  while (index < data.length) {
    data[index] += 1;
    index += data[index] - 1;
    step++;
  }

  return step;
}

function main2(): number {
  let step = 0;
  let index = 0;

  while (index < data2.length) {
    let jump = data2[index] >= 3 ? -1 : 1;
    data2[index] += jump;
    index += data2[index] - jump;
    step++;

    // console.log(data2)
  }

  return step;
}
