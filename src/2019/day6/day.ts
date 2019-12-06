import { InitAbstract, Direction, Geo } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';
import deepEqual from 'deep-equal';
import { Md5 } from 'md5-typescript';
import { copyFile } from 'fs';
import { object } from 'prop-types';

type Line = { p1: Geo; p2: Geo; md5: string };

export class Day extends InitAbstract {
  runNewPart1(input: string[]) {
    throw new Error('Method not implemented.');
  }
  runNewPart2(input: string[]) {
    throw new Error('Method not implemented.');
  }

  lines: Array<string>;

  constructor() {
    super();

    this.lines = this.getLines('day6');
  }

  @performanceLog(true)
  runPart1(): number {
    return this.counter(this.lines, 'COM');
  }

  @performanceLog(true)
  runPart2(): number {
    return 0;
  }

  getAllObject(lines: Array<string>): Array<string> {
    let objects = [];

    lines.forEach((element) => {
      let obj = element.split(')');

      if (!objects.includes(obj[0])) objects.push(obj[0]);
      if (!objects.includes(obj[1])) objects.push(obj[1]);
    });

    return objects;
  }

  counter(lines: Array<string>, start: string, len: number = 0): number {
    // get nexts element
    let nexts = lines.filter((n) => n.startsWith(start + ')'));
    // console.log('--', nexts);

    if (nexts.length === 0) return 0;

    nexts.forEach((next) => {
      let planet = next.split(')')[1];
      let sum = this.counter(lines, planet, len + 1);

      // console.log(start, planet, sum);

      len += sum;
    });

    return len;
  }
}

let day = new Day();
day.runPart1();
day.runPart2();
