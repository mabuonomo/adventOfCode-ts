import * as fs from 'fs';
import * as rd from 'readline';

var rl = rd.createInterface(fs.createReadStream('./src/2018/day18/input.txt'));

const OPEN = '.';
const TREES = '|';
const LUMBERYARD = '#';

function start(rl: rd.Interface) {
  const INPUT_GRID = []; // [y][x]
  rl.on('line', (line) => {
    INPUT_GRID.push(line.split(''));
  });

  rl.on('close', () => {
    let t = new Date().getTime();

    console.log('Answer (part I):', runPart1(INPUT_GRID, 10).result);
    console.log('Answer (part II):', runPart2(INPUT_GRID, 1000000000).result);

    console.log('Timing: ' + (new Date().getTime() - t) + ' ms');
  });
}

function runPart1(initialGrid = [], minutes: number) {
  let data = {
    result: null,
    grid: JSON.parse(JSON.stringify(initialGrid)),
    size: initialGrid[0] ? initialGrid[0].length : 0,
    minute: 0,
  };

  while (data.minute < minutes) {
    data.grid = runMinute(data);
    data.minute++;

    // printData(data);
  }

  //printData(data);
  data.result = count(data, TREES) * count(data, LUMBERYARD);

  return data;
}

function runPart2(initialGrid = [], minutes: number) {
  let data = {
    result: null,
    grid: JSON.parse(JSON.stringify(initialGrid)),
    size: initialGrid[0] ? initialGrid[0].length : 0,
    minute: 0,
  };

  let history = {}; // strGrid: minute

  while (data.minute < minutes) {
    data.grid = runMinute(data);
    data.minute++;

    let strGrid = JSON.stringify(data.grid);
    let prev = history[strGrid];

    // find prev grid state
    if (prev) {
      let loopLength = data.minute - prev;
      while (data.minute < minutes) {
        data.minute += loopLength;
      }
      data.minute -= loopLength;
      return runPart1(data.grid, minutes - data.minute);
    } else {
      history[strGrid] = data.minute;
    }
  }

  data.result = count(data, TREES) * count(data, LUMBERYARD);

  return data;
}

function runMinute({ grid, size }) {
  // init blank grid
  let newGrid = new Array(size);
  for (let i = 0; i < size; i++) newGrid[i] = new Array(size);

  for (let yi = 0; yi < size; yi++) {
    for (let xi = 0; xi < size; xi++) {
      newGrid[yi][xi] = newState(grid, size, xi, yi);
    }
  }

  return newGrid;
}

function newState(grid, size, x, y) {
  let adjacent = getAdjacent(grid, size, x, y);
  switch (grid[y][x]) {
    case OPEN:
      return adjacent.filter((adj) => adj === TREES).length >= 3 ? TREES : OPEN;
    case TREES:
      return adjacent.filter((adj) => adj === LUMBERYARD).length >= 3 ? LUMBERYARD : TREES;
    case LUMBERYARD:
      return adjacent.find((adj) => adj === LUMBERYARD) && adjacent.find((adj) => adj === TREES) ? LUMBERYARD : OPEN;
    default:
      throw new Error('Unexpected grid contents: ' + grid[y][x]);
  }
}

function getAdjacent(grid, size, x, y) {
  let adj = [];
  for (let xi = x - 1; xi <= x + 1; xi++) {
    for (let yi = y - 1; yi <= y + 1; yi++) {
      if (xi >= 0 && xi < size && yi >= 0 && yi < size && (xi !== x || yi !== y)) {
        adj.push(grid[yi][xi]);
      }
    }
  }
  return adj;
}

function count({ grid }, type) {
  return grid.map((row) => row.filter((cell) => cell === type).length).reduce((acc, curr) => acc + curr, 0);
}

start(rl);
