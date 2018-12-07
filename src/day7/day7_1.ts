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

let last: Geo | undefined;

reader.on("close", () => {
    let start = new Date().getTime();
    last = getLast();

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

    geo.sort((one: Geo, two: Geo) => (one.in < two.in ? -1 : 1));

    if (geo.length > 0) {
        visited.push(geo[0]);
        walk();
    }
}

function walk(): void {
    console.log('***walk');

    // fra i due out seleziona quello minore
    unlocked.sort((one: Geo, two: Geo) => (one.out < two.out ? -1 : 1));
    console.log(unlocked);

    if (unlocked.length == 0) {
        return;
    }

    let unl = unlocked.shift();

    // aggiungo alla vista dei visitati solo se non esiste già
    if (!visited.find((one: Geo | undefined) => one !== undefined && unl !== undefined && one.in == unl.in)) {
        visited.push(unl);
    }

    array.forEach(element => {
        if (unl !== undefined) {
            if (element.in == unl.out && element.out !== unl.in &&
                !unlocked.find((one: Geo) => unl !== undefined && one.out == unl.out) &&
                last != undefined && element.in !== last.out
            ) {
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

    // let last = visited.pop();
    if (last !== undefined) {
        result += last.out;
    }

    return result;
}

function getLast(): Geo | undefined {
    let geo: Array<Geo> = [];

    array.forEach(elem => {
        let find = false;
        array.forEach(test => {
            if (test.in !== elem.in && elem.out === test.in) {
                find = true;
            }
        });

        if (!find) {
            geo.push(elem);
        }
    });

    geo.sort((one: Geo, two: Geo) => (one.in > two.in ? -1 : 1));

    // console.log("Last");
    // console.log(geo);

    return geo.shift();
}