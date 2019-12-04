import { InitAbstract, Direction, Geo } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';
import deepEqual from 'deep-equal';

type Line = { p1: Geo; p2: Geo };

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

    // console.log(this.commands);
  }

  @performanceLog(true)
  runPart1(): any {
    // let mat = this.addPaths(this.paths, this.matrix);
    // return mat;
  }

  @performanceLog(true)
  runPart2(): any {}

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
  buildPaths(commands: Array<Array<Direction>>): Array<Line> {
    let paths: Array<Line> = [];
    commands.forEach((command) => {
      let last = { x: 0, y: 0 };
      for (let i = 0; i < command.length; i++) {
        let nextPoint = this.nextPoint(last, command[i]);
        paths.push({ p1: last, p2: nextPoint });

        last = nextPoint;
      }
    });

    return paths;
  }

  /**
   *
   * @param start
   * @param dir
   */
  nextPoint(start: Geo, dir: Direction): Geo {
    switch (dir.direction) {
      case 'R':
        return { x: start.x + dir.value, y: start.y };
      case 'D':
        return { x: start.x, y: start.y - dir.value };
      case 'L':
        return { x: start.x - dir.value, y: start.y };
      case 'U':
        return { x: start.x, y: start.y + dir.value };
    }

    throw new Error('Not direction ' + dir.direction);
  }

  findPointsIntersect(paths: Array<Line>): Array<Geo> {
    let points = [];
    for (let i = 0; i < paths.length; i++) {
      for (let j = 0; j < paths.length; j++) {
        if (i == j) {
          continue;
        }

        let point = this.lineIntersects(paths[i].p1, paths[i].p2, paths[j].p1, paths[j].p2);
        if (
          point !== undefined &&
          !this.samePoint(paths[i], paths[j], point) &&
          !points.find((n) => deepEqual(n, point))
        ) {
          points.push(point);
        }
      }
    }

    return points;
  }

  samePoint(path1: Line, path2: Line, newPoint: Geo) {
    return (
      deepEqual(newPoint, path1.p1) ||
      deepEqual(newPoint, path1.p2) ||
      deepEqual(newPoint, path2.p1) ||
      deepEqual(newPoint, path2.p2)
    );
  }

  lineIntersects(from1: Geo, to1: Geo, from2: Geo, to2: Geo): Geo {
    const dX: number = to1.x - from1.x;
    const dY: number = to1.y - from1.y;

    const determinant: number = dX * (to2.y - from2.y) - (to2.x - from2.x) * dY;
    if (determinant === 0) return undefined; // parallel lines

    const lambda: number =
      ((to2.y - from2.y) * (to2.x - from1.x) + (from2.x - to2.x) * (to2.y - from1.y)) / determinant;
    const gamma: number = ((from1.y - to1.y) * (to2.x - from1.x) + dX * (to2.y - from1.y)) / determinant;

    // check if there is an intersection
    if (!(0 <= lambda && lambda <= 1) || !(0 <= gamma && gamma <= 1)) return undefined;

    return {
      x: from1.x + lambda * dX,
      y: from1.y + lambda * dY,
    };
  }

  // /**
  //  * function intersects(a,b,c,d, p,q,r,s)
  //  * @param line1
  //  * @param line2
  //  */
  // lineIntersects(line1: Line, line2: Line) {
  //   var det, gamma, lambda;
  //   det = (line1.p2.x - line1.p1.x) * (line2.p2.y - line2.p1.y) - (line2.p2.x - line2.p1.x) * (line1.p2.y - line1.p1.y);
  //   if (det === 0) {
  //     return false;
  //   } else {
  //     lambda =
  //       ((line2.p2.y - line2.p1.y) * (line2.p2.x - line1.p1.x) +
  //         (line2.p1.x - line2.p2.x) * (line2.p2.y - line1.p1.y)) /
  //       det;
  //     gamma =
  //       ((line1.p1.y - line1.p2.y) * (line2.p2.x - line1.p1.x) +
  //         (line1.p2.x - line1.p1.x) * (line2.p2.y - line1.p1.y)) /
  //       det;

  //     return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
  //   }
  // }
}

let day = new Day();
day.runPart1();
day.runPart2();
