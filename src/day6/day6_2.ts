import * as fs from 'fs';
import * as rd from 'readline'

var reader = rd.createInterface(fs.createReadStream("./src/day6/input.txt"))

type Geo = { x: number, y: number, name: number };
let array: Array<Geo> = [];
let matrix: Array<Array<GeoMstrix>> = [];

type GeoMstrix = { geo: Geo, distance: number };

reader.on("line", (l: string) => {
    var tokens = l.split(',');

    let name = new Date().getTime() + Math.random();
    let geo: Geo = { x: parseInt(tokens[0]), y: parseInt(tokens[1]), name: name };
    array.push(geo);
});


reader.on("close", () => {

    let points = 0;
    for (let x = 0; x < getSize(array); x++) {
        for (let y = 0; y < getSize(array); y++) {
            let sum = 0;
            let geo: Geo = { x: x, y: y, name: new Date().getTime() + Math.random() };
            array.forEach(geoTest => {
                if (geoTest.name !== geo.name) {
                    sum += manhattanDistance(geoTest, geo);
                }
            });

            if (sum < 10000) {
                points++;
            }
        };
    }
    console.log('Points: ' + points);
})

function manhattanDistance(point1: Geo, point2: Geo) {
    return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
}

function getSize(data: Array<Geo>) {
    return getMaxX(data) > getMaxY(data) ? getMaxX(data) : getMaxY(data);
}

function getMaxX(data: Array<Geo>) {
    let x = 0;
    data.forEach(element => {
        if (element.x > x) {
            x = element.x;
        }
    });
    return x;
}

function getMaxY(data: Array<Geo>) {
    let y = 0;
    data.forEach(element => {
        if (element.y > y) {
            y = element.y;
        }
    });
    return y;
}