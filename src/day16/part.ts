let fss = require("fs");
let paths = require('path');
let filepaths = paths.join(__dirname, "./input.txt");

const ops = [
    (r, a, b, c) => { r[c] = r[a] + r[b] },
    (r, a, b, c) => { r[c] = r[a] + b },
    (r, a, b, c) => { r[c] = r[a] * r[b] },
    (r, a, b, c) => { r[c] = r[a] * b },
    (r, a, b, c) => { r[c] = r[a] & r[b] },
    (r, a, b, c) => { r[c] = r[a] & b },
    (r, a, b, c) => { r[c] = r[a] | r[b] },
    (r, a, b, c) => { r[c] = r[a] | b },
    (r, a, b, c) => { r[c] = r[a] },
    (r, a, b, c) => { r[c] = a },
    (r, a, b, c) => { r[c] = a > r[b] ? 1 : 0 },
    (r, a, b, c) => { r[c] = r[a] > b ? 1 : 0 },
    (r, a, b, c) => { r[c] = r[a] > r[b] ? 1 : 0 },
    (r, a, b, c) => { r[c] = a === r[b] ? 1 : 0 },
    (r, a, b, c) => { r[c] = r[a] === b ? 1 : 0 },
    (r, a, b, c) => { r[c] = r[a] === r[b] ? 1 : 0 }
]

let r = [0, 0, 0, 0]
let result = []
let count = 0

let possibilities = []
let pos = []
for (let i = 0; i < 16; i++) {
    pos.push(i)
}
for (let i = 0; i < 16; i++) {
    possibilities.push(new Set(pos))
}
let opcode = 0

for (const line of fss.readFileSync(filepaths, "utf-8").trimEnd().split('\n')) {
    let m = line.match(/Before: \[(\d+), (\d+), (\d+), (\d+)\]/)
    if (m) {
        r = m.slice(1).map(n => Number(n))
    }
    m = line.match(/^(\d+) (\d+) (\d+) (\d+)/)
    if (m) {
        m = m.slice(1).map(n => Number(n))
        opcode = m[0]
        result = []
        for (const op of ops) {
            let res = [...r]
            op(res, m[1], m[2], m[3])
            result.push(res)
        }
    }
    m = line.match(/After: *\[(\d+), (\d+), (\d+), (\d+)\]/)
    if (m) {
        const t = m.slice(1).map(n => Number(n))
        let c = 0
        let i = 0
        for (const res of result) {
            if (res.every((cur, idx) => cur === t[idx])) {
                c++
            } else {
                possibilities[opcode].delete(i)
            }
            i++
        }
        if (c >= 3) {
            count++
        }
    }
}

console.log(count)

let todo = new Set()
for (let i = 0; i < 16; i++) {
    todo.add(i)
}

let optable = []
while (todo.size > 0) {
    for (const i of todo) {
        if (possibilities[i].size === 1) {
            optable[i] = [...possibilities[i]][0]
            todo.delete(i)
            for (let j = 0; j < 16; j++) {
                possibilities[j].delete(optable[i])
            }
        }
    }
}

r = [0, 0, 0, 0]

fss = require("fs");
paths = require('path');
filepaths = paths.join(__dirname, "./input.txt");

for (const line of fss.readFileSync(filepaths, "utf-8").trimEnd().split('\n').slice(3343)) {
    const [, op, a, b, c] = line.match(/(\d+) (\d+) (\d+) (\d+)/).map(n => Number(n))
    ops[optable[op]](r, a, b, c)
}
console.log(r)