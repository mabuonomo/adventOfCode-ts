import { InitAbstract } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';
import { count } from 'console';

class Day extends InitAbstract {
  lines: Array<string>;
  constructor() {
    super();

    this.lines = this.getLines('day10', false);
  }

  // PARENT vibrant cyan bags contain 4 dim tomato bags, LEAFS 1 dull green bag, 5 light silver bags, 2 striped gold bags.
  @performanceLog(true)
  runPart1() {
    let arr = [0, ...this.lines.map((e) => parseInt(e)).sort((n1, n2) => n1 - n2)];

    let counter1 = 0;
    let counter2 = 0;
    let counter3 = 1;

    let max = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i + 1] === undefined) {
        max = arr[i] + 3;
        break;
      }

      switch (arr[i + 1] - arr[i]) {
        case 1:
          counter1++;
          break;

        case 2:
          counter2++;
          break;

        case 3:
          counter3++;
          break;
      }
    }

    return { res: counter1 * counter3, max: max };
  }

  @performanceLog(true)
  runPart2() {
    let max = this.runPart1().max;
    let arr = [0, ...this.lines.map((e) => parseInt(e)).sort((n1, n2) => n1 - n2), max];

    return this.validPaths(arr);
  }

  validPaths(arr: number[], paths = {}) {
    const key = JSON.stringify(arr);
    if (key in paths) {
      return paths[key];
    }

    return (paths[key] = this.walkPaths(arr, paths));
  }

  private walkPaths(arr: number[], paths: {}, result: number = 1) {
    for (let i = 1; i < arr.length - 1; i++) {
      result += arr[i + 1] - arr[i - 1] <= 3 ? this.validPaths([arr[i - 1]].concat(arr.slice(i + 1)), paths) : 0;
    }
    return result;
  }
}

let day = new Day();
day.runPart1();
day.runPart2();
