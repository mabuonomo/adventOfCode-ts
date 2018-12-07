import * as fs from 'fs';
import * as rd from 'readline'

var reader = rd.createInterface(fs.createReadStream("./src/day7/input.txt"))

type Geo = { in: string, out: string };
let lines: Array<string> = [];

reader.on("line", (l: string) => {
    lines.push(l);
});

let last: Geo | undefined;

reader.on("close", () => {

    const dependencies: { [key: string]: string[] } = {}
    const steps: string[] = []

    lines.forEach((line: string) => {
        const [, beforeStep, afterStep]: string[] = RegExp(/Step ([A-Z]) must be finished before step ([A-Z]) can begin/).exec(line)!

        if (!dependencies.hasOwnProperty(afterStep)) {
            dependencies[afterStep] = []
        }

        if (!dependencies.hasOwnProperty(beforeStep)) {
            dependencies[beforeStep] = []
        }

        dependencies[afterStep].push(beforeStep)
    })

    const stepsCount = Object.keys(dependencies).length

    while (steps.length < stepsCount) {
        const nextStep: string = Object.entries(dependencies).filter(([step, dependentSteps]: [string, string[]]) => {
            return dependentSteps.length === 0
        }).map(([step]: [string, string[]]) => step).sort()[0]

        steps.push(nextStep)

        delete dependencies[nextStep]

        Object.keys(dependencies).forEach((step: string) => {
            const index = dependencies[step].indexOf(nextStep)

            if (index > -1) {
                dependencies[step].splice(index, 1)
            }
        })
    }

    console.log(steps.join(''))
})
