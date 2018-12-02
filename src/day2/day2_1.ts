import * as fs from 'fs';
import * as rd from 'readline'
import { element, number } from 'prop-types';

var reader = rd.createInterface(fs.createReadStream("./src/day2/input.txt"))

var data: Array<{ value: string; }> = [];
reader.on("line", (l: string) => {
    var tokens = l.split(' ');
    var nr: string = tokens[0].trim();
    data.push({
        value: nr
    });
})

reader.on("close", () => {
    var occ_2 = 0;
    var occ_3 = 0;

    data.forEach(hash => {
        let occurency: [number, number] = redOccurrency(hash.value);

        occ_2 += occurency[0];
        occ_3 += occurency[1];
    });

    console.log("Occ 2: " + occ_2);
    console.log("Occ 3: " + occ_3);
    console.log("Result: " + (occ_2 * occ_3));
})

function redOccurrency(hash: string): [number, number] {
    let occ_2 = 0;
    let occ_3 = 0;

    for (let i = 0; i < hash.length; i++) {
        let char = hash[i];
        const regex = new RegExp(char, "g");
        const lengh = (hash.match(regex) || []).length;
        console.log(hash + " " + char + " " + lengh);

        if (lengh == 2) {
            occ_2 = 1;
        }

        if (lengh == 3) {
            occ_3 = 1;
        }

        if (occ_2 == 1 && occ_3 == 1) {
            break;
        }
    }

    return [occ_2, occ_3];
}