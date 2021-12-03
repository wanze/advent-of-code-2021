const fs = require('fs');

import { checkPowerConsumption, lifeSupportRating } from "./binary-diagnostic";

describe('day3 - binary diagnostic', () => {

  describe('part 1 - calculate power consumption', () => {

    test('returns zero for empty reports', () => {
      expect(checkPowerConsumption([])).toEqual(0);
    });

    test('example input from exercise', () => {
      const input = [
        '00100',
        '11110',
        '10110',
        '10111',
        '10101',
        '01111',
        '00111',
        '11100',
        '10000',
        '11001',
        '00010',
        '01010',
      ];
      expect(checkPowerConsumption(input)).toEqual(198);
    });

    test('puzzle input', () => {
      const input = parseInput();
      expect(checkPowerConsumption(input)).toEqual(2724524);
    });
  });

  describe('part 2 - life support rating', () => {

    test('returns zero for empty list of commands', () => {
      expect(lifeSupportRating([])).toEqual(0);
    });

    test('example input from exercise', () => {
      const input = [
        '00100',
        '11110',
        '10110',
        '10111',
        '10101',
        '01111',
        '00111',
        '11100',
        '10000',
        '11001',
        '00010',
        '01010',
      ];
      expect(lifeSupportRating(input)).toEqual(230);
    });

    test('puzzle input', () => {
      const input = parseInput();
      expect(lifeSupportRating(input)).toEqual(2775870);
    });
  });

  function parseInput() {
    return fs.readFileSync(__dirname + '/input.txt')
      .toString()
      .split("\n");
  }
});
