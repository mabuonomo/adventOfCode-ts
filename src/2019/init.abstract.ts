import * as fs from 'fs';
import { performanceLog } from 'decorators-utils-ts/dist/src';
const lineByLine = require('n-readlines');

export abstract class InitAbstract {
  @performanceLog(true)
  getLines(day: string, test: boolean = false): Array<string> {
    var data: Array<string> = [];
    let path = process.cwd() + '/src/2019/' + day + '/input.txt';

    if (test) {
      path = process.cwd() + '/src/2019/' + day + '/input_test.txt';
    }

    if (fs.existsSync(path)) {
      console.log('Input exists');
    } else {
      console.log('Input not exists');
    }

    const liner = new lineByLine(path);

    let line;
    while ((line = liner.next())) {
      data.push(line.toString('ascii'));
    }

    return data;
  }
}
