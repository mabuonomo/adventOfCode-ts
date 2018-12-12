const grid2 = [...Array(300)].map(() => [...Array(300)].map(() => 0))

const sn = 1718

for (let x = 0; x < 300; x++) {
    const rackId = x + 10;
    for (let y = 0; y < 300; y++) {
        grid2[x][y] = +((rackId * y + sn) * rackId).toString().padStart(3, '0').substr(-3, 1) - 5;
    }
}

function sumSize(grid2: Array<Array<number>>, x: number, y: number, size: number) {
    let sum = 0;
    for (let i = x; i < x + size; i++) {
        for (let j = y; j < y + size; j++) {
            sum += grid2[i][j];
        }
    }
    return sum;
}

let maxCoords = [0, 0];
let max = 0;

for (let x = 0; x < 298; x++) {
    for (let y = 0; y < 298; y++) {
        const power = sumSize(grid2, x, y, 3);
        if (power > max) {
            max = power;
            maxCoords = [x, y]
        }
    }
}

console.log(maxCoords)

maxCoords = [0, 0];
max = 0;
let maxSize2 = 0;

for (let x = 0; x < 299; x++) {
    for (let y = 0; y < 299; y++) {
        const maxDim = Math.min(300 - x, 300 - y);
        for (let s = 2; s < maxDim; s++) {
            const power = sumSize(grid2, x, y, s);
            if (power > max) {
                max = power;
                maxCoords = [x, y];
                maxSize2 = s;
            }
        }
    }
}

console.log(maxCoords, maxSize2)