import { Geo, printMatrix } from '../utils/utils';

export function findNext(matrix: Array<Array<number>>, position: Geo): Geo {
  let value = matrix[position.x][position.y];

  try {
    if (matrix[position.x + 1][position.y] == value + 1) {
      return { x: position.x + 1, y: position.y };
    }
  } catch (e) {}

  try {
    if (matrix[position.x - 1][position.y] == value + 1) {
      return { x: position.x - 1, y: position.y };
    }
  } catch (e) {}

  try {
    if (matrix[position.x][position.y + 1] == value + 1) {
      return { x: position.x, y: position.y + 1 };
    }
  } catch (e) {}

  try {
    if (matrix[position.x][position.y - 1] == value + 1) {
      return { x: position.x, y: position.y - 1 };
    }
  } catch (e) {}

  return { x: position.x, y: position.y };
}

let sumMatrix: Array<Array<number>> = [];
export function sumNear(matrix: Array<Array<number>>, position: Geo): number {
  let value = matrix[position.x][position.y];

  if (sumMatrix[position.x] == undefined) {
    sumMatrix[position.x] = [];
  }

  let sum = value == 1 ? 1 : 0;

  try {
    sum += matrix[position.x - 1][position.y] < value ? sumMatrix[position.x - 1][position.y] : 0;
  } catch (e) {}
  try {
    sum += matrix[position.x + 1][position.y] < value ? sumMatrix[position.x + 1][position.y] : 0;
  } catch (e) {}
  try {
    sum += matrix[position.x][position.y + 1] < value ? sumMatrix[position.x][position.y + 1] : 0;
  } catch (e) {}

  try {
    sum += matrix[position.x][position.y - 1] < value ? sumMatrix[position.x][position.y - 1] : 0;
  } catch (e) {}

  try {
    sum += matrix[position.x + 1][position.y - 1] < value ? sumMatrix[position.x + 1][position.y - 1] : 0;
  } catch (e) {}

  try {
    sum += matrix[position.x - 1][position.y - 1] < value ? sumMatrix[position.x - 1][position.y - 1] : 0;
  } catch (e) {}

  try {
    sum += matrix[position.x + 1][position.y + 1] < value ? sumMatrix[position.x + 1][position.y + 1] : 0;
  } catch (e) {}

  try {
    sum += matrix[position.x - 1][position.y + 1] < value ? sumMatrix[position.x - 1][position.y + 1] : 0;
  } catch (e) {}

  sumMatrix[position.x][position.y] = sum;

  return sum;
}

export function findSum(matrix: Array<Array<number>>, position: Geo, size: number) {
  let sum = sumNear(matrix, position);

  if (sum > size || matrix[position.x][position.y] >= size) {
    // printMatrix(sumMatrix, size * 2, true)
    return sum;
  }

  let next = findNext(matrix, position);
  // console.log(next)
  return () => findSum(matrix, next, size);
}
