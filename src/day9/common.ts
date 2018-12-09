import { NodeElm, Game } from "./types";

export function game(properties: Game): number {
    const res = [];
    for (let i = 1; i <= properties.players; i += 1) {
        res[i] = 0;
    }
    let currentPlayer = 1;

    let current: NodeElm = {
        value: 0,
    };
    current.next = current;
    current.prev = current;

    for (let i = 0; i < properties.marbles; i++) {
        if (i % 23 === 0) {
            res[currentPlayer] += i;
            current = current.prev!.prev!.prev!.prev!.prev!.prev!;
            res[currentPlayer] += current.prev!.value;
            current.prev!.prev!.next = current;
            current.prev = current.prev!.prev;

        } else {
            current = addAfter(i, current.next!);
        }
        currentPlayer = currentPlayer % properties.players + 1;
    }

    return Math.max(...Object.values(res));
}

function addAfter(value: number, marble: NodeElm) {
    let newNode: NodeElm = {
        value,
        prev: marble,
        next: marble.next,
    };
    
    marble.next!.prev = newNode;
    marble.next = newNode;

    return newNode;
}
