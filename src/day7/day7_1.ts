import * as fs from 'fs';
import * as rd from 'readline'

var reader = rd.createInterface(fs.createReadStream("./src/day7/test.txt"))

type Geo = { in: string, out: string, visited: boolean };
let array: Array<Geo> = [];

reader.on("line", (l: string) => {
    var tokens = l.split(' ');

    let geo: Geo = { in: tokens[1], out: tokens[7], visited: false };
    array.push(geo);
});


reader.on("close", () => {
    getStart(array);

    console.log('***Result');
    console.log(visited);
    console.log(buildResult())
})

let unlocked: Array<Geo> = [];
let visited: Array<Geo | undefined> = [];

function getStart(array: Array<Geo>): void {
    let geo: Array<Geo> = [];
    let result = '';

    array.forEach(elem => {
        if (!elem.visited) {
            let find = false;
            array.forEach(test => {
                if (!test.visited && test.in !== elem.in && elem.in === test.out) {
                    find = true;
                }
            });

            if (!find) {
                // elem.visited = true;
                geo.push(elem);
                unlocked.push(elem);
            }
        }
    });

    geo.sort((one: Geo, two: Geo) => (one.out < two.out ? -1 : 1));

    if (geo.length > 0) {
        visited.push(geo[0]);
        walk();
    }
}

function walk(): void {
    console.log('***');
    console.log(unlocked);

    unlocked.sort((one: Geo, two: Geo) => (one.out < two.out ? -1 : 1));

    if (unlocked.length == 0) {
        return;
    }

    let unl = unlocked.shift();

    if (!visited.find((one: Geo | undefined) => one !== undefined && unl !== undefined && one.in == unl.in)) {
        visited.push(unl);
    }

    array.forEach(element => {
        if (unl !== undefined) {
            if (element.in == unl.out && !unlocked.find((one: Geo) => unl !== undefined && one.out == unl.out)) {
                unlocked.push(element);
            }
        }
    });

    return walk();
}

function buildResult(): string {
    let result = '';
    visited.forEach(element => {
        if (element != undefined) {
            result += element.in;
        }
    });

    let last = visited.pop();
    if (last !== undefined) {
        result += last.out;
    }

    return result;
}