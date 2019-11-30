import * as fs from 'fs';
import * as rd from 'readline';
import { element, number } from 'prop-types';

var reader = rd.createInterface(fs.createReadStream('./src/2018/day2/input.txt'));

var data: Array<{ value: string }> = [];
reader.on('line', (l: string) => {
  var tokens = l.split(' ');
  var nr: string = tokens[0].trim();
  data.push({
    value: nr,
  });
});

reader.on('close', () => {
  let start = new Date().getTime();
  data.forEach((hash) => {
    data.forEach((compareHash) => {
      let diff = HasOneDiff(hash.value, compareHash.value);

      if (diff[0]) {
        console.log(hash.value + ' ' + compareHash.value + ' ' + diff[0] + ' ' + diff[1]);

        let result = hash.value.substr(0, diff[1]) + hash.value.substr(diff[1] + 1, hash.value.length);
        console.log('Result: ' + result);
      }
    });
  });

  console.log('Timing: ' + (new Date().getTime() - start));
});

function HasOneDiff(baseString: string, compareString: string): [boolean, number] {
  let diffCount = 0;
  let index = -1;

  if (baseString !== compareString && baseString.length == compareString.length) {
    for (let i = 0; i < baseString.length; i++) {
      if (baseString[i] != compareString[i]) {
        diffCount++;
        index = i;
      }
    }

    if (diffCount == 1) {
      return [true, index];
    }
  }

  return [false, index];
}
