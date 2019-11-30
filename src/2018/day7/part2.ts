import * as fs from 'fs';
import * as rd from 'readline';

var reader = rd.createInterface(fs.createReadStream('./src/2018/day7/input.txt'));

let lines: Array<string> = [];

reader.on('line', (l: string) => {
  lines.push(l);
});

reader.on('close', () => {
  const dependencies: { [key: string]: string[] } = {};
  const steps: string[] = [];

  lines.forEach((line: string) => {
    const [, beforeStep, afterStep]: string[] = RegExp(
      /Step ([A-Z]) must be finished before step ([A-Z]) can begin/,
    ).exec(line)!;

    if (!dependencies.hasOwnProperty(afterStep)) {
      dependencies[afterStep] = [];
    }

    if (!dependencies.hasOwnProperty(beforeStep)) {
      dependencies[beforeStep] = [];
    }

    dependencies[afterStep].push(beforeStep);
  });

  const stepsCount = Object.keys(dependencies).length;

  interface Worker {
    endsAt: number | null;
    step: string | null;
  }

  const workersCount = 5;
  const stepDuration = 60;
  const workers: Worker[] = [];

  for (let i = 0; i < workersCount; i++) {
    workers.push({
      endsAt: null,
      step: null,
    });
  }

  let t = -1;

  while (steps.length < stepsCount) {
    t += 1;

    // Finish workers
    workers.forEach((worker: Worker, i: number) => {
      if (worker.step !== null && worker.endsAt === t) {
        steps.push(worker.step);

        delete dependencies[worker.step];

        Object.keys(dependencies).forEach((step: string) => {
          const index: number = dependencies[step].indexOf(worker.step!);

          if (index > -1) {
            dependencies[step].splice(index, 1);
          }
        });

        worker.endsAt = null;
        worker.step = null;

        workers.splice(i, 1, worker);
      }
    });

    const availableSteps: string[] = Object.entries(dependencies)
      .filter(([step, dependentSteps]: [string, string[]]) => {
        for (const worker of workers) {
          if (worker.step === step) {
            return false;
          }
        }

        return dependentSteps.length === 0;
      })
      .map(([step]: [string, string[]]) => step)
      .sort();

    // Use available workers
    workers.forEach((worker: Worker, i: number) => {
      if (availableSteps.length > 0 && worker.step === null) {
        const step = availableSteps.shift()!;

        worker.step = step;
        worker.endsAt = t + (step.charCodeAt(0) - 64) + stepDuration;

        workers.splice(i, 1, worker);
      }
    });
  }

  console.log(t);
});
