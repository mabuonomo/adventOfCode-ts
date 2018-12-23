import * as fs from 'fs';
import * as rd from 'readline'
import { createPoints, initMatrix, putPoint, Point, printMatrix, getDimMatrix, flow, CLAY, WATER, WATER_FLOW } from './utils';

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

    flow(matrixBuild, 500, 0, null, dim);
    printMatrix(matrixBuild, dim)

    let water = 0;
    for (let i = 0; i <= dim.xMax; i++) {
        for (let j = 0; j <= dim.yMax; j++) {
            if (matrixBuild[i][j] === WATER_FLOW || matrixBuild[i][j] === WATER) {
                water++;
            }
        }
    }
    console.log('Result: ' + water);

    console.log('Timing: ' + (new Date().getTime() - t) + ' ms');
})