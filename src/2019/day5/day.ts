import { InitAbstract } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';
import { IntCode } from '../intcode';

class Day extends InitAbstract {
  lines: Array<string>;

  reg: Array<number> = [];

  constructor() {
    super();

    this.lines = this.getLines('day5');

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
    let c = new IntCode(Object.assign([], this.reg), 5);
    return c.run();
  }
}

let day = new Day();
day.runPart1();
day.runPart2();
