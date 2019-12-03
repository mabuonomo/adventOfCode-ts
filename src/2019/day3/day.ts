import { InitAbstract, Direction, Geo } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';
import { valueToNode } from '@babel/types';

export class Day extends InitAbstract {
  lines: Array<string>;

  reg: Array<number> = [];
  maxH = 0;
  // points: Array<Geo> = [];
  command: Array<Direction> = [];

  constructor() {
    super();

    this.lines = this.getLines('day3', false);

    this.command = this.buildDirection(this.lines[0]);
  }

  @performanceLog(true)
  runPart1(): any {}

  @performanceLog(true)
  runPart2(): any {}

  buildPoint(commands: Array<Direction>): Array<Geo> {
    let start: Geo = { x: 0, y: 0 };

    let points: Array<Geo> = [];
    points.push(start);

    let last = start;

    commands.forEach((element) => {
      switch (element.direction) {
        case 'R':
          last = { x: last.x + element.value, y: last.y };
          break;
        case 'L':
          last = { x: last.x - element.value, y: last.y };
          break;
        case 'D':
          last = { x: last.x, y: last.y - element.value };
          break;
        case 'U':
          last = { x: last.x, y: last.y + element.value };
          break;
      }
      points.push(last);
    });

    return points;
  }

  buildDirection(line: string): Array<Direction> {
    let command: Array<Direction> = [];
    line.split(',').forEach((element) => {
      let dir = element.charAt(0);
      // console.log(element)
      let value = parseInt(element.substring(1, element.length).trim());

      command.push({ direction: dir, value: value });

      if (this.maxH < value) {
        this.maxH = value;
      }
    });
    return command;
  }
}

let day = new Day();
day.runPart1();
day.runPart2();
