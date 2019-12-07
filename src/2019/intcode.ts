export class IntCode {
  registry: Array<number>;
  input: number;

  constructor(registry: Array<number>, input: number) {
    this.registry = registry;
    this.input = input;
  }

  getRegistry() {
    return this.registry;
  }

  run(): number {
    for (let i = 0; i < this.registry.length; i++) {
      let res = this.execute(i);

      if (res.output !== undefined) return res.output;

      i += res.incr;
    }

    return undefined;
  }

  execute(i: number): Result {
    let op = this.buildOP(i);

    if (op == undefined) {
      return { res: false, incr: 0, output: undefined };
    }

    let param1 = 0;
    let param2 = 0;

    if (op.first == Mode.POSITION) {
      param1 = this.registry[this.registry[i + 1]];
    } else {
      param1 = this.registry[i + 1];
    }

    if (op.second == Mode.POSITION) {
      param2 = this.registry[this.registry[i + 2]];
    } else {
      param2 = this.registry[i + 2];
    }

    // console.log(param1, param2)

    switch (op.code) {
      case 1:
        let add1 = param1;
        let add2 = param2;
        if (op.third == Mode.POSITION) {
          this.registry[this.registry[i + 3]] = add1 + add2;
        } else {
          this.registry[i + 3] = add1 + add2;
        }
        return { res: false, incr: 4, output: undefined };
      case 2:
        let mul1 = param1;
        let mul2 = param2;
        if (op.third == Mode.POSITION) {
          this.registry[this.registry[i + 3]] = mul1 * mul2;
        } else {
          this.registry[i + 3] = mul1 * mul2;
        }
        return { res: false, incr: 4, output: undefined };

      case 3:
        if (op.first == Mode.POSITION) {
          this.registry[this.registry[i + 1]] = this.input;
        } else {
          this.registry[i + 1] = this.input;
        }
        return { res: false, incr: 1, output: undefined };
      case 4:
        let res = 0;
        if (op.first == Mode.POSITION) {
          res = this.registry[this.registry[i + 1]];
        } else {
          res = this.registry[i + 1];
        }
        return { res: true, incr: 1, output: res };
      case 99:
        // return this.registry[0];
        //     return true;
        return { res: true, incr: 0, output: this.registry[0] };
    }

    return { res: false, incr: 0, output: undefined };
  }

  buildOP(i: number): IntOP {
    let op = this.registry[i].toString();

    if (op.length < 3) {
      return undefined;
    }

    if (op.length === 4) {
      op = '0' + op;
    }

    if (op.length === 3) {
      op = '00' + op;
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

    return Mode.IMMEDIATE;
  }
}

type IntOP = { third: Mode; second: Mode; first: Mode; code: number };

enum Mode {
  POSITION, // by address
  IMMEDIATE, // by value
}

type Result = { res: boolean; incr: number; output: number };
