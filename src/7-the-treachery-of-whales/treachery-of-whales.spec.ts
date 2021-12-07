import {requiredFuelLinear, requiredFuelNonLinear} from "./treachery-of-whales";

const fs = require('fs');

describe('day7 - treachery of whales', () => {

  describe('part 1', () => {

    test('examples from exercise', () => {
      const horizontalPositions = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
      expect(requiredFuelLinear(horizontalPositions)).toEqual(37);
    });

    test('puzzle input', () => {
      const horizontalPositions = parseInput();
      expect(requiredFuelLinear(horizontalPositions)).toEqual(342641);
    });
  });

  describe('part 2', () => {

    test('examples from exercise', () => {
      const horizontalPositions = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
      expect(requiredFuelNonLinear(horizontalPositions)).toEqual(168);
    });

    test('puzzle input', () => {
      const horizontalPositions = parseInput();
      expect(requiredFuelNonLinear(horizontalPositions)).toEqual(93006301);
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
