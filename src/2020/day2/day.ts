import { InitAbstract } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';
import { parse } from 'path';

class Day1 extends InitAbstract {
  lines: Array<string>;
  constructor() {
    super();

    this.lines = this.getLines('day2', false);
  }

  @performanceLog(true)
  runPart1() {
    // const result = this.lines..reduce((acc, value) => this.sumString(acc, value, false));

    let counter = 0;
    this.lines.forEach((line) => {
      let split = line.split(' ');

      let min = parseInt(split[0].split('-')[0]);
      let max = parseInt(split[0].split('-')[1]);

      let char = split[1].split(':')[0];
      let text = split[2].trim();

      // /char/g
      let regex = new RegExp(char, 'g');
      let replace = text.replace(regex, '');
      let size = text.length - replace.length;
      // console.log(size, min, max, text.length, text.replace(char, '').length, replace);

      if (size >= min && size <= max) {
        counter++;
      }
    });

    console.log('Result', counter);
    return counter;
  }

  @performanceLog(true)
  runPart2() {
    let counter = 0;
    this.lines.forEach((line) => {
      let split = line.split(' ');

      let min = parseInt(split[0].split('-')[0]);
      let max = parseInt(split[0].split('-')[1]);

      let char = split[1].split(':')[0];
      let text = split[2].trim();

      let first = text.charAt(min - 1) === char;
      let second = text.charAt(max - 1) === char;

      // console.log(text, first, second, text.charAt(min - 1), text.charAt(max - 1));

      //xor
      if (!(first === second)) {
        counter++;
      }
    });

    console.log('Result', counter);
    return counter;
  }
}

let day = new Day1();
day.runPart1();
day.runPart2();
