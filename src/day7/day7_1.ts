import * as fs from 'fs';
import * as rd from 'readline'

var reader = rd.createInterface(fs.createReadStream("./src/day7/input.txt"))

type Geo = { in: string, out: string };
let array: Array<Geo> = [];

reader.on("line", (l: string) => {
    var tokens = l.split(' ');

    let geo: Geo = { in: tokens[1], out: tokens[7] };
    array.push(geo);
});


reader.on("close", () => {
    let start = new Date().getTime();
    getStart(array);

    console.log('***Result');
    console.log(visited);

    let result = buildResult();
    console.log(result);

    console.log('Length: ' + result.length + " " + visited.length);
    console.log('Timing: ' + (new Date().getTime() - start));
})

let unlocked: Array<Geo> = [];
let visited: Array<Geo | undefined> = [];

function getStart(array: Array<Geo>): void {
    let geo: Array<Geo> = [];
    let result = '';

    array.forEach(elem => {
        let find = false;
        array.forEach(test => {
            if (test.in !== elem.in && elem.in === test.out) {
                find = true;
            }
        });

        if (!find) {
            geo.push(elem);
            unlocked.push(elem);
        }
    });

    geo.sort((one: Geo, two: Geo) => (one.out < two.out ? -1 : 1));

    if (geo.length > 0) {
        visited.push(geo[0]);
        walk();
    }
}

function walk(): void {
    console.log('***walk');
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