import * as fs from 'fs';
import * as rd from 'readline';
const Deque = require('double-ended-queue');

var reader = rd.createInterface(fs.createReadStream('./src/2018/day12/input.txt'));

let lines: string[] = [];

reader.on('line', (l: string) => {
  lines.push(l);
});

reader.on('close', () => {
  let time = new Date().getTime();

  let data = lines;

  const state = data[0]
    .replace('initial state: ', '')
    .split('')
    .map((v) => (v === '#' ? 1 : 0));

  const rules = data.slice(2).map((v) => {
    const matches = v.match(/^(.{5}) => (.)/);
    return {
      match: matches[1].split('').map((v) => (v === '#' ? 1 : 0)),
      output: matches[2] === '#' ? 1 : 0,
    };
  });

  // lookup table for whether a sequence lives
  let liveTbl = [];
  rules.forEach((r) => {
    let num = 0;
    for (let i = 0; i < 5; i++) {
      num = (num << 1) + r.match[i];
    }
    liveTbl[num] = r.output;
  });

  // array of plant indices
  let plants = [];
  state.forEach((v, idx) => {
    if (v) {
      plants.push(idx);
    }
  });

  // pretty print for the 20 generations case
  function print(d) {
    let str = '',
      idx = 0,
      numPlants = d.length;
    for (let i = -20; i <= 120; i++) {
      if (i < d.get(idx) || idx >= numPlants) {
        str += '.';
      } else {
        str += '#';
        idx++;
      }
    }
    console.log(str);
  }

  // sum of 0th generation
  // global variable gets modified in `generation`
  let sum = plants.reduce((acc, cur) => acc + cur, 0);

  // count number of elapsed generations so we can math at
  // the end without having to figure it out from the for
  // loop value
  let gen = 0;

  // progress a generation; consumes `d` and fills `newD`
  function generation(d, newD) {
    gen++;
    if (newD.length) {
      console.log('newD should always be empty');
      process.exit();
    }

    let idx = 0,
      falseCount = 4,
      lastIdx = d.peekBack() + 2;
    let window = 1;
    do {
      if (d.length && falseCount === 4) {
        // fast forward
        window = 1;
        idx = d.shift();

        // remove this id from the sum
        sum -= idx;

        // offset idx to two before the fast-forward
        idx -= 2;
        falseCount = 0;
      } else {
        idx++;
      }

      if (liveTbl[window]) {
        newD.push(idx);
        // add plant id to sum
        sum += idx;
      }

      // advance once
      window <<= 1;
      if (d.peekFront() === idx + 3) {
        window++;
        falseCount = 0;
        // remove this plant from the sum
        sum -= d.shift();
      } else {
        falseCount++;
      }
      window &= 31;
    } while (idx <= lastIdx);
  }

  // initial deques
  let a = new Deque(plants),
    b = new Deque(a.length),
    t;
  // calculate deltas at each generation until things
  // converge to a fixed rate of increase
  let prevSum = sum,
    delta = NaN,
    prevDelta = NaN,
    sameCount = 0;
  let numGenerations = 50000000000;
  for (let i = 0; i < numGenerations; i++) {
    // swap back and forth between a and b directly
    // instead of with a temp variable
    generation(a, b);

    prevDelta = delta;
    delta = sum - prevSum;
    prevSum = sum;

    // swap our deques
    t = a;
    a = b;
    b = t;

    // see if we've converged to constant growth
    if (delta === prevDelta) {
      sameCount++;
    } else {
      sameCount = 0;
    }

    // skip ahead if so
    if (sameCount > 100) {
      let remaining = numGenerations - gen;
      sum += delta * remaining;
      break;
    }
  }

  console.log(sum);

  console.log('Timing: ' + (new Date().getTime() - time) + ' ms');
});
