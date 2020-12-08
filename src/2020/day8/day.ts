import { InitAbstract } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';
import { parse } from 'path';
import { strict } from 'assert';
import { after, before, ceil, floor } from 'lodash';
import { empty } from 'fp-ts/lib/ReadonlyRecord';
import { cloneDeep } from 'lodash';

type OPERATIONS = { code: string; counter: number };

class Day extends InitAbstract {
  lines: Array<string>;
  constructor() {
    super();

    this.lines = this.getLines('day8', false);

    this.lines.forEach((line) => {
      let split = line.split(' ');

      this.ops.push({
        code: split[0],
        counter: parseInt(split[1]),
      });
    });
  }

  ops: Array<OPERATIONS> = [];

  // PARENT vibrant cyan bags contain 4 dim tomato bags, LEAFS 1 dull green bag, 5 light silver bags, 2 striped gold bags.
  @performanceLog(true)
  runPart1() {
    let counter = this.runMachine(0, this.ops);
    return counter;
  }

  indexChanges = [];

  @performanceLog(true)
  runPart2() {
    let counter = 0;

    let j = 0;
    while (true) {
      this.indexUsed = [];
      let arr = this.cloneOpsWithChanged();
      let res = this.runMachine2(0, arr);

      if (res.max) {
        counter = res.counter;
        break;
      }

      if (res.index < arr.length) {
        j++;
        continue;
      }
    }

    return counter;
  }

  // nop +0
  // acc +1
  // jmp +4
  // acc +3
  // jmp -3
  // acc -99
  // acc +1
  // jmp -4
  // acc +6
  //
  //   nop +0  | 1
  // acc +1  | 2
  // jmp +4  | 3
  // acc +3  |
  // jmp -3  |
  // acc -99 |
  // acc +1  | 4
  // nop -4  | 5 <--
  // acc +6  | 6
  cloneOpsWithChanged() {
    let opsClone = cloneDeep(this.ops);

    for (let i = 0; i < opsClone.length; i++) {
      if (!this.indexChanges.includes(i)) {
        if (opsClone[i].code === 'nop') {
          opsClone[i].code = 'jmp';
          this.indexChanges.push(i);
          break;
        }

        if (opsClone[i].code === 'jmp') {
          opsClone[i].code = 'nop';
          this.indexChanges.push(i);
          break;
        }
      }
    }

    return opsClone;
  }

  indexUsed = [];
  runMachine(index: number, ops: Array<OPERATIONS>) {
    let counter = 0;
    let op = ops[index];

    if (this.indexUsed.includes(index)) {
      return counter;
    }

    this.indexUsed.push(index);

    switch (op.code) {
      case 'nop':
        index++;
        break;
      case 'acc':
        counter += op.counter;
        index++;
        break;
      case 'jmp':
        index += op.counter;
        break;
    }

    return (counter += this.runMachine(index, ops));
  }

  // indexUsed = [];
  runMachine2(index: number, ops: Array<OPERATIONS>): { index: number; counter: number; max: boolean } {
    let counter = 0;
    let op = ops[index];

    if (index >= ops.length) {
      return { index, counter, max: true };
    }

    if (this.indexUsed.includes(index)) {
      return { index, counter, max: false };
    }

    this.indexUsed.push(index);

    switch (op.code) {
      case 'nop':
        index++;
        break;
      case 'acc':
        counter += op.counter;
        index++;
        break;
      case 'jmp':
        index += op.counter;
        break;
    }

    let res = this.runMachine2(index, ops);
    counter = counter + res.counter;
    return { index, counter, max: res.max };
  }
}

let day = new Day();
day.runPart1();
day.runPart2();
