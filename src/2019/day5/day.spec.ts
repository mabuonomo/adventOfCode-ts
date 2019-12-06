import { Day } from './day';

test('Part 1 small', () => {
  let c = new Day();

  let input = ['COM)B', 'B)C', 'C)D'];

  expect(c.counter(input, 'COM', 0)).toBe(6);
});

test('Part 1 full', () => {
  let c = new Day();

  let input = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L'];

  expect(c.counter(input, 'COM', 0)).toBe(42);
});