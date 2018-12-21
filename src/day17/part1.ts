import * as fs from 'fs';
import * as rd from 'readline'
import { createPoints, initMatrix, putPoint, Point, printMatrix, getDimMatrix } from './utils';

var reader = rd.createInterface(fs.createReadStream("./src/day17/test.txt"))

let points: Array<Point> = [];

reader.on("line", (l: string) => {
    let regexLine = /([xy])=(\d+)(..)?(\d+)?, ([xy])=(\d+)(..)?(\d+)?/;
    let match = regexLine.exec(l)
    let pnt = createPoints(match)

    pnt.forEach(point => {
        points.push(point);
    })
});

reader.on("close", () => {
    let t = new Date().getTime();

    let dim = getDimMatrix(points);
    let matrix = initMatrix(dim);
    let matrixBuild = putPoint(matrix, points)

    printMatrix(matrixBuild, dim)

    console.log('Timing: ' + (new Date().getTime() - t) + ' ms');
})