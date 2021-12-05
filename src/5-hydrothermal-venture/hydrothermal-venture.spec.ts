const fs = require('fs');

import {
  Line,
  overlappingHorizontalVerticalLinesCount,
  overlappingLinesCount,
  pointsOnLine
} from "./hydrothermal-venture";

describe('day5 - hydrothermal venture', () => {

  describe('points on line', () => {
    test('line with same start and end point includes only this point', () => {
      const line1 = { p1: { x: 0, y: 0}, p2: { x: 0, y: 0} };
      const line2 = { p1: { x: 3, y: 3}, p2: { x: 3, y: 3} };

      expect(pointsOnLine(line1)).toEqual([{ x: 0, y: 0 }]);
      expect(pointsOnLine(line2)).toEqual([{ x: 3, y: 3 }]);
    });

    test('vertical line', () => {
      const line = { p1: { x: 1, y: 1}, p2: { x: 1, y: 3} };

      expect(pointsOnLine(line)).toEqual([
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
      ]);
    });

    test('horizontal line', () => {
      const line = { p1: { x: 9, y: 7}, p2: { x: 7, y: 7} };

      expect(pointsOnLine(line)).toEqual([
        { x: 7, y: 7},
        { x: 8, y: 7},
        { x: 9, y: 7},
      ]);
    });

    test('diagonal lines', () => {
      const line1 = { p1: { x: 1, y: 1}, p2: { x: 3, y: 3} };
      const line2 = { p1: { x: 9, y: 7}, p2: { x: 7, y: 9} };

      expect(pointsOnLine(line1)).toEqual([
        { x: 1, y: 1},
        { x: 2, y: 2},
        { x: 3, y: 3},
      ]);
      expect(pointsOnLine(line2)).toEqual([
        { x: 7, y: 9},
        { x: 8, y: 8},
        { x: 9, y: 7},
      ]);
    });
  });

  describe('part 1', () => {

    test('example input from exercise', () => {
      const lines = exampleInput();
      expect(overlappingHorizontalVerticalLinesCount(lines)).toEqual(5);
    });

    test('puzzle input', () => {
      const lines = puzzleInput();
      expect(overlappingHorizontalVerticalLinesCount(lines)).toEqual(5835);
    });
  });

  describe('part 2', () => {

    test('example input from exercise', () => {
      const lines = exampleInput();
      expect(overlappingLinesCount(lines)).toEqual(12);
    });

    test('puzzle input', () => {
      const lines = puzzleInput();
      expect(overlappingLinesCount(lines)).toEqual(17013);
    });
  });

  function puzzleInput(): Line[] {
    const input = fs.readFileSync(__dirname + '/input.txt').toString();

    return parseInput(input);
  }

  function exampleInput(): Line[] {
    const input =
      '0,9 -> 5,9\n' +
      '8,0 -> 0,8\n' +
      '9,4 -> 3,4\n' +
      '2,2 -> 2,1\n' +
      '7,0 -> 7,4\n' +
      '6,4 -> 2,0\n' +
      '0,9 -> 2,9\n' +
      '3,4 -> 1,4\n' +
      '0,0 -> 8,8\n' +
      '5,5 -> 8,2';

    return parseInput(input);
  }

  function parseInput(input: string): Line[] {
    return input.split("\n")
      .filter((l) => l)
      .map((l) => {
        const [p1, p2] = l.split(' -> ');
        const [p1x, p1y] = p1.split(',');
        const [p2x, p2y] = p2.split(',');

        return {
          p1: { x: parseInt(p1x, 10), y: parseInt(p1y, 10) },
          p2: { x: parseInt(p2x, 10), y: parseInt(p2y, 10) },
        }
    });
  }
});
