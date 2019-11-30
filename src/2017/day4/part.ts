import * as fs from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(fs.createReadStream(__dirname + '/input.txt'));

var data: Array<Array<string>> = [];
var dataSort: Array<Array<string>> = [];

reader.on('line', (l: string) => {
  let datas = l.split(' ');

  let line: Array<string> = [];
  let lineSort: Array<string> = [];
  datas.forEach((element) => {
    line.push(element);
    lineSort.push(
      element
        .split('')
        .sort()
        .join(''),
    );
  });

  data.push(line);
  dataSort.push(lineSort);
});

reader.on('close', () => {
  console.log('Result 1: ' + main1());
  console.log('Result 2: ' + main2());
});

function main1(): number {
  let validCounter = 0;
  data.forEach((row) => {
    // all element are distinct
    if (
      row.every(function(elem, i, array) {
        return array.lastIndexOf(elem) === i;
      })
    ) {
      validCounter++;
    }
  });

  return validCounter;
}

function main2(): number {
  let validCounter = 0;
  dataSort.forEach((row) => {
    // all element are distinct
    if (
      row.every(function(elem, i, array) {
        return array.lastIndexOf(elem) === i;
      })
    ) {
      validCounter++;
    }
  });

  return validCounter;
}
