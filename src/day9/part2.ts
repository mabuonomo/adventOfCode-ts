import * as fs from 'fs';
import * as rd from 'readline'

var reader = rd.createInterface(fs.createReadStream("./src/day9/input.txt"))

type Game = { players: number, marbles: number };
type Node = { value: number, next: Node, prev?: Node };

let properties: Game;

reader.on("line", (l: string) => {
    let tokens = l.split(' ');

    properties = { players: parseInt(tokens[0]), marbles: parseInt(tokens[6]) * 100 };
});

reader.on("close", () => {
    let t = new Date().getTime();
    console.log('Result: ' + game());
    console.log('Timing: ' + (new Date().getTime() - t) + ' ms');
})

function game() {
    const marbles = [0, 2, 1];
    const players = new Uint32Array(properties.players);
    let marbleIndex = 1;
    players.fill(0);

    for (let i = 3; i <= properties.marbles; i++) {
        if (!(i % 10000)) console.log(i);
        if (i % 23) {
            marbleIndex += 2;
            if (marbleIndex > marbles.length) marbleIndex -= marbles.length;
            marbles.splice(marbleIndex, 0, i);
        } else {
            let removeIndex = marbleIndex - 7;
            if (removeIndex < 0) removeIndex += marbles.length;
            players[i % properties.players] += i + marbles[removeIndex];
            marbles.splice(removeIndex, 1);
            marbleIndex = removeIndex;
        }
    }

    // 400493
    return Math.max(...players);
}
