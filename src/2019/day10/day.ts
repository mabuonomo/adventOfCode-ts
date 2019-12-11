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

    this.lines = this.getLines('day10', false);

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

    console.log(this.points);
  }

  @performanceLog(true)
  runPart1(): any {
    let noCollisionMax = -Infinity;
    let geoMax = undefined;

    this.points.forEach((pointFirst) => {
      let noCollision = 0;

      // devo verificare che point2 non ha collisioni con altri punti
      this.points
        .filter((n) => !deepEqual(pointFirst, n))
        .forEach((pointSecond) => {
          let line: Line = { p1: pointFirst, p2: pointSecond };
          let collide = false;

          this.points
            .filter((n) => !deepEqual(pointFirst, n) && !deepEqual(pointSecond, n))
            .forEach((pointCheck) => {
              if (
                this.isPointOnLineV2(pointCheck, line) &&
                this.manhattanDistance2D(pointFirst, pointSecond) < this.manhattanDistance2D(pointCheck, pointFirst)
              ) {
                // console.log(
                //   'collide',
                //   'p1',
                //   pointFirst,
                //   'p2',
                //   pointSecond,
                //   'pc',
                //   pointCheck,
                //   !deepEqual(pointFirst, pointCheck) && !deepEqual(pointSecond, pointCheck),
                //   this.isPointOnLineV2(pointCheck, line),
                //   this.manhattanDistance2D(pointFirst, pointSecond),
                //   this.manhattanDistance2D(pointCheck, pointFirst),
                // );
                collide = true;
              }
            });
          if (!collide) {
            noCollision++;
          }
        });

      // console.log('*', pointFirst, noCollision);

      if (noCollisionMax <= noCollision) {
        noCollisionMax = noCollision;
        geoMax = pointFirst;
        // console.log('**', geoMax, noCollisionMax);
      }
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
