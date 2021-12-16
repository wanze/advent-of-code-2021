import {lowestTotalRisk} from "./chiton";

const fs = require('fs');

describe('day15 - chiton', () => {

  describe('part 1 - lowest risk level', () => {

    test('example from exercise', () => {
      const map = parseExampleInput();
      expect(lowestTotalRisk(map)).toEqual(40);
    });

    test('puzzle input', () => {
      const map = parsePuzzleInput();
      expect(lowestTotalRisk(map)).toEqual(0);
    });
  });
  
  function parseExampleInput() {
    const input = "1163751742\n" +
      "1381373672\n" +
      "2136511328\n" +
      "3694931569\n" +
      "7463417111\n" +
      "1319128137\n" +
      "1359912421\n" +
      "3125421639\n" +
      "1293138521\n" +
      "2311944581";

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

  function parsePuzzleInput() {
    const input = fs.readFileSync(__dirname + '/input.txt').toString();

    return parseInput(input);
  }
});
