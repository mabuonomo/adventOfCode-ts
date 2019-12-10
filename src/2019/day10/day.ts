import { InitAbstract, Direction, Geo } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';
import { IntCode } from '../intcode';
import deepEqual = require('deep-equal');

type Line = { p1: Geo; p2: Geo; md5?: string };

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

    let y = 0;
    this.lines.forEach((line) => {
      for (let x = 0; x < line.length; x++) {
        if (line[x] == '#') {
          let point = { x: x, y: y };
          this.points.push(point);
        }
      }
      y++;
    });

    // console.log(this.points)
  }

  @performanceLog(true)
  runPart1(): any {
    let noCollisionMax = -Infinity;
    let geoMax = undefined;

    this.points.forEach((pointFirst) => {
      let noCollision = 0;

      this.points.forEach((pointSecond) => {
        if (!deepEqual(pointFirst, pointSecond)) {
          let line: Line = { p1: pointFirst, p2: pointSecond };
          let collide = false;

          this.points.forEach((pointCheck) => {
            if (!deepEqual(pointFirst, pointCheck) && !deepEqual(pointSecond, pointCheck)) {
              // console.log(pointFirst, pointSecond, pointCheck)
              if (this.isPointOnLineV2(pointCheck, line)) {
                collide = true;
              }
            }
          });
          if (!collide) {
            noCollision++;
          }
        }
      });

      if (noCollisionMax < noCollision) {
        noCollisionMax = noCollision;
        geoMax = pointFirst;
        console.log('*', geoMax, noCollisionMax);
      }
      //       // angle in radians
      // var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);

      // // angle in degrees
      // var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

      // if (noCollisionMax < noCollision) {
      //   noCollisionMax = noCollision;
      //   geoMax = pointFirst;
      // }
    });

    return { point: geoMax, n: noCollisionMax };
  }

  @performanceLog(true)
  runPart2(): number {
    return 0;
  }
}

let day = new Day();
day.runPart1();
day.runPart2();
