import * as fs from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(fs.createReadStream('./src/2018/day5/input.txt'));

var line: string;

reader.on('line', (l: string) => {
  line = l;
});

reader.on('close', () => {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  console.log('Line ' + line.length);
  let minLen = -1;
  let charMin;
  alphabet.forEach((element) => {
    console.log('**Char: ' + element);

    let splits = splitLint(replaceAll(replaceAll(line, element.toLowerCase(), ''), element.toUpperCase(), ''), 2);
    console.log('Cut: ' + replaceAll(replaceAll(line, element.toLowerCase(), ''), element.toUpperCase(), '').length);

    let final = '';
    splits.forEach((split) => {
      let index = final.length - 2;
      final += split;
      final = cleanString(final, index);
    });

    console.log('Len: ' + final.length);

    if (minLen === -1 || final.length < minLen) {
      minLen = final.length;
      charMin = element;
    }
  });

  console.log('Result ' + minLen + ' ' + charMin);
});

function replaceAll(line: string, search: string, replacement: string) {
  return line.replace(new RegExp(search, 'g'), replacement);
}

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
