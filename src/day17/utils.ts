import * as fs from 'fs';
import * as rd from 'readline'

var reader = rd.createInterface(fs.createReadStream("./src/day17/test.txt"))

export type Point = { x: number, y: number }
export type MatrixDim = { xMax: number, yMax: number, xMin: number, yMin: number }

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
    let xMax = 0;
    let yMax = 0;
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
    console.log(points);
    points.forEach(point => {
        let isFountain: boolean = point.x === 500 && point.y === 0;
        matrix[point.x][point.y] = !isFountain ? '#' : '+'
    })

    return matrix
}

export function printMatrix(matrix: Array<Array<string>>, dim: MatrixDim) {
    process.stdout.write('\n\nMatrix\n');
    console.log(dim);
    for (let y = dim.yMin; y <= dim.yMax; y++) {
        for (let x = dim.xMin; x <= dim.xMax; x++) {
            process.stdout.write(matrix[x][y]);
        }
        process.stdout.write('\n');
    }
}
