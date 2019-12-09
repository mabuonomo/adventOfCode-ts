import { Day } from './day';
import { IntCode } from '../intcode';

// test('Part 1 small', () => {
//   let c = new Day();

//   let input = ['COM)B', 'B)C', 'C)D'];

//   expect(c.counter(input, 'COM', 0)).toBe(3);
// });

test('Part 1 full', () => {
  let istrInit = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0];

  let nApl = 5;

  let input = 0;
  let phases = [4, 3, 2, 1, 0];

  for (let i = 0; i < nApl; i++) {
    let istr = Object.assign([], istrInit);
    let c = new IntCode(istr, phases[i], input);
    input = c.run();
    // console.log(input);
  }

  expect(input).toEqual(43210);
});

test('Part 1 full', () => {
  let istrInit = [3, 23, 3, 24, 1002, 24, 10, 24, 1002, 23, -1, 23, 101, 5, 23, 23, 1, 24, 23, 23, 4, 23, 99, 0, 0];

  let nApl = 5;

  let input = 0;
  let phases = [0, 1, 2, 3, 4];

  for (let i = 0; i < nApl; i++) {
    let istr = Object.assign([], istrInit);
    let c = new IntCode(istr, phases[i], input);
    input = c.run();
  }

  expect(input).toEqual(54321);
});

test('Part 1 full', () => {
  let istrInit = [
    3,
    31,
    3,
    32,
    1002,
    32,
    10,
    32,
    1001,
    31,
    -2,
    31,
    1007,
    31,
    0,
    33,
    1002,
    33,
    7,
    33,
    1,
    33,
    31,
    31,
    1,
    32,
    31,
    31,
    4,
    31,
    99,
    0,
    0,
    0,
  ];

  let nApl = 5;

  let input = 0;
  let phases = [1, 0, 4, 3, 2];

  for (let i = 0; i < nApl; i++) {
    let istr = Object.assign([], istrInit);
    let c = new IntCode(istr, phases[i], input);
    input = c.run();
  }

  expect(input).toEqual(65210);
});

test('permutation', () => {
  let arr = [1, 2, 3, 4];

  let perm = permutation(arr);

  expect(perm).toEqual([
    [1, 2, 3, 4],
    [1, 2, 4, 3],
    [1, 3, 2, 4],
    [1, 3, 4, 2],
    [1, 4, 2, 3],
    [1, 4, 3, 2],
    [2, 1, 3, 4],
    [2, 1, 4, 3],
    [2, 3, 1, 4],
    [2, 3, 4, 1],
    [2, 4, 1, 3],
    [2, 4, 3, 1],
    [3, 1, 2, 4],
    [3, 1, 4, 2],
    [3, 2, 1, 4],
    [3, 2, 4, 1],
    [3, 4, 1, 2],
    [3, 4, 2, 1],
    [4, 1, 2, 3],
    [4, 1, 3, 2],
    [4, 2, 1, 3],
    [4, 2, 3, 1],
    [4, 3, 1, 2],
    [4, 3, 2, 1],
  ]);
});

const permutation = (ar: number[]): number[][] =>
  ar.length === 1
    ? ar
    : ar.reduce((ac, _, i) => {
        permutation([...ar.slice(0, i), ...ar.slice(i + 1)]).map((v) => ac.push([].concat(ar[i], v)));
        return ac;
      }, []);

test('Part 1 full', () => {
  let istrInit = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0];

  let nApl = 5;
  let input = 0;
  let output = -Infinity;

  permutation([0, 1, 2, 3, 4]).forEach((phase) => {
    input = 0;
    for (let i = 0; i < nApl; i++) {
      let istr = Object.assign([], istrInit);
      let c = new IntCode(istr, phase[i], input);
      input = c.run();
    }

    if (output < input) {
      // console.log(output, input)
      output = input;
    }
  });

  expect(output).toEqual(43210);
});

test('Part 2 full', () => {
  let istrInit = [
    3,
    26,
    1001,
    26,
    -4,
    26,
    3,
    27,
    1002,
    27,
    2,
    27,
    1,
    27,
    26,
    27,
    4,
    27,
    1001,
    28,
    -1,
    28,
    1005,
    28,
    6,
    99,
    0,
    0,
    5,
  ];

  let nApl = 5;
  let input = 0;
  let output = -Infinity;

  let phase = [9, 8, 7, 6, 5];

  let machines = [
    new IntCode(Object.assign([], istrInit), phase[0]),
    new IntCode(Object.assign([], istrInit), phase[1]),
    new IntCode(Object.assign([], istrInit), phase[2]),
    new IntCode(Object.assign([], istrInit), phase[3]),
    new IntCode(Object.assign([], istrInit), phase[4]),
  ];

  // input = 0;
  while (true) {
    let res: { final: boolean; counter: number };

    // run all machines
    for (let i = 0; i < nApl; i++) {
      // console.log(i, input)
      res = machines[i].setInput(input).runLoop();

      input = res.counter;

      if (res.final) {
        break;
      }
    }

    // only E has output
    if (output < input) {
      output = input;
    }

    if (res.final) {
      break;
    }
  }

  expect(output).toEqual(139629729);
});
