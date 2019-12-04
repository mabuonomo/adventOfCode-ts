import { InitAbstract, Direction, Geo } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';

type Line = { p1: Geo, p2: Geo }

export class Day extends InitAbstract {
  lines: Array<string>;
  startPoint: Geo = { x: 0, y: 0 };
  matrix: Array<Array<number>> = [];

  reg: Array<number> = [];
  maxH = 0;
  // points: Array<Geo> = [];
  commands: Array<Array<Direction>> = [];

  constructor() {
    super();

    this.lines = this.getLines('day3', true);

    this.lines.forEach((element) => {
      this.commands.push(this.buildDirection(element));
    });

    console.log(this.commands)

  }

  @performanceLog(true)
  runPart1(): any {
    // let mat = this.addPaths(this.paths, this.matrix);
    // return mat;
  }

  @performanceLog(true)
  runPart2(): any { }

  /**
   * Return the base input dir, value (R8)
   * @param line 
   */
  buildDirection(line: string): Array<Direction> {
    let command: Array<Direction> = [];
    line.split(',').forEach((element) => {
      let dir = element.charAt(0);
      let value = parseInt(element.substring(1, element.length).trim());

      command.push({ direction: dir, value: value });
    });
    return command;
  }

  /**
   * Build the paths (single line)
   * @param commands 
   */
  buildPaths(commands: Array<Direction>): Array<Line> {
    let paths: Array<Line> = []
    for (let i = 0; i < commands.length; i++) {
      // paths.push({ p1: commands[i].})
    }
  }

  nextPoint(start: Geo, dir: Direction): Geo {
    switch (dir.direction) {
      case 'R':
        return { x: start.x + dir.value, y: start.y }
      case 'D':
        return { x: start.x, y: start.y - dir.value }
      case 'L':
        return { x: start.x - dir.value, y: start.y }
      case 'U':
        return { x: start.x + dir.value, y: start.y + dir.value }
    }
    return undefined;
  }
}

let day = new Day();
day.runPart1();
day.runPart2();
