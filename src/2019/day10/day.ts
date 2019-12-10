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
  points: Array<Geo> = [];

  constructor() {
    super();

    this.lines = this.getLines('day10', true);

    let x = 0;
    this.lines.forEach((line) => {
      for (let y = 0; y < line.length; y++) {
        if (line[y] == '#') {
          let point = { x: x, y: y };
          this.points.push(point);
        }
      }
      x++;
    });
  }

  @performanceLog(true)
  runPart1(): number {
    return 0;
  }

  @performanceLog(true)
  runPart2(): number {
    return 0;
  }
}

let day = new Day();
day.runPart1();
day.runPart2();
