import { InitAbstract, Direction, Geo } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';

export class Day extends InitAbstract {
  lines: Array<string>;
  startPoint: Geo = { x: 0, y: 0 };
  matrix: Array<Array<number>> = [];

  reg: Array<number> = [];
  maxH = 0;
  // points: Array<Geo> = [];
  paths: Array<Array<Direction>> = [];

  constructor() {
    super();

    this.lines = this.getLines('day3', true);

    this.lines.forEach((element) => {
      this.paths.push(this.buildDirection(element));
    });

    console.log(this.paths)

    this.matrix = this.initMatrix(this.maxH);
  }

  @performanceLog(true)
  runPart1(): any {
    let mat = this.addPaths(this.paths, this.matrix);
    return mat;
  }

  @performanceLog(true)
  runPart2(): any { }

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

  initMatrix(size: number) {
    let matrix: Array<Array<number>> = [];

    for (let i = -size; i < size + 1; i++) {
      for (let j = -size; j < size + 1; j++) {
        if (matrix[i] == undefined) {
          matrix[i] = [];
        }

        if (matrix[i][j] == undefined) {
          matrix[i][j] = 0;
        }

      }
    }

    console.log(matrix)
    return matrix;
  }

  addPaths(paths: Array<Array<Direction>>, matrix: Array<Array<number>>) {
    let points: Array<Geo> = [];

    paths.forEach((path) => {
      let last = { x: 0, y: 0 };
      path.forEach((element) => {
        console.log("Applico")
        console.log(element);
        switch (element.direction) {
          case 'R':
            for (let i = last.x; i < element.value; i++) {
              matrix[i][last.y] += 1;

              if (matrix[i][last.y] > 1) {
                points.push({ x: i, y: last.y });
              }
            }
            last = { x: last.x + element.value, y: last.y };
            break;
          case 'L':
            for (let i = last.x; i < element.value; i++) {
              matrix[last.x - i][last.y] += 1;

              if (matrix[last.x - i][last.y] > 1) {
                points.push({ x: last.x - i, y: last.y });
              }
            }
            last = { x: last.x - element.value, y: last.y };
            break;
          case 'D':
            for (let i = last.y; i < element.value; i++) {
              matrix[last.x][last.y - i] += 1;

              if (matrix[last.x][last.y - i] > 1) {
                points.push({ x: last.x, y: last.y - i });
              }
            }
            last = { x: last.x, y: last.y - element.value };
            break;
          case 'U':
            for (let i = last.y; i < element.value; i++) {
              matrix[last.x][last.y + i] += 1;

              if (matrix[last.x][last.y + i] > 1) {
                points.push({ x: last.x, y: last.y + i });
              }
            }
            last = { x: last.x, y: last.y + element.value };
            break;
        }

        console.log(matrix)
      });

      console.log(points)
      return points;
    });
  }
}

let day = new Day();
day.runPart1();
day.runPart2();
