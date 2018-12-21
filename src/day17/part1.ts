import * as fs from 'fs';
import * as rd from 'readline'
import { number } from 'prop-types';

var reader = rd.createInterface(fs.createReadStream("./src/day17/test.txt"))

type Point = { x: number, y: number }

let points: Array<Point> = [];

// x=495, y=2..7
// y=7, x=495..501
reader.on("line", (l: string) => {
    let regexLine = /([xy])=(\d+)(..)?(\d+)?, ([xy])=(\d+)(..)?(\d+)?/;
    let match = regexLine.exec(l)
    let pnt = createPoints(match)

    pnt.forEach(point => {
        points.push(point);
    })
});

function createPoints(match: RegExpExecArray): Array<Point> {
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

reader.on("close", () => {
    let t = new Date().getTime();

    console.log(points);

    console.log('Timing: ' + (new Date().getTime() - t) + ' ms');
})