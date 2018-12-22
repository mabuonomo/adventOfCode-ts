import * as fs from 'fs';
import * as rd from 'readline'

var reader = rd.createInterface(fs.createReadStream("./src/day17/test.txt"))

export type Point = { x: number, y: number }
export type MatrixDim = { xMax: number, yMax: number, xMin: number, yMin: number }

const CLAY = "#";
const WATER = "~";
const WATER_FLOW = "|";
const FOUNTAIN = "+";
const DOT = "."

export function createPoints(match: RegExpExecArray): Array<Point> {
    let [_1, var1, start1, _2, end1, var2, start2, _3, end2] = [...match];

    let xAll: Array<number> = [];
    let yAll: Array<number> = [];

    if (_2 === undefined) {
        if (var1 === 'x') {
            xAll.push(parseInt(start1));
        } else {
            yAll.push(parseInt(start1));
        }
    } else {
        for (let i = parseInt(start1); i <= parseInt(end1); i++) {
            if (var1 === 'x') {
                xAll.push(i);
            } else {
                yAll.push(i);
            }
        }
    }

    if (_3 === undefined) {
        if (var2 === 'x') {
            xAll.push(parseInt(start2));
        } else {
            yAll.push(parseInt(start2));
        }
    } else {
        for (let i = parseInt(start2); i <= parseInt(end2); i++) {
            if (var2 === 'x') {
                xAll.push(i);
            } else {
                yAll.push(i);
            }
        }
    }

    let points: Array<Point> = [];
    // build points
    xAll.forEach(x => {
        yAll.forEach(y => {
            let point = { x: x, y: y }
            points.push(point);
        })
    })

    return points
}

export function getDimMatrix(points: Array<Point>): MatrixDim {
    let xMax = -Infinity;
    let yMax = -Infinity;
    let xMin = Infinity;
    let yMin = Infinity;

    points.forEach(point => {
        xMax = xMax < point.x ? point.x : xMax
        yMax = yMax < point.y ? point.y : yMax

        xMin = xMin > point.x ? point.x : xMin;
        yMin = yMin > point.y ? point.y : yMin;
    })

    return { xMax: xMax, yMax: yMax, xMin: xMin, yMin: yMin }
}

export function initMatrix(dim: MatrixDim) {
    let matrix: Array<Array<string>> = []
    for (let x = 0; x <= dim.xMax; x++) {
        for (let y = 0; y <= dim.yMax; y++) {
            if (matrix[x] === undefined) {
                matrix[x] = []
            }
            matrix[x][y] = '.'
        }
    }

    return matrix
}

export function putPoint(matrix: Array<Array<string>>, points: Array<Point>) {
    points.forEach(point => {
        let isFountain: boolean = point.x === 500 && point.y === 0;
        matrix[point.x][point.y] = !isFountain ? CLAY : FOUNTAIN
    })

    return matrix
}

export function printMatrix(matrix: Array<Array<string>>, dim: MatrixDim) {
    process.stdout.write('\nMatrix\n');
    // console.log(dim);
    for (let y = dim.yMin; y <= dim.yMax; y++) {
        for (let x = dim.xMin; x <= dim.xMax; x++) {
            process.stdout.write(matrix[x][y]);
        }
        process.stdout.write('\n');
    }
    process.stdout.write('\n');
}

export let flow = (board: Array<Array<string>>, x: number, y: number, d = null, dim: MatrixDim) => {
    // printMatrix(board, dim)
    if (board[x][y] === DOT) {
        board[x][y] = WATER_FLOW;
    }
    if (board[x][y] === CLAY) {
        return x;
    }
    if (x === board.length - 1) {
        return;
    }
    if (board[x][y + 1] === DOT) {
        flow(board, x, y + 1, null, dim);
    }
    if (board[x][y + 1] === CLAY || board[x][y + 1] === WATER) {
        if (d === 'l') {
            return flow(board, x - 1, y, 'l', dim);
        }
        if (d === 'r') {
            return flow(board, x + 1, y, 'r', dim);
        }
        let left = flow(board, x - 1, y, 'l', dim);
        let right = flow(board, x + 1, y, 'r', dim);
        if (board[left][y] === CLAY && board[right][y] === CLAY) {
            for (let i = left + 1; i < right; i++) {
                board[i][y] = WATER;
            }
        }
    } else {
        return x;
    }
}
