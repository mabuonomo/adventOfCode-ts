import * as fs from 'fs';
import * as rd from 'readline'
import { number } from 'prop-types';

var reader = rd.createInterface(fs.createReadStream("./src/day10/input.txt"))

type Position = { x: number, y: number };
type Velocity = { x: number, y: number };

type Point = {position: Position, velocity : Velocity};

let points : Array<Point> = [];
// position=< 10546,  31107> velocity=<-1, -3>
reader.on("line", (l: string) => {
    let xP = parseInt(l.split(',')[0].split('position=<')[1]);
    let yP = parseInt(l.split(',')[1].split('>')[0]);
    let position = {x:xP, y:yP};

    let xV = parseInt(l.split('velocity=<')[1].split(',')[1]);
    let yV = parseInt(l.split('velocity=<')[1].split(',')[0].split('>')[0]);
    let velocity = {x:xV, y:yV};

    points.push({position: position, velocity:velocity});
});

reader.on("close", () => {
    let t = new Date().getTime();

    console.log('Timing: ' + (new Date().getTime() - t) + ' ms');
})

