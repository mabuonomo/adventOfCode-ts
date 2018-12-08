import * as fs from 'fs';
import * as rd from 'readline'

var reader = rd.createInterface(fs.createReadStream("./src/day8/input.txt"))

let lines: Array<number> = [];

reader.on("line", (l: string) => {
    let tokens = l.split(' ');

    tokens.forEach(element => {
        lines.push(parseInt(element));
    });
});

reader.on("close", () => {
    let t = new Date().getTime();
    console.log('Result ' + walk());
    console.log('Timing: ' + (new Date().getTime() - t) + ' ms');
})

function walk() {
    let res = 0;

    // childs numbers
    const count = lines.shift();
    // metas numbers
    const meta = lines.shift();

    if (count !== undefined && meta != undefined) {
        for (let i = 0; i < count; i++) {
            res += walk();
        }

        for (let i = 0; i < meta; i++) {
            let t = lines.shift();

            if (t !== undefined) {
                res += t;
            }
        }
    }

    return res;
}