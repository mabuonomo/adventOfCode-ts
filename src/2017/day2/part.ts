import * as fs from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(fs.createReadStream(__dirname + '/input.txt'));

var data: Array<Array<number>> = [];
reader.on('line', (l: string) => {
  let datas = l.split('\t');

  let line: Array<number> = [];
  datas.forEach((element) => {
    line.push(parseInt(element));
  });

  data.push(line);
});

reader.on('close', () => {
  console.log('Result 1: ' + main1());
  console.log('Result 2: ' + main2());
});

function main1(): number {
  let sum = 0;
  data.forEach((row) => {
    let max = Math.max(...row);
    let min = Math.min(...row);

    sum += max - min;
  });

  return sum;
}

function main2(): number {
  let sum = 0;
  data.forEach((row) => {
    let values = [];
    row.forEach((element) => {
      // found two numbers in mod 0
      let found = row.some(
        // at least once
        (value, index, array) => element != value && Math.max(element, value) % Math.min(element, value) == 0,
      );

      if (found) {
        values.push(element);
      }
    });

    sum += Math.max(...values) / Math.min(...values);
  });

  return sum;
}
