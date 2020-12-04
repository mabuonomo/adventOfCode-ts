import { InitAbstract } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';
import { parse } from 'path';

class Day1 extends InitAbstract {
  lines: Array<string>;
  constructor() {
    super();

    this.lines = this.getLines('day4', false);
  }

  @performanceLog(true)
  runPart1() {
    // return this.calculateThree(3, 1);

    let documents: Array<string> = [];

    let i = 0;
    this.lines.forEach((line) => {
      if (documents[i] === undefined) {
        documents[i] = '';
      }
      documents[i] = documents[i].trim();
      if (line !== '') {
        documents[i] += ' ' + line;
      } else {
        i++;
      }
    });

    console.log(documents);

    let params = ['byr:', 'iyr:', 'eyr:', 'hgt:', 'hcl:', 'ecl:', 'pid:']; //, 'cid'];

    let validCounter = 0;
    for (let document of documents) {
      let foundAll = this.checker(document, params);

      if (foundAll) validCounter++;

      // console.log(document, foundAll);
    }

    return validCounter;
  }

  checker(value: string, params: Array<string>) {
    return params.every((v) => {
      return value.indexOf(v) > -1;
    });
  }

  @performanceLog(true)
  runPart2() {
    let documents: Array<string> = [];

    let i = 0;
    this.lines.forEach((line) => {
      if (documents[i] === undefined) {
        documents[i] = '';
      }
      documents[i] = documents[i].trim();
      if (line !== '') {
        documents[i] += ' ' + line;
      } else {
        i++;
      }
    });

    let params = ['byr:', 'iyr:', 'eyr:', 'hgt:', 'hcl:', 'ecl:', 'pid:']; //, 'cid'];

    let validCounter = 0;
    for (let document of documents) {
      let isValid = true;

      let foundAll = this.checker(document, params);
      if (!foundAll) {
        isValid = false;
      }

      for (let param of params) {
        let indexOfParam = document.indexOf(param);
        let onlyParam = document.substring(indexOfParam).split(' ')[0];
        let value: string = onlyParam.split(':')[1];
        let key = onlyParam.split(':')[0];

        // console.log(onlyParam, value)

        switch (key) {
          case 'byr':
            if (parseInt(value) < 1920 || parseInt(value) > 2002 || value.trim().length !== 4) isValid = false;
            break;
          case 'iyr':
            if (parseInt(value) < 2010 || parseInt(value) > 2020 || value.trim().length !== 4) isValid = false;
            break;
          case 'eyr':
            if (parseInt(value) < 2020 || parseInt(value) > 2030 || value.trim().length !== 4) isValid = false;
            break;
          case 'hgt':
            let foundH = false;
            if (value.indexOf('cm') > -1) {
              let cm = value.split('cm')[0];
              if (parseInt(cm) < 150 || parseInt(cm) > 193) isValid = false;
              foundH = true;
            }

            if (value.indexOf('in') > -1) {
              let inC = value.split('in')[0];
              if (parseInt(inC) < 59 || parseInt(inC) > 76) isValid = false;
              foundH = true;
            }

            if (!foundH) {
              isValid = false;
            }

            break;
          case 'hcl':
            if (!value.startsWith('#')) isValid = false;
            if (value.trim().length !== 7) isValid = false;
            if (!value.match('[\\0-9\\a-f]')) {
              isValid = false;
            }
            break;
          case 'ecl':
            let arr = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
            if (value.trim().length !== 3) {
              isValid = false;
              break;
            }

            let found = 0;
            for (let p of arr) {
              if (value.trim().includes(p)) {
                found++;
              }
            }

            if (found !== 1) isValid = false;
            break;
          case 'pid':
            if (value.trim().length !== 9) isValid = false;

            break;
        }
      }

      if (isValid) validCounter++;

      // console.log(document, isValid);
    }

    return validCounter;
  }
}

let day = new Day1();
day.runPart1();
day.runPart2();
