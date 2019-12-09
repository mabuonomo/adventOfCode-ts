import { InitAbstract, Direction, Geo } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';
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

    this.lines = this.getLines('day9');
    // console.log(this.lines[0])

    this.lines[0].split(',').forEach((element) => {
      this.reg.push(parseInt(element.trim()));
    });
  }

  @performanceLog(true)
  runPart1(): number {
    let c = new IntCode(Object.assign([], this.reg), 1);
    return c.run();
  }

  @performanceLog(true)
  runPart2(): number {
    let c = new IntCode(Object.assign([], this.reg), 2);
    return c.run();
  }
}

let day = new Day();
day.runPart1();
day.runPart2();
