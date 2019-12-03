import { Day } from './day';

test('Build commands', () => {
  let c = new Day();

  let line = 'R8,U5,L5,D3';
  let commands = c.buildDirection(line);

  expect(commands).toEqual([
    { direction: 'R', value: 8 },
    { direction: 'U', value: 5 },
    { direction: 'L', value: 5 },
    { direction: 'D', value: 3 },
  ]);

  let points = c.buildPoint(commands);

  expect(points).toEqual([
    { x: 0, y: 0 },
    { x: 8, y: 0 },
    { x: 8, y: 5 },
    { x: 3, y: 5 },
    { x: 3, y: 2 },
  ]);
});
