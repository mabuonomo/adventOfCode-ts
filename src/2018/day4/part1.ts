import * as fs from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(fs.createReadStream('./src/2018/day4/input.txt'));

var array: Array<{ line: string; data: Date }> = [];

reader.on('line', (l: string) => {
  var tokens = l.split(' ');
  var data_gar = tokens;

  var data_full = data_gar[0].substring(1, data_gar[0].length) + ' ' + data_gar[1].substring(0, data_gar[1].length - 1);
  var data = new Date(data_full);
  var timestamp = data.getTime();

  var token: { line: string; data: Date } = { line: l, data: data };
  // console.log(token);

  array.push(token);
});

var matrix: Array<Array<number>> = [];

reader.on('close', () => {
  array.sort((a: { line: string; data: Date }, b: { line: string; data: Date }) => {
    return a.data.getTime() - b.data.getTime();
  });

  console.log(array);

  for (let i = 0; i < array.length; i++) {
    let elem = array[i];
    if (isGuard(elem.line)) {
      let idGuard = getIdGuard(elem.line);

      for (let j = i + 1; j < array.length; j++) {
        let nextLine = array[j];
        if (isGuard(nextLine.line)) {
          break;
        }

        if (getAction(nextLine.line) === 'falls asleep') {
          let nextNextLine = array[j + 1];
          let minStart = nextLine.data.getMinutes();
          let minStop = nextNextLine.data.getMinutes();

          if (matrix[idGuard] === undefined) {
            matrix[idGuard] = [];
          }

          // fill
          for (let start = minStart; start < minStop; start++) {
            if (matrix[idGuard][start] === undefined) {
              matrix[idGuard][start] = 1;
            } else {
              matrix[idGuard][start]++;
            }
          }
        }
      }
    }
  }

  let idGuard = -1;
  let maxCounter = 0;
  Object.keys(matrix).forEach((key) => {
    let counter = 0;
    for (let j = 0; j <= 59; j++) {
      if (matrix[parseInt(key)][j] != undefined) {
        counter += matrix[parseInt(key)][j];
      }

      if (counter > maxCounter) {
        maxCounter = counter;
        idGuard = parseInt(key);
      }
    }
  });
  console.log('Max minute asleep guard:' + idGuard + ' ' + maxCounter);

  let maxOverlap = 0;
  let minute = -1;
  for (let i = 0; i <= 59; i++) {
    if (matrix[idGuard][i] > maxOverlap) {
      maxOverlap = matrix[idGuard][i];
      minute = i;
    }
  }

  console.log('Guard: ' + idGuard + ' minute: ' + minute + ' overlap: ' + maxOverlap);
  console.log('Result: ' + idGuard * minute);
});

function isGuard(line: string): boolean {
  if (line.indexOf('Guard') > 0) {
    return true;
  }

  return false;
}

function getIdGuard(line: string): number {
  let l: string = line.split('#')[1].toString();
  let id = parseInt(l.split(' ')[0]);

  return id;
}

function getAction(line: string): string {
  return line.split(']')[1].trim();
}
