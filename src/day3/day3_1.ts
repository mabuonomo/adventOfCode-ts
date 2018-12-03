import * as fs from 'fs';
import * as rd from 'readline'

var reader = rd.createInterface(fs.createReadStream("./src/day3/input.txt"))

var data: Array<{ id: string, left: number, top: number, w: number, h: number }> = [];
var matrix: Array<Array<string>> = [];

// #1 @ 53,238: 26x24
reader.on("line", (l: string) => {
    var tokens = l.split(' ');
    var id: string = tokens[0].trim();
    var left: number = parseInt(tokens[2].split(',')[0]);
    var top: number = parseInt(tokens[2].split(',')[1]);
    var w: number = parseInt(tokens[3].split('x')[0]);
    var h: number = parseInt(tokens[3].split('x')[1]);

    var token: { id: string, left: number, top: number, w: number, h: number } =
        { id: id, left: left, top: top, w: w, h: h };

    data.push(token);
})

reader.on("close", () => {
    console.log('Input size: ' + data.length);

    let overlap = 0;
    let overlapFull = 0;

    let countId = 0;

    data.forEach(square => {

        let idFinds: Array<string> = [];

        for (let i = square.left; i < square.left + square.w; i++) {
            for (let j = square.top; j < square.top + square.h; j++) {
                if (matrix[i] === undefined) {
                    matrix[i] = [];
                }

                if (matrix[i][j] !== undefined && idFinds.indexOf(matrix[i][j]) === -1) {
                    idFinds.push(matrix[i][j]);
                }

                if (matrix[i][j] !== undefined) {
                    overlapFull++;
                } else {
                    matrix[i][j] = square.id;
                    countId++;
                }
            }
        }

        overlap += idFinds.length;
    });

    // 118322 // part2 1178
    console.log('Result: ' + overlap);
    console.log('Result full: ' + overlapFull);
    console.log('Result Id: ' + countId);
    console.log('Diff ' + (countId - overlapFull));
})