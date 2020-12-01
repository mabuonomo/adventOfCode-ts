import { InitAbstract } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';
import { parse } from 'path';

class Day1 extends InitAbstract {
  lines: Array<string>;
  constructor() {
    super();

    this.lines = this.getLines('day1', false);
  }

  @performanceLog(true)
  runPart1() {
    // const result = this.lines..reduce((acc, value) => this.sumString(acc, value, false));

    let first = 0;
    let second = 0;
    for (let i = 0; i < this.lines.length; i++) {
      for (let j = 0; j < this.lines.length; j++) {
        if (i !== j && parseInt(this.lines[i]) + parseInt(this.lines[j]) == 2020) {
          first = parseInt(this.lines[i]);
          second = parseInt(this.lines[j]);
        }
      }
    }

    console.log(first, second, first * second);
    // return parseInt(result);
  }

  @performanceLog(true)
  runPart2() {
    let first = 0;
    let second = 0;
    let third = 0;

    for (let i = 0; i < this.lines.length; i++) {
      for (let j = 0; j < this.lines.length; j++) {
        for (let k = 0; k < this.lines.length; k++) {
          if (
            i !== j &&
            j !== k &&
            k !== i &&
            parseInt(this.lines[k]) + parseInt(this.lines[i]) + parseInt(this.lines[j]) == 2020
          ) {
            first = parseInt(this.lines[i]);
            second = parseInt(this.lines[j]);
            third = parseInt(this.lines[k]);
          }
        }
      }
    }

    console.log(first, second, third, first * second * third);
  }
}

let day = new Day1();
day.runPart1();
day.runPart2();
