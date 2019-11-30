import { number } from 'prop-types';

export type Geo = { x: number; y: number; z?: number };

export function manhattanDistance(point1: Geo, point2: Geo): number {
  return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y) + Math.abs(point1.z - point2.z);
}

export enum Step {
  UP,
  DOWN,
  RIGHT,
  LEFT,
  CENTER,
}

let matrix: Array<Array<number>> = [];
export function createSpiralMatrix(size: number, nextDirection: Step, nextPosition: Geo, nextValue: number) {
  // exit condition
  if (nextValue > size) {
    return matrix;
  }

  if (matrix == undefined) {
    matrix = [];
  }

  let actualPosition = { x: nextPosition.x, y: nextPosition.y };
  nextPosition = { x: nextPosition.x + size, y: nextPosition.y + size };

  if (matrix[nextPosition.x] == undefined) {
    matrix[nextPosition.x] = [];
  }

  matrix[nextPosition.x][nextPosition.y] = nextValue;

  // console.log('Direction: ' + nextDirection.toString() + ' ' + nextValue)

  // next value
  let value = nextValue + 1;
  let nextStep: Step;
  let nextPos: Geo;

  switch (nextDirection) {
    case Step.CENTER:
      nextStep = Step.RIGHT;
      nextPos = { x: actualPosition.x + 1, y: actualPosition.y };
      break;
    case Step.RIGHT:
      if (matrix[nextPosition.x][nextPosition.y - 1] == undefined) {
        nextStep = Step.UP;
        nextPos = { x: actualPosition.x, y: actualPosition.y - 1 };
      } else {
        nextStep = Step.RIGHT;
        nextPos = { x: actualPosition.x + 1, y: actualPosition.y };
      }
      break;
    case Step.DOWN:
      if (matrix[nextPosition.x + 1] == undefined || matrix[nextPosition.x + 1][nextPosition.y] == undefined) {
        nextStep = Step.RIGHT;
        nextPos = { x: actualPosition.x + 1, y: actualPosition.y };
      } else {
        nextStep = Step.DOWN;
        nextPos = { x: actualPosition.x, y: actualPosition.y + 1 };
      }
      break;

    case Step.LEFT:
      if (matrix[nextPosition.x][nextPosition.y + 1] == undefined) {
        nextStep = Step.DOWN;
        nextPos = { x: actualPosition.x, y: actualPosition.y + 1 };
      } else {
        nextStep = Step.LEFT;
        nextPos = { x: actualPosition.x - 1, y: actualPosition.y };
      }
      break;
    case Step.UP:
      if (matrix[nextPosition.x - 1] == undefined || matrix[nextPosition.x - 1][nextPosition.y] == undefined) {
        nextStep = Step.LEFT;
        nextPos = { x: actualPosition.x - 1, y: actualPosition.y };
      } else {
        nextStep = Step.UP;
        nextPos = { x: actualPosition.x, y: actualPosition.y - 1 };
      }
      break;
  }

  return () => createSpiralMatrix(size, nextStep, nextPos, value);
  // return matrix
}

export function printMatrix(matrix: Array<Array<number>>, size: number, showPosition: boolean = false) {
  for (let y = 0; y <= size; y++) {
    let found = false;
    for (let x = 0; x <= size; x++) {
      if (matrix[x] === undefined || matrix[x][y] === undefined) {
        // process.stdout.write(' ');
      } else {
        found = true;
        if (showPosition) process.stdout.write('.' + matrix[x][y].toString() + '[' + x + ',' + y + '].');
        else process.stdout.write('.' + matrix[x][y].toString() + '.');
      }
    }

    if (found) process.stdout.write('\n');
  }
  process.stdout.write('\n\n');
}

export function indexOf2d(arr: Array<Array<number>>, val: number) {
  var index = [-1, -1];

  if (!Array.isArray(arr)) {
    return index;
  }

  arr.some(function(sub, posX) {
    if (!Array.isArray(sub)) {
      return false;
    }

    var posY = sub.indexOf(val);

    if (posY !== -1) {
      index[0] = posX;
      index[1] = posY;
      return true;
    }

    return false;
  });

  return index;
}

// resolve maximum call stack size exceeded
export const trampoline = (fn) => (...args) => {
  let result = fn(...args);

  while (typeof result === 'function') {
    result = result();
  }

  return result;
};
