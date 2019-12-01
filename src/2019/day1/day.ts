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
  runPart11(): number {
    const result = this.lines.reduce((acc, value) => this.sumString(acc, value));

    return parseInt(result);
  }

  sumString(acc: string, value: string): string {
    let tot = parseInt(acc);
    let num: number = parseInt(value);

    let sum: number = tot + (Math.floor(num / 3) - 2);

    return sum.toString();
  }
}

new Day1().runPart11();
