import * as fs from 'fs';
import * as rd from 'readline'
import { element } from 'prop-types';

var reader = rd.createInterface(fs.createReadStream("./src/day25/test3.txt"))

type Position = { x: number, y: number, z: number, r: number, costellation?: string }
let points: Array<Position> = []
let costellations: Array<string> = []

reader.on("line", (l: string) => {
    let tmp = l.split(",")

    let pos = { x: parseInt(tmp[0]), y: parseInt(tmp[1]), z: parseInt(tmp[2]), r: parseInt(tmp[3]), costellation: null }

    if (points.length == 0) {
        pos.costellation = createHash()
        costellations.push(pos.costellation)
    }

    points.push(pos)
});

reader.on("close", () => {
    let t = new Date().getTime();

    // console.log(points)

    console.log('Result: ' + start())
    console.log('Timing: ' + (new Date().getTime() - t) + ' ms');
})

function start(): number {

    points.forEach(element => {

        if (element.costellation == null) {
            let findCostellation = false
            for (let i = 0; i < points.length; i++) {
                let pos = points[i]
                if (pos.costellation == element.costellation) {
                    continue
                }

                if (manhattanDistance(pos, element) <= 3) {
                    element.costellation = pos.costellation
                    findCostellation = true;
                    break;
                }
            }

            if (!findCostellation) {
                element.costellation = createHash()
                // console.log(element.costellation)
                costellations.push(element.costellation)
            }
        }
    })

    return costellations.length
}

function manhattanDistance(point1: Position, point2: Position): number {
    return Math.abs(point1.x - point2.x) +
        Math.abs(point1.y - point2.y) +
        Math.abs(point1.z - point2.z) +
        Math.abs(point1.r - point2.r)
}

function createHash(): string {
    return Math.random().toString(36).substr(2, 20)
}