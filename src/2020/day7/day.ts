import { InitAbstract } from '../init.abstract';
import { performanceLog } from 'decorators-utils-ts/dist/src';
import { parse } from 'path';
import { strict } from 'assert';
import { after, before, ceil, floor } from 'lodash';
import { empty } from 'fp-ts/lib/ReadonlyRecord';

type bags = { parent: string; leaf: Array<leaf> };
type leaf = { node: string; counter: number };

class Day1 extends InitAbstract {
  lines: Array<string>;
  constructor() {
    super();

    this.lines = this.getLines('day7', false);
  }

  bagsArr: Array<bags> = [];

  // PARENT vibrant cyan bags contain 4 dim tomato bags, LEAFS 1 dull green bag, 5 light silver bags, 2 striped gold bags.
  @performanceLog(true)
  runPart1() {
    this.buildBags();

    let findBag = 'shiny gold';

    let counter = 0;
    for (let bag of this.bagsArr) {
      if (this.findBag(bag.parent, findBag)) {
        counter++;
      }
    }

    return counter;
  }

  @performanceLog(true)
  runPart2() {
    let findBag = 'shiny gold';

    return this.findBagsInside(findBag);
  }

  buildBags() {
    this.lines.forEach((line) => {
      let parent = line.split('bags contain')[0].trim();

      let leafs: Array<leaf> = [];
      line
        .split('bags contain')[1]
        .split(',')
        .forEach((l) => {
          let split = l.split(' ').filter(String); // remove empty space
          let leaf: leaf = { node: (split[1] + ' ' + split[2]).trim(), counter: parseInt(split[0]) };
          if (!leaf.node.includes('other bags')) {
            leafs.push(leaf);
          }
        });

      this.bagsArr.push({
        parent: parent,
        leaf: leafs,
      });
    });
  }

  findBag(nodeName: string, findBag: string) {
    let node = this.bagsArr.find((el) => el.parent.includes(nodeName));

    let almost = false;
    for (let leaf of node.leaf) {
      if (leaf.node.includes(findBag) && leaf.counter > 0) {
        return true;
      }

      if (this.findBag(leaf.node, findBag)) {
        almost = true;
        break;
      }
    }

    return almost;
  }

  findBagsInside(nodeName: string) {
    let node = this.bagsArr.find((el) => el.parent.includes(nodeName));

    let counter = 0;
    for (let leaf of node.leaf) {
      counter += leaf.counter + leaf.counter * this.findBagsInside(leaf.node);
    }

    return counter;
  }
}

let day = new Day1();
day.runPart1();
day.runPart2();
