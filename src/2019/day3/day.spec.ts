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
    { md5: 'cfcd208495d565ef66e7dff9f98764da', p1: { x: 0, y: 0 }, p2: { x: 8, y: 0 } },
    { md5: 'cfcd208495d565ef66e7dff9f98764da', p1: { x: 8, y: 0 }, p2: { x: 8, y: 5 } },
    { md5: 'cfcd208495d565ef66e7dff9f98764da', p1: { x: 8, y: 5 }, p2: { x: 3, y: 5 } },
    { md5: 'cfcd208495d565ef66e7dff9f98764da', p1: { x: 3, y: 5 }, p2: { x: 3, y: 2 } },
    { md5: 'c4ca4238a0b923820dcc509a6f75849b', p1: { x: 0, y: 0 }, p2: { x: 0, y: 7 } },
    { md5: 'c4ca4238a0b923820dcc509a6f75849b', p1: { x: 0, y: 7 }, p2: { x: 6, y: 7 } },
    { md5: 'c4ca4238a0b923820dcc509a6f75849b', p1: { x: 6, y: 7 }, p2: { x: 6, y: 3 } },
    { md5: 'c4ca4238a0b923820dcc509a6f75849b', p1: { x: 6, y: 3 }, p2: { x: 2, y: 3 } },
  ]);

  let points = c.findPointsIntersect(paths);
  expect(points).toEqual([
    { x: 6, y: 5 },
    { x: 3, y: 3 },
  ]);

  let start = { x: 0, y: 0 };
  let min = Infinity;
  points.forEach((point) => {
    let distance = c.manhattanDistance2D(start, point);
    if (min > distance) {
      min = distance;
    }
  });

  expect(min).toEqual(6);
});

// test('Part 2_1', () => {
//   let c = new Day();
//   let lines = ['R8,U5,L5,D3', 'U7,R6,D4,L4'];

//   let commands = [];
//   lines.forEach((element) => {
//     commands.push(c.buildDirection(element));
//   });

//   let paths = c.buildPaths(commands);
//   let points = c.findPointsIntersect(paths);

//   expect(c.findMinPathIntersect(paths, points)).toEqual(30);
// });

// test('Part 2_2', () => {
//   let c = new Day();
//   let lines = ['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'];

//   let commands = [];
//   lines.forEach((element) => {
//     commands.push(c.buildDirection(element));
//   });

//   let paths = c.buildPaths(commands);
//   let points = c.findPointsIntersect(paths);

//   expect(c.findMinPathIntersect(paths, points)).toEqual(410);
// });

// test('Part 2_3', () => {
//   let c = new Day();
//   let lines = ['R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83'];

//   let commands = [];
//   lines.forEach((element) => {
//     commands.push(c.buildDirection(element));
//   });

//   let paths = c.buildPaths(commands);
//   let points = c.findPointsIntersect(paths);

//   expect(c.findMinPathIntersect(paths, points)).toEqual(610);
// });
