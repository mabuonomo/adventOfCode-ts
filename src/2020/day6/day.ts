import { InitAbstract } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';
import { parse } from 'path';
import { strict } from 'assert';
import { after, before, ceil, floor } from 'lodash';
import { empty } from 'fp-ts/lib/ReadonlyRecord';

type row = { people: number; answser: string };
class Day1 extends InitAbstract {
  lines: Array<string>;
  constructor() {
    super();

    this.lines = this.getLines('day6', false);
  }

  @performanceLog(true)
  runPart1() {
    let groups = [];

    let i = 0;
    for (let line of this.lines) {
      // chars on line
      for (let j = 0; j < line.length; j++) {
        if (groups[i] === undefined) {
          groups[i] = [];
        }

        if (!groups[i].includes(line[j]) && line[j] !== '') {
          groups[i].push(line[j]);
        }
      }

      if (line.trim() === '') {
        i++;
      }
    }

    let res = 0;
    groups.forEach((elm) => {
      res += elm.length;
    });

    return res;
  }

  @performanceLog(true)
  runPart2() {
    let groups: Array<row> = [];

    let i = 0;
    for (let line of this.lines) {
      if (line.trim() === '') {
        i++;
        continue;
      }

      if (groups[i] === undefined) {
        groups[i] = { people: 0, answser: '' };
      }

      groups[i] = { people: groups[i].people + 1, answser: groups[i].answser + line };
    }

    let counter = 0;
    for (let row of groups) {
      // Count number of occurrences for each char in a string
      var result = [...row.answser].reduce((a, e) => {
        a[e] = a[e] ? a[e] + 1 : 1;
        if (a[e] === row.people) {
          counter++;
        }
        return a;
      }, {});
    }

    return counter;
  }
}

let day = new Day1();
day.runPart1();
day.runPart2();
