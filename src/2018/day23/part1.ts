import * as fs from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(fs.createReadStream('./src/2018/day23/input.txt'));

type Position = { x: number; y: number; z: number };
type Radius = { radius: number };
type NanoPoint = { pos: Position; radius: Radius };

let points: Array<NanoPoint> = [];

// pos=<1,3,1>, r=1
reader.on('line', (l: string) => {
  let tmp = l.split(' ');
  let radius = parseInt(tmp[1].split('r=')[1]);
  // console.log(radius);

  let pos = tmp[0]
    .split('pos=')[1]
    .replace('<', '')
    .replace('>', '')
    .split(',');
  let x = parseInt(pos[0]);
  let y = parseInt(pos[1]);
  let z = parseInt(pos[2]);
  // console.log(x + " " + y + " " + z)

  let position = { x: x, y: y, z: z };
  let r = { radius: radius };
  let nano: NanoPoint = { pos: position, radius: r };

  points.push(nano);
});

reader.on('close', () => {
  let t = new Date().getTime();

  console.log('Result: ' + start());
  console.log('Timing: ' + (new Date().getTime() - t) + ' ms');
});

function start(): number {
  let nanoStart = getMaxRadius();
  let radMax = nanoStart.radius.radius;

  let counter = 0;
  points.forEach((element) => {
    if (manhattanDistance(nanoStart.pos, element.pos) <= radMax) {
      counter++;
    }
  });

  return counter;
}

function getMaxRadius(): NanoPoint {
  let max = Number.MIN_VALUE;
  let result: NanoPoint;
  points.forEach((element) => {
    if (element.radius.radius > max) {
      max = element.radius.radius;
      result = element;
    }
  });

  return result;
}

function manhattanDistance(point1: Position, point2: Position): number {
  return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y) + Math.abs(point1.z - point2.z);
}
