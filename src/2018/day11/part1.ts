const interfaceSize = 3;
const gridSerialNumber = 1718;
const gridSize = 300;

const grid: { [key: string]: number } = {};

const calculatePowerLevel = (x: number, y: number): number => {
  const rackId = x + 10;
  let powerLevel = rackId * y;

  powerLevel += gridSerialNumber;
  powerLevel *= rackId;
  powerLevel = Math.floor((powerLevel / 100) % 10);
  powerLevel -= 5;

  return powerLevel;
};

const getPowerLevel = (x: number, y: number): number => {
  return grid[`${x},${y}`];
};

for (let y = 1; y <= gridSize; y++) {
  for (let x = 1; x <= gridSize; x++) {
    grid[`${x},${y}`] = calculatePowerLevel(x, y);
  }
}

const largestSquare: { [key: string]: number } = {
  powerLevel: 0,
  x: 0,
  y: 0,
};

for (let y = 1; y <= gridSize - interfaceSize; y++) {
  for (let x = 1; x <= gridSize - interfaceSize; x++) {
    let squarePowerLevel = 0;

    for (let yy = y; yy <= y + interfaceSize - 1; yy++) {
      for (let xx = x; xx <= x + interfaceSize - 1; xx++) {
        squarePowerLevel += getPowerLevel(xx, yy);
      }
    }

    if (squarePowerLevel > largestSquare.powerLevel) {
      largestSquare.powerLevel = squarePowerLevel;
      largestSquare.x = x;
      largestSquare.y = y;
    }
  }
}

console.log(largestSquare);
