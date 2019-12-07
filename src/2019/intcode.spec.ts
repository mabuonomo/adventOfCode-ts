import { IntCode } from './intcode';

test('Fake test 1', () => {
  let c = new IntCode([1002, 4, 3, 4, 33]);

  let input = 1;
  c.execute(0, input);

  expect(c.getRegistry()).toEqual([1002, 4, 3, 4, 99]);
});

test('Fake test 2', () => {
  let c = new IntCode([1101, 100, -1, 4, 0]);

  let input = 1;
  c.execute(0, input);

  expect(c.getRegistry()).toEqual([1101, 100, -1, 4, 99]);
});

test('Fake test 3', () => {
  let c = new IntCode([1002, 4, 3, 4, 33, 1004, 4]);

  let input = 1;

  expect(c.run(input)).toEqual(99);
});
