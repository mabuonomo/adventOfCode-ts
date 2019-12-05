import { InitAbstract, Direction, Geo } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';
import deepEqual from 'deep-equal';
import { Md5 } from 'md5-typescript';
import { copyFile } from 'fs';

type Line = { p1: Geo; p2: Geo; md5: string };

export class Day extends InitAbstract {
  lines: Array<string>;
  startPoint: Geo = { x: 0, y: 0 };
  matrix: Array<Array<number>> = [];

  reg: Array<number> = [];
  maxH = 0;
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
  runPart1(): number {
    let paths = this.buildPaths(this.commands);
    let points = this.findPointsIntersect(paths);
    let min = Infinity;

    // console.log(paths);
    points.forEach((point) => {
      let distance = this.manhattanDistance2D({ x: 0, y: 0 }, point);
      // console.log(distance, point);
      if (min > distance) {
        min = distance;
      }
    });

    return min;
  }

  @performanceLog(true)
  runPart2(): number {
    let paths = this.buildPaths(this.commands);
    let points = this.findMinPathIntersect(paths);

    return 0;
  }

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
    let md5 = 0;
    commands.forEach((command) => {
      let last = { x: 0, y: 0 };
      for (let i = 0; i < command.length; i++) {
        let nextPoint = this.nextPoint(last, command[i]);
        paths.push({ p1: last, p2: nextPoint, md5: Md5.init(md5.toString()) });

        last = nextPoint;
      }

      md5++;
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

  /**
   *
   * @param paths
   */
  findPointsIntersect(paths: Array<Line>): Array<Geo> {
    let points = [];
    for (let i = 0; i < paths.length; i++) {
      let find = false;
      for (let j = 0; j < paths.length; j++) {
        if (i == j || paths[i].md5 == paths[j].md5) {
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

  /**
   *
   * @param paths
   */
  findMinPathIntersect(paths: Array<Line>): Array<Geo> {
    // console.log(paths)
    let points = [];
    let counter = []; //: Array<Array<{ md5: string, counter: number }>> = [];; //: Array < { md5: string, value: number, last: Geo } > =[]

    let md5Finish = [];
    for (let i = 0; i < paths.length; i++) {
      let pointIntersect = undefined;
      let minD = Infinity;

      for (let j = paths.length - 1; j > 0; j--) {
        if (paths[i].md5 == paths[j].md5) {
          continue;
        }

        pointIntersect = this.lineIntersects(paths[i].p1, paths[i].p2, paths[j].p1, paths[j].p2);

        if (deepEqual(pointIntersect, { x: 0, y: 0 })) {
          pointIntersect = undefined;
        }

        if (pointIntersect !== undefined) {
          if (minD > this.manhattanDistance2D(paths[i].p1, pointIntersect)) {
            // console.log(paths[i].p2)
            minD = this.manhattanDistance2D(paths[i].p1, pointIntersect);
            // console.log('MinD',minD, pointIntersect)
            break;
          }
        }
      }

      if (counter[paths[i].md5] == undefined) {
        counter[paths[i].md5] = 0;
      }

      if (!md5Finish.includes(paths[i].md5)) {
        if (pointIntersect === undefined) {
          let dist = this.manhattanDistance2D(paths[i].p1, paths[i].p2);
          counter[paths[i].md5] += dist;
          console.log(dist, paths[i].md5, 'full');
        } else {
          counter[paths[i].md5] += minD;
          md5Finish.push(paths[i].md5);
          console.log(minD, 'Inter', pointIntersect, 'P1', paths[i].p1, 'MD5', paths[i].md5, 'less');
          // continue;
        }
      }
    }

    console.log('Final', counter);

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
}

let day = new Day();
day.runPart1();
day.runPart2();
