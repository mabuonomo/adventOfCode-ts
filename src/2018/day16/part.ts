let fss = require('fs');
let paths = require('path');
// let inputa = paths.join(__dirname, "./input.txt");
const inputa = String(fss.readFileSync(__dirname + '/input.txt')).trim();

function range(start, stop, step = 1) {
  const r = [];
  for (let i = start; i < stop; i += step) {
    r.push(i);
  }
  return r;
}

const inputOperationsRaw = inputa.split('\n');
const lastAfter = inputOperationsRaw.filter((l) => l.indexOf('After') === 0).length;
const inputOperations = inputOperationsRaw.slice(0, lastAfter * 4);

const inputOps = range(0, inputOperations.length, 4).reduce((accl, i) => {
  return accl.concat({
    before: inputOperationsRaw[i]
      .split('[')[1]
      .substr(0, 10)
      .split(', ')
      .map((c) => parseInt(c)),
    op: {
      op: parseInt(inputOperationsRaw[i + 1].split(' ')[0]),
      a: parseInt(inputOperationsRaw[i + 1].split(' ')[1]),
      b: parseInt(inputOperationsRaw[i + 1].split(' ')[2]),
      c: parseInt(inputOperationsRaw[i + 1].split(' ')[3]),
    },
    after: inputOperationsRaw[i + 2]
      .split('[')[1]
      .substr(0, 10)
      .split(', ')
      .map((c) => parseInt(c)),
  });
}, []);

const eq = (a, b) => a.length === b.length && a.reduce((e, v, i) => e && v === b[i], true);

const ops = {
  addr: (a, b, c, regs) => {
    regs[c] = regs[a] + regs[b];
  },
  addi: (a, b, c, regs) => {
    regs[c] = regs[a] + b;
  },
  mulr: (a, b, c, regs) => {
    regs[c] = regs[a] * regs[b];
  },
  muli: (a, b, c, regs) => {
    regs[c] = regs[a] * b;
  },
  banr: (a, b, c, regs) => {
    regs[c] = regs[a] & regs[b];
  },
  bani: (a, b, c, regs) => {
    regs[c] = regs[a] & b;
  },
  borr: (a, b, c, regs) => {
    regs[c] = regs[a] | regs[b];
  },
  bori: (a, b, c, regs) => {
    regs[c] = regs[a] | b;
  },
  setr: (a, b, c, regs) => {
    regs[c] = regs[a];
  },
  seti: (a, b, c, regs) => {
    regs[c] = a;
  },
  gtir: (a, b, c, regs) => {
    regs[c] = a > regs[b] ? 1 : 0;
  },
  gtri: (a, b, c, regs) => {
    regs[c] = regs[a] > b ? 1 : 0;
  },
  gtrr: (a, b, c, regs) => {
    regs[c] = regs[a] > regs[b] ? 1 : 0;
  },
  eqir: (a, b, c, regs) => {
    regs[c] = a === regs[b] ? 1 : 0;
  },
  eqri: (a, b, c, regs) => {
    regs[c] = regs[a] === b ? 1 : 0;
  },
  eqrr: (a, b, c, regs) => {
    regs[c] = regs[a] === regs[b] ? 1 : 0;
  },
};
const opNames = Object.keys(ops);

const testOps = opNames.reduce(
  (tests: any, op) => ({
    ...tests,
    [op]: (a, b, c, before, after) => {
      const reg = before.slice();
      ops[op](a, b, c, reg);
      return eq(reg, after);
    },
  }),
  {},
);

function posibilities() {
  const possibleMappings = [];
  inputOps.forEach(({ after, before, op }) => {
    const matching = opNames.filter((opName) => {
      return testOps[opName](op.a, op.b, op.c, before, after);
    });

    if (!possibleMappings[op.op]) {
      possibleMappings[op.op] = new Set(matching);
    } else {
      possibleMappings[op.op] = intersection(possibleMappings[op.op], new Set(matching));
    }
  });
  return possibleMappings;
}

const result1 = posibilities().filter((s) => s.size >= 3).length;

function intersection(set1, set2) {
  var s = new Set();
  for (var elem of set2) {
    if (set1.has(elem)) {
      s.add(elem);
    }
  }
  return s;
}

function findMapping() {
  const foundMapping = {};
  while (Object.keys(foundMapping).length !== Object.keys(ops).length) {
    const options = posibilities().map((s) =>
      Array.from(s).filter((op) => Object.values(foundMapping).indexOf(op) === -1),
    );

    const matchName = options.filter((l) => l.length === 1)[0][0];
    const matchIndex = options.findIndex((l) => l.length === 1);

    foundMapping[matchIndex] = matchName;
  }

  return foundMapping;
}
const finalMapping = findMapping();

const program = inputOperationsRaw
  .slice(lastAfter * 4 + 1)
  .filter((l) => l.length > 3)
  .map((l) => l.split(' ').map((c) => parseInt(c)));

const lastRegisters = program.reduce((regs, op) => {
  ops[finalMapping[op[0]]](op[1], op[2], op[3], regs);
  return regs;
}, new Array(4).fill(0));

console.log(`Part 1: ${result1}`);
console.log(`Part 2: ${lastRegisters[0]}`);
