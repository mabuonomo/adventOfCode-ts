import { InitAbstract, Direction, Geo } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';
import deepEqual from 'deep-equal';
import { Md5 } from 'md5-typescript';
import { copyFile } from 'fs';
import { object } from 'prop-types';
import { IntCode } from '../intcode';

type Line = { p1: Geo; p2: Geo; md5: string };

export class Day extends InitAbstract {
  runNewPart1(input: string[]) {
    throw new Error('Method not implemented.');
  }
  runNewPart2(input: string[]) {
    throw new Error('Method not implemented.');
  }

  lines: Array<string>;
  reg: Array<number> = [];

  constructor() {
    super();

    this.lines = this.getLines('day7');

    this.lines[0].split(',').forEach((element) => {
      this.reg.push(parseInt(element.trim()));
    });
  }

  @performanceLog(true)
  runPart1(): number {
    let nApl = 5;

    let input = 0;

    let phases = [3, 1, 2, 4, 0];

    let output = -Infinity;

    this.permutation(phases).forEach((phase) => {
      input = 0;

      // init all amplificators
      for (let i = 0; i < nApl; i++) {
        let istr = Object.assign([], this.reg);
        let c = new IntCode(istr, phase[i], input);
        input = c.run();
      }

      if (output < input) {
        output = input;
      }
    });

    return output;
  }

  @performanceLog(true)
  runPart2(): number {
    return 0;
  }
}

let day = new Day();
day.runPart1();
day.runPart2();
