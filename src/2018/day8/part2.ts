import * as fs from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(fs.createReadStream('./src/2018/day8/input.txt'));

let lines: Array<number> = [];

reader.on('line', (l: string) => {
  let tokens = l.split(' ');

  tokens.forEach((element) => {
    lines.push(parseInt(element));
  });
});

reader.on('close', () => {
  let t = new Date().getTime();
  console.log('Result ' + walk());
  console.log('Timing: ' + (new Date().getTime() - t) + ' ms');
});

function walk() {
  let res = 0;

  // childs number
  const count = lines.shift();
  // metas number
  const meta = lines.shift();

  if (count !== undefined && meta != undefined) {
    if (count) {
      const chtr = [];
      for (let i = 0; i < count; i++) {
        chtr.push(walk());
      }
      const metr = [];
      for (let i = 0; i < meta; i++) {
        metr.push(lines.shift());
      }

      for (const u of metr) {
        if (u !== undefined) {
          const ix = u - 1;
          if (ix >= 0 && ix < chtr.length)
            if (chtr !== undefined) {
              res += chtr[ix];
            }
        }
      }
    } else {
      for (let i = 0; i < meta; i++) {
        let t = lines.shift();

        if (t !== undefined) {
          res += t;
        }
      }
    }
  }

  return res;
}
