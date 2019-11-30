import * as fs from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(fs.createReadStream('./src/2018/day5/input.txt'));

var line: string;

reader.on('line', (l: string) => {
  line = l;
});

reader.on('close', () => {
  let splits = splitLint(line, 2);

  let final = '';
  splits.forEach((split) => {
    let index = final.length - 2;
    final += split;
    final = cleanString(final, index);
  });

  console.log('String: ' + final);
  console.log('Result: ' + final.length);
});

function cleanString(line: string, i: number): string {
  if (i <= -1) {
    i = 0;
  }

  let actual = line[i];

  if (i + 1 >= line.length) {
    return line;
  }

  let next = line[i + 1];

  // console.log("Check: " + i + " " + actual + " " + next);
  if (checkSimilar(actual, next) && checkReact(actual, next)) {
    // console.log('**React: ' + actual + " " + next);
    line = removeIndex(i, line);
    i--;
  } else {
    i++;
  }

  return cleanString(line, i);
}

function splitLint(line: string, size: number): string[] {
  var re = new RegExp('.{1,' + size + '}', 'g');
  return line.match(re) as string[];
}

function removeIndex(index: number, line: string) {
  let end = index + 2 < line.length ? index + 2 : line.length;
  return line.substring(0, index) + line.substring(end, line.length);
}
function checkIsUpper(char: string): boolean {
  return char === char.toUpperCase();
}

function checkIsLower(char: string): boolean {
  return char === char.toLowerCase();
}

function checkSimilar(char: string, next: string) {
  return char.toLowerCase() === next.toLowerCase();
}

function checkReact(line: string, next: string) {
  return (checkIsUpper(line) && checkIsLower(next)) || (checkIsLower(line) && checkIsUpper(next));
}
