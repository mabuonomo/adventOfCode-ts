import { NodeElm, Game } from "./types";

export function game(properties: Game): number {
    let res: Array<number> = new Array<number>(properties.players + 1);
    res.fill(0);

    let player = 1;

    let current: NodeElm = {
        value: 0,
    };
    current.next = current;
    current.prev = current;

    for (let i = 0; i < properties.marbles; i++) {
        if (i % 23 === 0) {
            res[player] += i;
            current = current.prev!.prev!.prev!.prev!.prev!.prev!;
            res[player] += current.prev!.value;
            current.prev!.prev!.next = current;
            current.prev = current.prev!.prev;
        } else {
            current = addNode(i, current.next!);
        }
        player = player % properties.players + 1;
    }

    return Math.max(...Object.values(res));
}

function addNode(value: number, marble: NodeElm) {
    let newNode: NodeElm = {
        value,
        prev: marble,
        next: marble.next,
    };

    marble.next!.prev = newNode;
    marble.next = newNode;

    return newNode;
}
