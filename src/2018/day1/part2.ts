import * as fs from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(fs.createReadStream('./src/2018/day1/input.txt'));

var data: Array<{ number: number }> = [];
reader.on('line', (l: string) => {
  var tokens = l.split(' ');
  var nr = parseInt(tokens[0]);
  data.push({
    number: nr,
  });
});

reader.on('close', () => {
  var value = 0;
  var frequency = Array<number>();
  var result = 0;

  result = readNumbers(value, frequency);

  console.log('Result ' + result);
});

function readNumbers(value: number, frequency: Array<number>): number {
  var result = null;

  for (let i = 0; i < data.length; i++) {
    let element = data[i];
    value += element.number;

    if (frequency.indexOf(value) >= 0) {
      return value;
    }

    frequency.push(value);
  }

  if (result == null) {
    result = readNumbers(value, frequency);
  }

  return result;
}
