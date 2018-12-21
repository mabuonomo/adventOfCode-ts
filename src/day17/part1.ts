import * as fs from 'fs';
import * as rd from 'readline'
import { createPoints, initMatrix, getMaxPoint, putPoint, Point } from './utils';

var reader = rd.createInterface(fs.createReadStream("./src/day17/test.txt"))

let points: Array<Point> = [];
let matrix: Array<Array<string>> = []

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

    let matrix = initMatrix(getMaxPoint(points));
    let matrixBuild = putPoint(matrix, points)

    console.log(matrixBuild);

    console.log('Timing: ' + (new Date().getTime() - t) + ' ms');
})