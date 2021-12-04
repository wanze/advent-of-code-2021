const fs = require('fs');

import {bingoScoreLoosingBoard, bingoScoreWinningBoard, Board} from "./giant-squid";

describe('day4 - giant squid', () => {

  describe('part 1 - score of winning board', () => {

    test('example input from exercise', () => {
      const { numbers, boards } = exampleInput();
      expect(bingoScoreWinningBoard(boards, numbers)).toEqual(4512);
    });

    test('puzzle input', () => {
      const { numbers, boards } = parseInput();
      expect(bingoScoreWinningBoard(boards, numbers)).toEqual(8580);
    });
  });

  describe('part 2 - score of loosing board', () => {

    test('example input from exercise', () => {
      const { numbers, boards } = exampleInput();
      expect(bingoScoreLoosingBoard(boards, numbers)).toEqual(1924);
    });

    test('puzzle input', () => {
      const { numbers, boards } = parseInput();
      expect(bingoScoreLoosingBoard(boards, numbers)).toEqual(9576);
    });
  });

  function exampleInput() {
    return {
      numbers: [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1],
      boards: [
        { numbers: [22, 13, 17, 11, 0, 8, 2, 23, 4, 24, 21, 9, 14, 16, 7, 6, 10, 3, 18, 5, 1, 12, 20, 15, 19] },
        { numbers: [3, 15, 0, 2, 22, 9, 18, 13, 17, 5, 19, 8, 7, 25, 23, 20, 11, 10, 24, 4, 14, 21, 16, 12, 6] },
        { numbers: [14, 21, 17, 24, 4, 10, 16, 15, 9, 19, 18, 8, 23, 26, 20, 22, 11, 13, 6, 5, 2, 0, 12, 3, 7] },
      ]
    };
  }

  function parseInput(): { numbers: number[], boards: Board[] } {
    const data = fs.readFileSync(__dirname + '/input.txt')
      .toString()
      .split("\n\n");

    const numbers = data[0].split(',').map((n) => parseInt(n, 10));

    const boards = data.slice(1).map((data) => {
      const numbers = data.split(/\s+/).filter((n) => n).map((n) => parseInt(n, 10));
      return { numbers };
    });

    return {
      numbers: numbers,
      boards: boards,
    };
  }
});
