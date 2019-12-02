import { InitAbstract } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';

class Day extends InitAbstract {
  lines: Array<string>;

  reg: Array<number> = [];

  constructor() {
    super();

    this.lines = this.getLines('day2', false);

    this.lines[0].split(',').forEach((element) => {
      this.reg.push(parseInt(element.trim()));
    });
  }

  @performanceLog(true)
  runPart1(): number {
    return this.calculate(12, 2, Object.assign([], this.reg));
  }

  @performanceLog(true)
  runPart2(): number {
    let goal = 19690720;
    for (let i = 0; i < 99; i++) {
      for (let j = 0; j < 99; j++) {
        let res = this.calculate(i, j, Object.assign([], this.reg));

        if (res > goal) {
          break;
        }

        if (res == goal) {
          return 100 * i * j;
        }
      }
    }
    return 0;
  }

  calculate(noun: number, verb: number, registry: Array<number>): number {
    registry[1] = noun; //12;
    registry[2] = verb; //2;

    for (let i = 0; i < registry.length; i += 4) {
      switch (registry[i]) {
        case 1:
          let add1 = registry[registry[i + 1]];
          let add2 = registry[registry[i + 2]];
          registry[registry[i + 3]] = add1 + add2;
          break;
        case 2:
          let mul1 = registry[registry[i + 1]];
          let mul2 = registry[registry[i + 2]];
          registry[registry[i + 3]] = mul1 * mul2;
          break;
        case 99:
          return registry[0];
        default:
          console.log('Attention code not recognized');
      }
    }

    return registry[0];
  }
}

let day = new Day();
day.runPart1();
day.runPart2();
