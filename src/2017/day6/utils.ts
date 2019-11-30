let matrix: Array<string> = [];
let json: string = undefined;
export function walk(array: Array<number>, step: number) {
  let max = Math.max(...array);
  let iMax = array.indexOf(max);

  array[iMax] = 0;

  let value = max;
  let i = iMax + 1;
  while (value > 0) {
    if (i == array.length) {
      i = 0;
    }
    array[i] += 1;
    value--;
    i++;
  }

  step++;

  if (matrix.indexOf(JSON.stringify(array)) == -1) {
    matrix.push(JSON.stringify(array));

    return () => walk(array, step);
  } else {
    json = JSON.stringify(array);
  }

  return step;
}

let matrix2: Array<string> = [];
export function walk2(array: Array<number>) {
  let max = Math.max(...array);
  let iMax = array.indexOf(max);

  array[iMax] = 0;

  let value = max;
  let i = iMax + 1;
  while (value > 0) {
    if (i == array.length) {
      i = 0;
    }
    array[i] += 1;
    value--;
    i++;
  }

  if (matrix2.indexOf(json) != matrix2.lastIndexOf(json)) {
    return matrix2.lastIndexOf(json) - matrix2.indexOf(json);
  }

  matrix2.push(JSON.stringify(array));

  return () => walk2(array);
}
