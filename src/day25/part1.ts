import * as fs from 'fs';
import * as rd from 'readline'
import { element } from 'prop-types';

var reader = rd.createInterface(fs.createReadStream("./src/day25/test1.txt"))

type Position = { x: number, y: number, z: number, r: number, costellation: Array<string> }
let points: Array<Position> = []
// let costellations: Array<string> = []

reader.on("line", (l: string) => {
    let tmp = l.split(",")

    let pos = { costellation: [], x: parseInt(tmp[0]), y: parseInt(tmp[1]), z: parseInt(tmp[2]), r: parseInt(tmp[3]) }

    if (points.length == 0) {
        pos.costellation.push(createHash())
        // costellations.push(pos.costellation)
    }

    points.push(pos)
});

reader.on("close", () => {
    let t = new Date().getTime();

    console.log('Points: ' + points.length)

    console.log('Result: ' + start())
    console.log('Timing: ' + (new Date().getTime() - t) + ' ms');
})

function start(): number {

    points.forEach(element => {

        // if (element.costellation == null) {
        // let findCostellation = false
        let hash = createHash()
        for (let i = 0; i < points.length; i++) {
            let pos = points[i]
            if (checkSamePoint(pos, element)) {
                continue
            }

            if (manhattanDistance(pos, element) <= 3) {
                if (pos.costellation.length > 0) {
                    hash = pos.costellation[0]
                }

                if (element.costellation.indexOf(hash) < 0) {
                    element.costellation.push(hash)
                }
                // findCostellation = true;
            }
        }

        // if (!findCostellation) {
        //     if (element.costellation.indexOf(hash) < 0) {
        //         element.costellation.push(hash)
        //     }
        // }
    })

    return createCostellations().length
}

function checkSamePoint(point1: Position, point2: Position): boolean {
    return point1.x == point2.x &&
        point1.y == point2.y &&
        point1.z == point2.z &&
        point1.r == point2.r
}

function createCostellations(): Array<string> {
    let costellations: Array<string> = []

    console.log(points)

    points.forEach(element => {
        while (element.costellation.length > 1) {
            let cost = element.costellation.pop()
            let costNext = element.costellation.pop()

            for (let i = 0; i < points.length; i++) {
                let point = points[i]

                if (checkSamePoint(point, element)) {
                    continue
                }

                if (point.costellation.indexOf(cost) > 0) {
                    point.costellation[point.costellation.indexOf(cost)] = costNext
                }
            }

            element.costellation.push(costNext)
        }
    })

    console.log('\nFinal')
    console.log(points)
    points.forEach(element => {
        let find = false
        element.costellation.sort()
        element.costellation.forEach(cos => {
            if (costellations.indexOf(cos) > 0) {
                find = true
            }
        })

        let hash = element.costellation.pop()
        if (!find && costellations.indexOf(hash) < 0 && hash != undefined) {
            costellations.push(hash)
        }
    })

    console.log(costellations)
    return costellations
}

function manhattanDistance(point1: Position, point2: Position): number {
    return Math.abs(point1.x - point2.x) +
        Math.abs(point1.y - point2.y) +
        Math.abs(point1.z - point2.z) +
        Math.abs(point1.r - point2.r)
}

function createHash(): string {
    return Math.random().toString(36).substr(2, 5)
}