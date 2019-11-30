import * as fs from 'fs';
import * as rd from 'readline';
import { game } from './common';
import { Game } from './types';

var reader = rd.createInterface(fs.createReadStream('./src/2018/day9/input.txt'));
let properties: Game;

reader.on('line', (l: string) => {
  let tokens = l.split(' ');

  properties = { players: parseInt(tokens[0]), marbles: parseInt(tokens[6]) };
});

reader.on('close', () => {
  let t = new Date().getTime();
  console.log('Result: ' + game(properties));
  console.log('Timing: ' + (new Date().getTime() - t) + ' ms');
});
