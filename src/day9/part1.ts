import * as fs from 'fs';
import * as rd from 'readline'

var reader = rd.createInterface(fs.createReadStream("./src/day9/input.txt"))

type Game = { players: number, marbles: number };
type Node = { value: number, next?: Node, prev?: Node };

let properties: Game;

reader.on("line", (l: string) => {
    let tokens = l.split(' ');

    properties = { players: parseInt(tokens[0]), marbles: parseInt(tokens[6]) };
});

reader.on("close", () => {
    let t = new Date().getTime();
    console.log('Result: ' + game());
    console.log('Timing: ' + (new Date().getTime() - t) + ' ms');
})

function game() {
    const scores = [];
    for (let i = 1; i <= properties.players; i += 1) {
        scores[i] = 0;
    }
    let currentPlayer = 1;

    let current: Node = {
        value: 0,
    };
    current.next = current;
    current.prev = current;

    for (let m = 1; m <= properties.marbles; m += 1) {
        if (m % 23 === 0) {
            scores[currentPlayer] += m;

            current = current.prev!.prev!.prev!.prev!.prev!.prev!;

            scores[currentPlayer] += current.prev!.value;
            current.prev!.prev!.next = current;
            current.prev = current.prev!.prev;

        } else {
            current = addAfter(m, current.next!);
        }
        currentPlayer = currentPlayer % properties.players + 1;
    }

    return Math.max(...Object.values(scores));
}

const addAfter = (value: number, marble: Node) => {
    const toAdd: Node = {
        value,
        prev: marble,
        next: marble.next,
    };
    marble.next!.prev = toAdd;
    marble.next = toAdd;
    return toAdd;
};
