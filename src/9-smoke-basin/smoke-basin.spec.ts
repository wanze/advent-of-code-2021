const fs = require('fs');

import {largestBasinsScore, riskLevelLowPoints} from "./smoke-basin";

describe('day9 - smoke basin', () => {

  describe('part 1 - risk level of low points', () => {

    test('examples from exercise', () => {
      const map = parseExampleInput();
      expect(riskLevelLowPoints(map)).toEqual(15);
    });

    test('puzzle input', () => {
      const map = parsePuzzleInput();
      expect(riskLevelLowPoints(map)).toEqual(539);
    });
  });

  describe('part 2 - score of largest basins', () => {

    test('examples from exercise', () => {
      const map = parseExampleInput();
      expect(largestBasinsScore(map)).toEqual(1134);
    });

    test('puzzle input', () => {
      const map = parsePuzzleInput();
      expect(largestBasinsScore(map)).toEqual(0);
    });
  });

  function parseExampleInput() {
    const input = "2199943210\n" +
      "3987894921\n" +
      "9856789892\n" +
      "8767896789\n" +
      "9899965678"

    return parseInput(input);
  }

  function parseInput(input: string): number[][] {
    const rows = input.split("\n").filter(row => row);
    const map: number[][] = new Array(rows.length);

    rows.forEach((row, i) => {
      map[i] = row.split('').map(col => parseInt(col, 10));
    });

    return map;
  }

  function parsePuzzleInput(): number[][] {
    const input = fs.readFileSync(__dirname + '/input.txt').toString();

    return parseInput(input);
  }
});
