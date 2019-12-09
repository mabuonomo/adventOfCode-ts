import { IntCode } from './intcode';

test('Fake test ', () => {
  let c = new IntCode([1], 1);
  expect(c.buildOP(0)).toEqual({ first: 0, second: 0, third: 0, code: 1 });

  c = new IntCode([101], 1);
  expect(c.buildOP(0)).toEqual({ first: 1, second: 0, third: 0, code: 1 });

  c = new IntCode([99], 1);
  expect(c.buildOP(0)).toEqual({ first: 0, second: 0, third: 0, code: 99 });

  c = new IntCode([499], 1);
  expect(c.buildOP(0)).toEqual(undefined);

  c = new IntCode([401], 1);
  expect(c.buildOP(0)).toEqual(undefined);

  c = new IntCode([1101], 1);
  expect(c.buildOP(0)).toEqual({ first: 1, second: 1, third: 0, code: 1 });

  c = new IntCode([102], 1);
  expect(c.buildOP(0)).toEqual({ first: 1, second: 0, third: 0, code: 2 });

  c = new IntCode([22], 1);
  expect(c.buildOP(0)).toEqual(undefined);

  c = new IntCode([12], 1);
  expect(c.buildOP(0)).toEqual(undefined);
});

test('Fake test 1', () => {
  let c = new IntCode([1002, 4, 3, 4, 33], 1);

  c.execute(0);

  expect(c.getRegistry()).toEqual([1002, 4, 3, 4, 99]);
});

test('Fake test 2', () => {
  let c = new IntCode([1101, 100, -1, 4, 0], 1);

  c.execute(0);

  expect(c.getRegistry()).toEqual([1101, 100, -1, 4, 99]);
});

// test('Fake test 3', () => {
//   let c = new IntCode([1002, 4, 3, 4, 33, 1004, 4], 1);

//   expect(c.run()).toEqual(99);
// });

// test('Fake test 4', () => {
//   let c = new IntCode([1002, 4, 3, 4, 33, 1104, 4], 1);

//   expect(c.run()).toEqual(4);
// });

test('Fake test 5', () => {
  let c = new IntCode([3, 0, 4, 0, 99], 1);
  expect(c.run()).toEqual(1);

  let d = new IntCode([3, 0, 4, 0, 99], 0);
  expect(d.run()).toEqual(0);
});

test('Fake test 7', () => {
  let inp = [
    3,
    21,
    1008,
    21,
    8,
    20,
    1005,
    20,
    22,
    107,
    8,
    21,
    20,
    1006,
    20,
    31,
    1106,
    0,
    36,
    98,
    0,
    0,
    1002,
    21,
    125,
    20,
    4,
    20,
    1105,
    1,
    46,
    104,
    999,
    1105,
    1,
    46,
    1101,
    1000,
    1,
    20,
    4,
    20,
    1105,
    1,
    46,
    98,
    99,
  ];

  let c = new IntCode(inp, 7);
  expect(c.run()).toEqual(999);

  let d = new IntCode(inp, 8);
  expect(d.run()).toEqual(1000);

  let e = new IntCode(inp, 9);
  expect(e.run()).toEqual(1001);
});

test('Test base op code 9', () => {
  let inp = [109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99];

  let e = new IntCode(inp, 0);
  expect(e.run()).toEqual(109);
});

test('Test base op code 9', () => {
  let inp = [104, 1125899906842624, 99];

  let e = new IntCode(inp, 0);
  expect(e.run()).toEqual(1125899906842624);
});

test('Test base op code 9', () => {
  let inp = [1102, 34915192, 34915192, 7, 4, 7, 99, 0];

  let e = new IntCode(inp, 0);
  expect(e.run().toString().length).toEqual(16);
});
