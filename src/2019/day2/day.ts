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
    return this.calculate(12, 2);
  }

  @performanceLog(true)
  runPart2(): number {
    return 0;
  }

  calculate(noun: number, verb: number): number {
    this.reg[1] = noun; //12;
    this.reg[2] = verb; //2;

    for (let i = 0; i < this.reg.length; i += 4) {
      switch (this.reg[i]) {
        case 1:
          let add1 = this.reg[this.reg[i + 1]];
          let add2 = this.reg[this.reg[i + 2]];
          this.reg[this.reg[i + 3]] = add1 + add2;
          break;
        case 2:
          let mul1 = this.reg[this.reg[i + 1]];
          let mul2 = this.reg[this.reg[i + 2]];
          this.reg[this.reg[i + 3]] = mul1 * mul2;
          break;
        case 99:
          return this.reg[0];
        default:
          console.log('Attention code not recognized');
      }
    }

    return this.reg[0];
  }
}

let day = new Day();
day.runPart1();
day.runPart2();
