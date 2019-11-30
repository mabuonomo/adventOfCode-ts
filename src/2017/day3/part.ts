import { createSpiralMatrix, Step, printMatrix, indexOf2d, manhattanDistance, trampoline } from '../utils/utils';
import { findSum } from './utils';

let size = 347991;
// let size = 23
let matrix = trampoline(createSpiralMatrix);

let result_matrix = matrix(size, Step.CENTER, { x: 0, y: 0 }, 1);
// printMatrix(matrix, size * 2, true)

console.log('Result 1: ' + main1());
console.log('Result 2: ' + main2());

function main1() {
  let door = indexOf2d(result_matrix, 1);
  let last = indexOf2d(result_matrix, size);

  // console.log(door + ' ' + last)

  let distance = manhattanDistance({ x: door[0], y: door[1], z: 0 }, { x: last[0], y: last[1], z: 0 });

  return distance;
}

function main2() {
  let start = indexOf2d(result_matrix, 1);
  let x = start[0];
  let y = start[1];

  let funcSum = trampoline(findSum);

  return funcSum(result_matrix, { x: x, y: y }, size);
}
