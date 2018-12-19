let fs = require("fs");
let path = require('path');

import { CarPosition } from "./CarPosition";

let filepath = path.join(__dirname, "./input.txt");
let lines = fs.readFileSync(filepath, "utf-8").split("\r\n");

function displayRoadMap(roadmap: Array<Array<string>>) {
    let rowIdx = 0;
    while (rowIdx < lines.length) {
        let rowDisplay = "";
        for (let colIdx = 0; colIdx < roadmap.length; colIdx++) {
            rowDisplay += roadmap[colIdx][rowIdx];
        }
        console.log(`${rowDisplay}`);
        rowIdx++;
    }
}

function elementIsCard(element: string) {
    return element == ">" || element == "<" || element == "^" || element == "v";
}

// INIT MAPROAD
let roadMap: Array<Array<string>> = [];
roadMap = Array(lines[0].length).fill(null).map(item => (new Array(lines.length).fill(" ")));
let roadMapNoCars: Array<Array<string>> = [];
roadMapNoCars = Array(lines[0].length).fill(null).map(item => (new Array(lines.length).fill(" ")));

let carsPositions: Array<CarPosition> = [];

// READ
let rowIdx = 0;
let cCard = 0;
for (let line of lines) {
    let lineParts = line.split('');
    for (let column = 0; column < lineParts.length; column++) {
        roadMap[column][rowIdx] = lineParts[column];
        roadMapNoCars[column][rowIdx] = lineParts[column].replace("^", "|").replace("v", "|").replace(">", "-").replace("<", "-");
        if (elementIsCard(lineParts[column])) {
            let newCar = new CarPosition(cCard++, lineParts[column], [column, rowIdx]);
            carsPositions.push(newCar);
        }
    }
    rowIdx++;
}

// 
function sortByPosition(a: CarPosition, b: CarPosition) {
    if (a.coordX == b.coordX) return a.coordY - b.coordY;
    return a.coordX - b.coordX;
}

let crashed = false;
let coordCrashed: Array<number> = []
let carsLeft = carsPositions.filter(_c => _c.isAlive).length;
crashed = false;
do {
    carsPositions = carsPositions.filter(_c => _c.isAlive).sort((a, b) => sortByPosition(a, b));

    for (let car of carsPositions) {
        let originCharacter = roadMapNoCars[car.coordX][car.coordY];
        roadMap[car.coordX][car.coordY] = originCharacter;
        let nextCoord = car.getNextCoordinate();
        car.coordX = nextCoord[0];
        car.coordY = nextCoord[1];
        let nextOriginCharacter = roadMapNoCars[nextCoord[0]][nextCoord[1]];
        car.setOrientation(nextOriginCharacter);
        if (nextOriginCharacter == "+") {
            car.numIntersections += 1;
        }
        let stateNextCoord = roadMap[nextCoord[0]][nextCoord[1]];
        if (stateNextCoord == "<" || stateNextCoord == ">" || stateNextCoord == "^" || stateNextCoord == "v") {
            let crashedCar = carsPositions.find(_c => _c.coordX == nextCoord[0] && _c.coordY == nextCoord[1] && _c.cardId != car.cardId);
            if (crashedCar != undefined) {
                roadMap[crashedCar.coordX][crashedCar.coordY] = roadMapNoCars[crashedCar.coordX][crashedCar.coordY];
                if (!crashed) {
                    coordCrashed = [car.coordX, car.coordY];
                    crashed = true;
                }
                car.isAlive = false;
                crashedCar.isAlive = false;
                carsPositions.splice(carsPositions.indexOf(car), 1);
                carsPositions.splice(carsPositions.indexOf(crashedCar), 1);
            }
        } else {
            roadMap[car.coordX][car.coordY] = car.state;
        }
    }
    // displayRoadMap(roadMap);
    carsLeft = carsPositions.filter(_c => _c.isAlive).length;
} while (carsLeft > 1);

let carSurvivor = carsPositions.find(_c => _c.isAlive);

if (carSurvivor != undefined) {
    console.log(`Part 1 crashed: ${coordCrashed.toString()}!`);
    console.log(`Part 2 survivor: ${carSurvivor.coordX},${carSurvivor.coordY}!`);
}