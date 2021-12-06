const fs = require('fs');

import {numberOfLanternFishNaive} from "./lanternfish";

describe('day6 - lanternfish', () => {

  describe('part 1', () => {

    test('example from exercise', () => {
      expect(numberOfLanternFishNaive([3, 4, 3, 1, 2], 18)).toEqual(26);
    });

    test('puzzle input', () => {
      const input = parseInput();
      expect(numberOfLanternFishNaive(input, 80)).toEqual(353274);
    });
  });

  describe('part 2', () => {

    test('example from exercise', () => {
      expect(numberOfLanternFishNaive([3, 4, 3, 1, 2], 256)).toEqual(26984457539);
    });

    test('puzzle input', () => {
      const input = parseInput();
      expect(numberOfLanternFishNaive(input, 80)).toEqual(0);
    });
  });

  function parseInput() {
    return fs.readFileSync(__dirname + '/input.txt')
      .toString()
      .split(",")
      .filter((n) => n)
      .map((n) => parseInt(n, 10));
  }
});
