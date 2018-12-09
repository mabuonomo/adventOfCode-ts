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

    array.forEach(geo => {

        for (let x = 0; x < getSize(array); x++) {
            for (let y = 0; y < getSize(array); y++) {
                if (matrix[x] === undefined) {
                    matrix[x] = [];
                }

                let here: Geo = { x: x, y: y, name: geo.name };
                let distance = manhattanDistance(here, geo);
                if (matrix[x][y] === undefined || matrix[x][y].distance >= distance) {

                    let geoCopy = { x: geo.x, y: geo.y, name: geo.name };
                    if (matrix[x][y] !== undefined && matrix[x][y].distance == distance) {
                        geoCopy.name = -1;
                    }

                    matrix[x][y] = { geo: geoCopy, distance: distance };

                }
            }
        }
    });

    // console.log(matrix);

    let counter = 0;
    let geoMax: Geo = { x: 0, y: 0, name: 0 };
    array.forEach(geo => {
        let occ = 0;
        let isBound = false;
        for (let x = 0; x < getSize(array); x++) {
            for (let y = 0; y < getSize(array); y++) {
                if (matrix[x][y].geo.name === geo.name) {
                    occ++;

                    if (x == 0 || y == 0 || x == getSize(array) - 1 || y == getSize(array) - 1) {
                        isBound = true;
                        break;
                    }
                }
            }

            if (isBound) {
                break;
            }
        }

        if (!isBound && occ > counter) {
            counter = occ;
            geoMax = geo;
        }
    });

    console.log('Geo ' + geoMax.x + ' ' + geoMax.y);
    console.log('Result: ' + counter);
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