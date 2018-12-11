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
    let actual = { x: xP, y: yP };

    let xV = parseInt(l.split('velocity=<')[1].split(',')[1]);
    let yV = parseInt(l.split('velocity=<')[1].split(',')[0].split('>')[0]);
    let velocity = { x: yV, y: xV };

    points.push({ start: position, velocity: velocity, actual: actual });
});

reader.on("close", () => {
    let t = new Date().getTime();

    // console.log(points);
    // return; 
    // print(buildMatrix(minX, minY), maxX, maxY, minX, minY);

    movePoints();
    console.log('Timing: ' + (new Date().getTime() - t) + ' ms');
})

function buildMatrix(points: Array<Point>, minX: number, minY: number): Array<Array<string>> {
    let matrix: Array<Array<string>> = [];

    let count = 0;
    points.forEach(element => {
        let x = element.actual.x + Math.abs(minX);
        let y = element.actual.y + Math.abs(minY);

        if (matrix[x] === undefined) {
            matrix[x] = [];
        }

        matrix[x][y] = '#';
        count++;
    });

    console.log('Punti inseriti in matrix: ' + count)
    // console.log(matrix);
    return matrix;
}

function print(matrix: Array<Array<string>>) {
    let count = 0;
    for (let x = 0; x <= points.length; x++) {
        for (let y = 0; y <= points.length; y++) {
            if (matrix[x] === undefined || matrix[x][y] === undefined) {
                process.stdout.write('.');
            } else {
                process.stdout.write('#');
                count++;
            }
        }

        process.stdout.write('\n');
    }
    // process.stdout.write('\n\n');

    console.log('Punti stampati a video: ' + count);
    process.stdout.write('\n\n');
}

function movePoints(s: number = 6500) {

    // for (let i = 0; i < points.length; i++) {
    console.log('Tento s: ' + s);

    let newPoints = JSON.parse(JSON.stringify(points)) as Array<Point>

    newPoints.forEach(element => {
        // let element = points[i];
        element.actual.x = element.start.x + (element.velocity.x * s);
        element.actual.y = element.start.y + (element.velocity.y * s);
    });

    // }

    // console.log(points);
    // return;

    // if (s == 3) return;

    let [maxX, maxY] = getSize(newPoints);
    // console.log("Max: " + maxX + " " + maxY);

    let [minX, minY] = getMin(newPoints);
    // console.log("Min: " + minX + " " + minY);

    // console.log("Points: " + points.length);

    console.log("***" + Math.abs(maxX - minX) + " " + Math.abs(maxY - minY));
    // return;

    if (Math.abs(maxX - minX) <= points.length && Math.abs(maxY - minY) <= points.length) {
        let matrix = buildMatrix(newPoints, minX, minY);
        print(matrix);
        movePoints(++s);
    } else {
        // return
        // movePoints(++s);

    }
    if (s === 100000) return
    else {
        movePoints(++s);
    }
}

function getSize(points: Array<Point>): [number, number] {
    let maxX = 0;
    let maxY = 0;
    points.forEach(element => {
        if (element.actual.x > maxX) {
            maxX = element.actual.x;
        }

        if (element.actual.y > maxY) {
            maxY = element.actual.y;
        }
    });

    return [maxX, maxY];
}

function getMin(points: Array<Point>): [number, number] {
    let minX = 0;
    let minY = 0;
    points.forEach(element => {
        if (element.actual.x < minX) {
            minX = element.actual.x;
        }

        if (element.actual.y < minY) {
            minY = element.actual.y;
        }
    });

    return [minX, minY];
}

