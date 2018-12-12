import * as fs from 'fs';
import * as rd from 'readline'

var reader = rd.createInterface(fs.createReadStream("./src/day12/input.txt"))

let lines: string[] = [];

reader.on("line", (l: string) => {
    lines.push(l);
});

reader.on("close", () => {
    let t = new Date().getTime();

    const notes: { [key: string]: string } = {}

    lines.slice(2, lines.length).forEach((line: string) => {
        const [scenario, next]: string[] = line.split(' => ')

        notes[scenario] = next
    })

    const runGenerations = (generationsCount: number): number => {
        let initialPotIndex = 0
        let state = RegExp(/initial state\: (.+)/).exec(lines[0])![1]

        for (let gen = 1; gen <= generationsCount; gen++) {
            state = '....' + state + '....'

            initialPotIndex += 4

            let nextState = state.replace(/\#/g, '.')

            for (const [scenario, next] of Object.entries(notes)) {
                for (let i = 0; i < state.length - 4; i++) {
                    if (state.substr(i, 5) === scenario) {
                        nextState = nextState.substring(0, i + 2) + next + nextState.substring(i + 3)
                    }
                }
            }

            state = nextState
        }

        return Array.from(state.split('').entries()).reduce((sum: number, [i, pot]: [number, string]) => {
            const potNum = i - initialPotIndex

            if (pot === '#') {
                sum += potNum
            }

            return sum

        }, 0)
    }

    console.log('Part A', runGenerations(20))

    // The pattern between generations is 81 over time
    console.log('Part B', runGenerations(50000000000));// + (50000000000 - 200) * 81)

    console.log('Timing: ' + (new Date().getTime() - t) + ' ms');
})