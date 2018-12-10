import * as fs from 'fs';
import * as rd from 'readline'
import { number, func } from 'prop-types';

var reader = rd.createInterface(fs.createReadStream("./src/day10/input.txt"))

type Position = { x: number, y: number };
type Velocity = { x: number, y: number };

type Point = { start: Position, velocity: Velocity, actual: Position };

let points: Array<Point> = [];
// position=< 10546,  31107> velocity=<-1, -3>
reader.on("line", (l: string) => {
    let xP = parseInt(l.split(',')[0].split('position=<')[1]);
    let yP = parseInt(l.split(',')[1].split('>')[0]);
    let position = { x: xP, y: yP };

    let xV = parseInt(l.split('velocity=<')[1].split(',')[1]);
    let yV = parseInt(l.split('velocity=<')[1].split(',')[0].split('>')[0]);
    let velocity = { x: xV, y: yV };

    points.push({ start: position, velocity: velocity, actual: position });
});

reader.on("close", () => {
    let t = new Date().getTime();

    let [maxX, maxY] = getSize();
    console.log("Max: " + maxX + " " + maxY);

    let [minX, minY] = getMin();
    console.log("Min: " + minX + " " + minY);

    print(buildMatrix(minX, minY), maxX, maxY, minX, minY);

    console.log('Timing: ' + (new Date().getTime() - t) + ' ms');
})

let reduce = 1;
let dimPixel = 700;//550;
function buildMatrix(minX: number, minY: number): Array<Array<string>> {
    let matrix: Array<Array<string>> = [];

    points.forEach(element => {
        let x = (element.actual.x + minX) / reduce;
        let y = (element.actual.y + minY) / reduce;

        if (matrix[x] === undefined) {
            matrix[x] = [];
        }

        matrix[x][y] = '#';
    });

    return matrix;
}

function print(matrix: Array<Array<string>>, maxX: number, maxY: number, minX: number, minY: number) {

    console.log('X: ' + (maxX + minX) / reduce);
    console.log('Y: ' + (maxY + minY) / reduce);
    // return;

    for (let i = 0; i < (maxX + minX) / reduce; i++) {

        let find = false;
        for (let j = 0; j < (maxY + minY) / reduce; j++) {

            if (matrix[i] === undefined || matrix[i][j] === undefined) {
            } else {
                find = true;
            }

            if (j % dimPixel === 0) {
                if (find) {
                    process.stdout.write('X');
                } else {
                    process.stdout.write('.');
                }

                find = false;
            }
        }

        process.stdout.write("\n");
    }
}

function getSize(): [number, number] {
    let maxX = 0;
    let maxY = 0;
    points.forEach(element => {
        if (element.start.x > maxX) {
            maxX = element.start.x;
        }

        if (element.start.y > maxY) {
            maxY = element.start.y;
        }
    });

    return [maxX, maxY];
}

function getMin(): [number, number] {
    let minX = 0;
    let minY = 0;
    points.forEach(element => {
        if (element.start.x < minX) {
            minX = element.start.x;
        }

        if (element.start.y < minY) {
            minY = element.start.y;
        }
    });

    return [Math.abs(minX), Math.abs(minY)];
    // return [minX, minY];
}

