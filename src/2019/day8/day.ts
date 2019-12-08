import { InitAbstract, Direction, Geo } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';
import deepEqual from 'deep-equal';
import { Md5 } from 'md5-typescript';
import { copyFile } from 'fs';
import { object } from 'prop-types';

type Line = { p1: Geo; p2: Geo; md5: string };

export class Day extends InitAbstract {
  runNewPart1(input: string[]) {
    throw new Error('Method not implemented.');
  }
  runNewPart2(input: string[]) {
    throw new Error('Method not implemented.');
  }

  lines: Array<string>;

  constructor() {
    super();

    this.lines = this.getLines('day8');
  }

  @performanceLog(true)
  runPart1(): number {
    let h = 6;
    let w = 25;
    let size = w * h; // 150
    let line = this.lines[0];

    let nLayers = line.length / size;

    // console.log(line.length, nLayers, size)

    let minZero = Infinity;
    let minLayer = Infinity;
    let ones = Infinity;
    let dues = Infinity;
    for (let i = 0; i < nLayers; i++) {
      let image = line.substr(i * size, size);
      // console.log(image.length, i * size, size);

      let zeros = 0;
      let one = 0,
        due = 0;
      for (let j = 0; j < image.length; j++) {
        if (parseInt(image[j]) == 0) {
          zeros++;
        }

        if (parseInt(image[j]) == 1) {
          one++;
        }

        if (parseInt(image[j]) == 2) {
          due++;
        }
      }

      if (minZero > zeros) {
        minZero = zeros;
        minLayer = i;
        ones = one;
        dues = due;
      }
    }

    return ones * dues;
  }

  @performanceLog(true)
  runPart2(): number {
    let h = 6;
    let w = 25;
    let size = w * h; // 150
    let line = this.lines[0];

    let nLayers = line.length / size;

    let res = [];

    // ogni pixel
    for (let i = 0; i < size; i++) {
      // 0 black, 1 white, 2 trasparency
      let pixel = 2;

      // check in all layers
      for (let j = 0; j < nLayers; j++) {
        let image = line.substr(j * size, size);

        // console.log(image)

        if (pixel == 2) {
          pixel = parseInt(image[i]);
        }

        // if (pixel == 1 && parseInt(image[j]) == 0) {
        //   pixel = parseInt(image[j]);
        // }

        if (pixel != 2) {
          break;
        }
      }

      res.push(pixel);
    }

    // console.log(res)
    let counter = 0;
    for (let i = 0; i < size; i++) {
      process.stdout.write('' + res[i]);
      // console.log(res[i])

      counter++;

      if (counter == w) {
        counter = 0;
        console.log(' ', w, i);
      }
    }
    // }

    return 0;
  }

  isMultiple(x, y) {
    return Math.round(x / y) / (1 / y) === x;
  }
}

let day = new Day();
day.runPart1();
day.runPart2();
