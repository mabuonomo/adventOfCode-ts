import { InitAbstract } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';
import { parse } from 'path';
import { strict } from 'assert';
import { after, before, ceil, floor } from 'lodash';
import { empty } from 'fp-ts/lib/ReadonlyRecord';
import { cloneDeep } from 'lodash';
import { count } from 'console';

class Day extends InitAbstract {
  lines: Array<string>;
  constructor() {
    super();

    this.lines = this.getLines('day9', false);
  }
  offset = 25;

  // PARENT vibrant cyan bags contain 4 dim tomato bags, LEAFS 1 dull green bag, 5 light silver bags, 2 striped gold bags.
  @performanceLog(true)
  runPart1() {
    let result = -1;

    for (let i = this.offset; i < this.lines.length; i++) {
      let num = parseInt(this.lines[i]);

      let found = false;
      for (let j = i - this.offset; j < i; j++) {
        for (let k = i - this.offset + 1; k < i; k++) {
          let first = parseInt(this.lines[j]);
          let second = parseInt(this.lines[k]);

          if (first + second == num) {
            found = true;
          }
        }
      }

      if (!found) {
        result = num;
        break;
      }
    }

    return result;
  }

  @performanceLog(true)
  runPart2() {
    let numOld = this.runPart1();

    let result = 0;
    for (let i = this.offset; i < this.lines.length; i++) {
      let res = this.sum(i - this.offset, numOld, 0, Infinity, -Infinity);

      if (res != null) {
        result = res.min + res.max;

        break;
      }
    }

    return result;
  }

  sum(
    index: number,
    num: number,
    acc: number,
    min: number,
    max: number,
  ): { index: number; acc: number; min: number; max: number } {
    let thisNum = parseInt(this.lines[index]);

    acc += thisNum;
    let mini = thisNum < min ? thisNum : min;
    let mass = thisNum > max ? thisNum : max;

    if (acc == num) {
      return { index, acc, min: mini, max: mass };
    }

    if (acc > num) {
      return null;
    }

    return this.sum(++index, num, acc, mini, mass);
  }
}

let day = new Day();
day.runPart1();
day.runPart2();
