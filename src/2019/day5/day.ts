import { InitAbstract, Direction, Geo } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';
import deepEqual from 'deep-equal';
import { Md5 } from 'md5-typescript';
import { copyFile } from 'fs';

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

    this.lines = this.getLines('day5');
  }

  @performanceLog(true)
  runPart1(): number {
    return 0;
  }

  @performanceLog(true)
  runPart2(): number {
    return 0;
  }

  counter(lines: Array<string>, start: string, len: number): number {
    // get nexts element
    let nexts = lines.filter((n) => n.startsWith(start + ')'));
    // console.log('--', nexts);

    nexts.forEach((next) => {
      let planet = next.split(')')[1];
      len += this.counter(lines, planet, ++len);
    });

    // console.log('Res', start, len)

    return len;
  }
}

let day = new Day();
day.runPart1();
day.runPart2();
