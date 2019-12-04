import { Day } from './day';

test('Build commands', () => {
  let c = new Day();

  let lines = ['R8,U5,L5,D3', 'U7,R6,D4,L4'];

  let commands = [];
  lines.forEach((element) => {
    commands.push(c.buildDirection(element));
  });

  expect(commands).toEqual([
    [
      { direction: 'R', value: 8 },
      { direction: 'U', value: 5 },
      { direction: 'L', value: 5 },
      { direction: 'D', value: 3 },
    ],
    [
      { direction: 'U', value: 7 },
      { direction: 'R', value: 6 },
      { direction: 'D', value: 4 },
      { direction: 'L', value: 4 },
    ],
  ]);

  let paths = c.buildPaths(commands);
  expect(paths).toEqual([
    { p1: { x: 0, y: 0 }, p2: { x: 8, y: 0 } },
    { p1: { x: 8, y: 0 }, p2: { x: 8, y: 5 } },
    { p1: { x: 8, y: 5 }, p2: { x: 3, y: 5 } },
    { p1: { x: 3, y: 5 }, p2: { x: 3, y: 2 } },
    { p1: { x: 0, y: 0 }, p2: { x: 0, y: 7 } },
    { p1: { x: 0, y: 7 }, p2: { x: 6, y: 7 } },
    { p1: { x: 6, y: 7 }, p2: { x: 6, y: 3 } },
    { p1: { x: 6, y: 3 }, p2: { x: 2, y: 3 } },
  ]);

  let points = c.findPointsIntersect(paths);
  expect(points).toEqual([
    { x: 6, y: 5 },
    { x: 3, y: 3 },
  ]);
});
