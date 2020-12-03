import { InitAbstract } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';
import { parse } from 'path';

class Day1 extends InitAbstract {
  lines: Array<string>;
  constructor() {
    super();

    this.lines = this.getLines('day3', false);
  }

  @performanceLog(true)
  runPart1() {
    return this.calculateThree(3, 1);
  }

  calculateThree(x: number, y: number) {
    let i = 0;
    let j = 0;

    let three = 0;
    let empty = 0;
    while (true) {
      let sizeLine = this.lines[j].trim().length;
      let char = this.lines[j].trim().charAt(i);

      if (char == '#') {
        three++;
      } else {
        empty++;
      }

      i = (i + x) % sizeLine;
      j += y;
      if (this.lines[j] === undefined) break;
    }

    console.log('three', three, 'empty', empty);
    return [three, empty];
  }

  @performanceLog(true)
  runPart2() {
    let a = this.calculateThree(1, 1);
    let b = this.calculateThree(3, 1);
    let c = this.calculateThree(5, 1);
    let d = this.calculateThree(7, 1);
    let e = this.calculateThree(1, 2);

    return a[0] * b[0] * c[0] * d[0] * e[0];
  }
}

let day = new Day1();
day.runPart1();
day.runPart2();
