import * as fs from 'fs';
import * as rd from 'readline'
import { createPoints, initMatrix, putPoint, Point, printMatrix, getDimMatrix, flow, CLAY, WATER, WATER_FLOW } from './utils';

var reader = rd.createInterface(fs.createReadStream("./src/day17/input.txt"))

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

    flow(matrixBuild, 500, 1, null, dim);
    // printMatrix(matrixBuild, dim)

    // let width = dim.xMax - dim.xMin + 1 + 2; // overflow left and right
    // let height = dim.yMax - dim.yMin + 1;

    let water = 0;
    let waterFlow = 0;
    for (let i = 0; i <= dim.xMax + 1; i++) {
        for (let j = 0; j <= dim.yMax; j++) {
            // console.log(i + " " + j)
            try {
                if (matrixBuild[i][j] === WATER) {
                    water++;
                }

                if (matrixBuild[i][j] === WATER_FLOW) {
                    waterFlow++;
                }
            } catch (err) { }
        }
    }
    console.log('Water: ' + water);
    console.log('Flow: ' + waterFlow);
    console.log('Result: ' + (water + waterFlow));

    console.log('Timing: ' + (new Date().getTime() - t) + ' ms');
})