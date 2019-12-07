import { IntCode } from './intcode';

test('Fake test', () => {
  let c = new IntCode([1002, 4, 3, 4, 33]);

  let input = 1;

  expect(c.run(input)).toBe(99);
});
