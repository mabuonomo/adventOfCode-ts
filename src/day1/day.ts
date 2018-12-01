import * as fs from 'fs';
import * as rd from 'readline'

var reader = rd.createInterface(fs.createReadStream("input.txt"))

var data: Array<{ number: number; }> = [];
reader.on("line", (l: string) => {
    var tokens = l.split(' ');
    var nr = parseInt(tokens[0]);
    data.push({
        number: nr
    });
})

reader.on("close", () => {
    console.log(`Data has been read ${data.length}`);
    var value = 0;
    data.forEach(element => {
        value += element.number;
    });
    console.log('Result ' + value);
})