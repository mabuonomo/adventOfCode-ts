import * as fs from 'fs';
import { performanceLog } from 'decorators-utils-ts/dist/src';
const lineByLine = require('n-readlines');

export type Geo = { x: number; y: number; z?: number };
export type Direction = { direction: string; value: number };

export abstract class InitAbstract {
  // @performanceLog(true)
  getLines(day: string, test: boolean = false): Array<string> {
    var data: Array<string> = [];
    let path = process.cwd() + '/src/2019/' + day + '/input.txt';

    if (test) {
      path = process.cwd() + '/src/2019/' + day + '/input_test.txt';
    }

    // if (fs.existsSync(path)) {
    //   console.log('Input exists');
    // } else {
    //   console.log('Input not exists');
    // }

    const liner = new lineByLine(path);

    let line;
    while ((line = liner.next())) {
      data.push(line.toString('ascii'));
    }

    return data;
  }

  abstract runPart1(): any;
  abstract runPart2(): any;

  // abstract runNewPart1(input: Array<string>): any;
  // abstract runNewPart2(input: Array<string>): any;

  public manhattanDistance2D(point1: Geo, point2: Geo): number {
    return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y); // + Math.abs(point1.z - point2.z);
  }

  intersection(from1: Geo, to1: Geo, from2: Geo, to2: Geo): Geo {
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
}
