import {flashesAfterSteps, stepAllOctopusesFlash} from "./dumbo-octopus";

const fs = require('fs');

describe('day11 - dumbo octopus', () => {

  describe('part 1 - number of flashes', () => {

    test('examples from exercise', () => {
      const octopuses = parseExampleInput();
      expect(flashesAfterSteps(octopuses, 100)).toEqual(1656);
    });

    test('puzzle input', () => {
      const octopuses = parsePuzzleInput();
      expect(flashesAfterSteps(octopuses, 100)).toEqual(1721);
    });
  });

  describe('part 2 - step where all octopuses flash together', () => {

    test('examples from exercise', () => {
      const input = parseExampleInput();
      expect(stepAllOctopusesFlash(input)).toEqual(195);
    });

    test('puzzle input', () => {
      const input = parsePuzzleInput();
      expect(stepAllOctopusesFlash(input)).toEqual(298);
    });
  });

  function parseExampleInput() {
    const input = "5483143223\n" +
      "2745854711\n" +
      "5264556173\n" +
      "6141336146\n" +
      "6357385478\n" +
      "4167524645\n" +
      "2176841721\n" +
      "6882881134\n" +
      "4846848554\n" +
      "5283751526";

    return parseInput(input);
  }

  function parseInput(input: string): number[][] {
    const rows = input.split("\n").filter(row => row);
    const grid: number[][] = new Array(rows.length);

    rows.forEach((row, i) => {
      grid[i] = row.split('').map(col => parseInt(col, 10));
    });

    return grid;
  }

  function parsePuzzleInput(): number[][] {
    const input = fs.readFileSync(__dirname + '/input.txt').toString();

    return parseInput(input);
  }
});
