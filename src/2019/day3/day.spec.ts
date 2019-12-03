import { Day } from './day';

test('Build commands', () => {
  let c = new Day();

  let line = 'R8,U5,L5,D3';
  let commands = c.buildDirection(line);
});
