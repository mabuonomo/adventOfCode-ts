import { IntCode } from './intcode';

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

test('Fake test 3', () => {
  let c = new IntCode([1002, 4, 3, 4, 33, 1004, 4], 1);

  expect(c.run()).toEqual(99);
});

test('Fake test 4', () => {
  let c = new IntCode([1002, 4, 3, 4, 33, 1104, 4], 1);

  expect(c.run()).toEqual(4);
});

test('Fake test 4', () => {
  let c = new IntCode([3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9], 1);

  expect(c.run()).toEqual(1);
});
