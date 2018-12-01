import * as fs from 'fs';
import * as rd from 'readline'

var reader = rd.createInterface(fs.createReadStream("input1_2.txt"))

var data: Array<{ number: number; }> = [];
reader.on("line", (l: string) => {
    var tokens = l.split(' ');
    var nr = parseInt(tokens[0]);
    data.push({
        number: nr
    });
})

reader.on("close", () => {
    var value = 0;
    var frequency = Array<number>();
    var result = 0;

    result = readNumbers(value, frequency);

    console.log('Result ' + result);
})

function readNumbers(value: number, frequency: Array<number>): number {
    var result = null;
    data.forEach(element => {
        value += element.number;
        frequency.push(value);

        if (frequency.indexOf(value) >= 0) {
            result = value;
        }
    });
    
    if (result == null) {
        result = readNumbers(value, frequency);
    }

    return result;
}
