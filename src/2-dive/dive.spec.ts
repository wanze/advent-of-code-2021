const fs = require('fs');

import {calculatePosition, calculatePositionWithAim} from "./dive";

describe('day2 - dive', () => {

  describe('part 1', () => {

    test('returns zero for empty list of commands', () => {
      expect(calculatePosition([])).toEqual(0);
    });

    test('example input from exercise', () => {
      const input = [
        'forward 5',
        'down 5',
        'forward 8',
        'up 3',
        'down 8',
        'forward 2',
      ]
      expect(calculatePosition(input)).toEqual(150);
    });

    test('puzzle input', () => {
      const input = parseInput();
      expect(calculatePosition(input)).toEqual(1654760);
    });
  });

  describe('part 2', () => {

    test('returns zero for empty list of commands', () => {
      expect(calculatePositionWithAim([])).toEqual(0);
    });

    test('example input from exercise', () => {
      const input = [
        'forward 5',
        'down 5',
        'forward 8',
        'up 3',
        'down 8',
        'forward 2',
      ]
      expect(calculatePositionWithAim(input)).toEqual(900);
    });

    test('puzzle input', () => {
      const input = parseInput();
      expect(calculatePositionWithAim(input)).toEqual(1956047400);
    });

  });

  function parseInput() {
    return fs.readFileSync(__dirname + '/input.txt')
      .toString()
      .split("\n");
  }
});
