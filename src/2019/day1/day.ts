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
  runPart1(): number {
    const result = this.lines.reduce((acc, value) => this.sumString(acc, value, false));

    return parseInt(result);
  }

  @performanceLog(true)
  runPart2(): number {
    const result = this.lines.reduce((acc, value) => this.sumString(acc, value, true));

    return parseInt(result);
  }

  sumString(acc: string, value: string, rec: boolean): string {
    let tot = parseInt(acc);
    let recVal = this.calculateRecursive(value, rec);
    // console.log('Sum fuel: ' + value + ' ' + recVal);
    let sum: number = tot + recVal;

    return sum.toString();
  }

  calculateRecursive(value: string, rec: boolean = true): number {
    let num: number = parseInt(value);

    let carb = Math.floor(num / 3) - 2;

    if (!rec) {
      return carb;
    }
    // console.log(num + ' ' + carb);

    if (carb <= 0) {
      return 0;
    }

    return carb + this.calculateRecursive(carb.toString());
  }
}

let day = new Day1();
day.runPart1();
day.runPart2();
