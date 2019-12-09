import { number } from 'prop-types';

export class IntCode {
  registry: Array<number>;
  input: number;
  phase?: number;
  output: number;
  lastIndex: number;
  started: boolean;
  base: number;

  constructor(registry: Array<number>, input: number, phase?: number) {
    this.registry = registry;
    this.input = input;

    if (phase != undefined) this.phase = phase;

    this.base = 0;
  }

  getRegistry() {
    return this.registry;
  }

  run(): number {
    for (let i = 0; i < this.registry.length; i++) {
      let result = this.execute(i);

      if (result.res == true) return this.output;

      if (result.jump === undefined) i += result.incr;
      else i = result.jump - 1;
    }

    return undefined;
  }

  runLoop(): { final: boolean; counter: number } {
    if (this.lastIndex == undefined) {
      this.lastIndex = 0;
    }

    // console.log(this.lastIndex)

    for (let i = this.lastIndex; i < this.registry.length; i++) {
      let result = this.execute(i);

      // halt
      if (result.res == true) return { final: true, counter: this.output };

      // output and continue
      if (result.pass == true) {
        this.lastIndex = i + result.incr;
        return { final: false, counter: this.output };
      }

      // jump
      if (result.jump === undefined) i += result.incr;
      else i = result.jump - 1;
    }

    // console.log('*')
    this.lastIndex = 0;
    return this.runLoop();
  }

  setStarted() {
    this.started = true;
  }

  setInput(val: number) {
    if (this.started == true) {
      this.input = val;
      this.phase = undefined;
    }
  }

  getInput() {
    let res = this.input;
    if (this.phase != undefined) {
      this.input = this.phase;
    }

    this.setStarted();

    return res;
  }

  getParam(i: number, mode: Mode, incr: number) {
    switch (mode) {
      case Mode.POSITION: {
        // 0
        let address = this.registry[i + incr];
        if (address < 0) address = 0;

        return this.registry[address] || 0;
      }
      case Mode.IMMEDIATE: {
        // 1
        let address = i + incr;
        if (address < 0) address = 0;

        return this.registry[i + incr] || 0;
      }
      case Mode.RELATIVE: {
        // 2
        let address = this.base + this.registry[i + incr];
        if (address < 0) address = 0;
        return this.registry[address] || 0;
      }
    }
  }

  writeRegistry(i: number, mode: Mode, incr: number, value: number) {
    let address = (mode == Mode.RELATIVE ? this.base : 0) + this.registry[i + incr];
    this.registry[address] = value;
  }

  execute(i: number): Result {
    let op = this.buildOP(i);

    if (op == undefined) {
      return { res: false, incr: 0 };
    }

    let param1: number = this.getParam(i, op.first, 1);
    let param2: number = this.getParam(i, op.second, 2);

    switch (op.code) {
      case 1: // add
        this.writeRegistry(i, op.third, 3, param1 + param2);
        return { res: false, incr: 3 };
      case 2: // mul
        this.writeRegistry(i, op.third, 3, param1 * param2);
        return { res: false, incr: 3 };
      case 3: // input
        this.writeRegistry(i, op.first, 1, this.getInput());
        return { res: false, incr: 1 };
      case 4: // output
        this.output = param1;
        return { res: false, incr: 1, pass: true };
      case 5: // jump if true
        if (param1 !== 0) {
          return { res: false, incr: 0, jump: param2 };
        }
        return { res: false, incr: 2 };
      case 6: // jump if false
        if (param1 === 0) {
          return { res: false, incr: 0, jump: param2 };
        }
        return { res: false, incr: 2 };
      case 7: // less than
        if (param1 < param2) {
          this.writeRegistry(i, op.third, 3, 1);
        } else {
          this.writeRegistry(i, op.third, 3, 0);
        }
        return { res: false, incr: 3 };
      case 8: // equal
        if (param1 == param2) {
          this.writeRegistry(i, op.third, 3, 1);
        } else {
          this.writeRegistry(i, op.third, 3, 0);
        }
        return { res: false, incr: 3 };
      case 9: // base
        this.base += param1;
        return { res: false, incr: 1 };
      case 99: // halt
        return { res: true, incr: 0 };
    }

    return { res: false, incr: 0 };
  }

  buildOP(i: number): IntOP {
    let op = this.registry[i].toString();

    if (![1, 2, 3, 4, 99, 5, 6, 7, 8, 9].includes(parseInt(op.substr(-2)))) return undefined;

    if (op.length === 4 && parseInt(op.charAt(0)) < 3 && parseInt(op.charAt(1)) < 3) {
      op = '0' + op;
    }

    if (op.length === 3 && parseInt(op.charAt(0)) < 3) {
      op = '00' + op;
    }

    if (op.length === 2) {
      op = '000' + op;
    }

    if (op.length === 1) {
      op = '0000' + op;
    }

    if (op.length !== 5) {
      return undefined;
    }

    return {
      third: this.getMode(parseInt(op.charAt(0))),
      second: this.getMode(parseInt(op.charAt(1))),
      first: this.getMode(parseInt(op.charAt(2))),
      code: parseInt(op.substring(3)),
    };
  }

  getMode(n: number) {
    if (n == 0) return Mode.POSITION;

    if (n == 2) return Mode.RELATIVE;

    return Mode.IMMEDIATE;
  }
}

type IntOP = { third: Mode; second: Mode; first: Mode; code: number };

enum Mode {
  POSITION, // by address
  IMMEDIATE, // by value
  RELATIVE, //
}

type Result = { res: boolean; incr: number; jump?: number; pass?: boolean };
