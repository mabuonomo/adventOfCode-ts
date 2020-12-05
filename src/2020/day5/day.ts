import { InitAbstract } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';
import { parse } from 'path';
import { strict } from 'assert';
import { after, before, ceil, floor } from 'lodash';
import { empty } from 'fp-ts/lib/ReadonlyRecord';

class Day1 extends InitAbstract {
  lines: Array<string>;
  constructor() {
    super();

    this.lines = this.getLines('day5', false);
  }

  seats = [];

  @performanceLog(true)
  runPart1() {
    let results = 0;
    this.lines.forEach((ticket) => {
      let arrRow = [0, 127];
      let arrColumn = [0, 7];

      let sizeRow = 128;
      let sizeColumn = 8;

      for (var i = 0; i < ticket.length; i++) {
        switch (ticket[i]) {
          case 'F':
            sizeRow = sizeRow / 2;
            arrRow = [arrRow[0], arrRow[0] + sizeRow - 1];
            break;
          case 'B':
            sizeRow = sizeRow / 2;
            arrRow = [arrRow[1] - sizeRow + 1, arrRow[1]];
            break;
          case 'L':
            sizeColumn = sizeColumn / 2;
            arrColumn = [arrColumn[0], arrColumn[0] + sizeColumn - 1];
            break;
          case 'R':
            sizeColumn = sizeColumn / 2;
            arrColumn = [arrColumn[1] - sizeColumn + 1, arrColumn[1]];
            break;
        }

        // console.log(ticket, arrRow, arrColumn);
      }

      let res = arrRow[0] * 8 + arrColumn[0];
      if (res > results) results = res;

      this.seats.push([arrRow[0], arrColumn[0], res]);

      // console.log('res', ticket, arrRow[0], arrColumn[0], arrRow[0] * 8 + arrColumn[0]);
    });

    return results;
  }

  @performanceLog(true)
  runPart2() {
    let seatBefore;
    let seatAfter;

    // seats [row, column, ids]
    this.seats.forEach((before) => {
      this.seats.forEach((after) => {
        if (Math.abs(before[2] - after[2]) === 2) {
          seatBefore = before;
          seatAfter = after;

          let busySeat = this.seats.find((seat) => seat[2] === before[2] + 1);

          if (!busySeat) console.log('Maybe', before, after);
        }
      });
    });
  }
}

let day = new Day1();
day.runPart1();
day.runPart2();
