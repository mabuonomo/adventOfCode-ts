import * as fs from 'fs';
import * as rd from 'readline'
import { element } from 'prop-types';

var reader = rd.createInterface(fs.createReadStream("./src/day23/test2.txt"))

type Position = { x: number, y: number, z: number }
type Radius = { radius: number }
type NanoPoint = { pos: Position, radius: Radius }

let points: Array<NanoPoint> = []

// pos=<1,3,1>, r=1
reader.on("line", (l: string) => {
    let tmp = l.split(" ")
    let radius = parseInt(tmp[1].split('r=')[1])
    // console.log(radius);

    let pos = tmp[0].split('pos=')[1].replace('<', '').replace('>', '').split(',')
    let x = parseInt(pos[0])
    let y = parseInt(pos[1])
    let z = parseInt(pos[2])
    // console.log(x + " " + y + " " + z)

    let position = { x: x, y: y, z: z }
    let r = { radius: radius }
    let nano: NanoPoint = { pos: position, radius: r }

    points.push(nano);
});

reader.on("close", () => {
    let t = new Date().getTime();

    console.log('Result: ' + start())

    console.log('Timing: ' + (new Date().getTime() - t) + ' ms');
})

function start(): number {
    // let nanoStart: Position = { x: 0, y: 0, z: 0 }
    // let radMax = nanoStart.radius.radius

    let xV = getX()
    let yV = getY()
    let zV = getZ()

    let counter = 0;
    let nanoPoint: NanoPoint
    let pos: Position

    for (let x = xV[0]; x <= xV[1]; x++) {
        for (let y = yV[0]; y <= yV[1]; y++) {
            for (let z = zV[0]; z <= xV[1]; z++) {
                let point: Position = { x: x, y: y, z: z }
                console.log(point)

                let countTmp = 0
                let nano: NanoPoint
                points.forEach(element => {
                    if (manhattanDistance(point, element.pos) < element.radius.radius) {
                        countTmp++
                        nano = element
                    }
                })

                if (counter < countTmp) {
                    counter = countTmp
                    pos = point

                    // console.log()
                }
            }
        }
    }

    return counter
}

function getMaxRadius(): NanoPoint {
    let max = Number.MIN_VALUE
    let result: NanoPoint
    points.forEach(element => {
        if (element.radius.radius > max) {
            max = element.radius.radius
            result = element
        }
    })

    return result
}

function manhattanDistance(point1: Position, point2: Position): number {
    return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y) + Math.abs(point1.z - point2.z)
}

function getX(): [number, number] {
    let max = Infinity
    let min = -Infinity
    points.forEach(element => {
        if (max < element.pos.x) {
            max = element.pos.x
        }

        if (min > element.pos.x) {
            min = element.pos.x
        }
    })

    return [max, min]
}

function getY(): [number, number] {
    let max = Infinity
    let min = -Infinity
    points.forEach(element => {
        if (max < element.pos.y) {
            max = element.pos.y
        }

        if (min > element.pos.y) {
            min = element.pos.y
        }
    })

    return [max, min]
}

function getZ(): [number, number] {
    let max = Infinity
    let min = -Infinity
    points.forEach(element => {
        if (max < element.pos.z) {
            max = element.pos.z
        }

        if (min > element.pos.z) {
            min = element.pos.z
        }
    })

    return [max, min]
}
