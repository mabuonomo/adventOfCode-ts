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
    console.log(array);

    array.sort((one: Geo, two: Geo) => (one.in != two.out ? -1 : 1));

    // console.log(array);
    let steps = array.length;
    let starts = getStart(array);

    // console.log(starts);
    // console.log(array);
    // let result = getNext(starts, array);
    // console.log('Result ' + result);
})

// function getNext(start: Array<Geo>, array: Array<Geo>): string {
//     let result = '';
//     let geo: Array<Geo> = [];

//     if (start.length == 0) {
//         return result;
//     }

//     start.forEach(element => {
//         result += element.in;

//         array.forEach(test => {
//             if (element.in !== test.in && element.out === test.in) {
//                 geo.push(test);
//             }
//         });
//     });

//     geo.sort((one: Geo, two: Geo) => (one.out < two.out ? -1 : 1));
//     geo.forEach(internal => {
//         result += internal.in;
//     });

//     console.log('**next result ' + result);
//     console.log(geo);
//     return getNext(geo, array);
// }

// let visited
function getStart(array: Array<Geo>): Geo | undefined {
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
            }
        }
    });

    geo.sort((one: Geo, two: Geo) => (one.out < two.out ? -1 : 1));

    // console.log("start");
    // console.log(geo);
    if (geo.length > 0) {
        geo[0].visited = true;
        result += geo[0].in;

        console.log('***');
        console.log('**' + geo[0].in + " " + geo[0].out)
        // console.log(geo[0]);
        console.log(array);
        // console.log(result);
        return getStart(array);
        // return geo[0];
    }

    return undefined;
}