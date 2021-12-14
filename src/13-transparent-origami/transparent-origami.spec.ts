import {Dot, FoldInstruction, numberOfDotsAfterFirstFold, printOrigami} from "./transparent-origami";

const fs = require('fs');

describe('day13 - transparent origami', () => {

  describe('part 1 - number of dots after single fold', () => {

    test('example from exercise', () => {
      const { dots, instructions } = parseExampleInput();
      expect(numberOfDotsAfterFirstFold(dots, instructions)).toEqual(17);
    });

    test('puzzle input', () => {
      const { dots, instructions } = parsePuzzleInput();
      expect(numberOfDotsAfterFirstFold(dots, instructions)).toEqual(827);
    });
  });

  describe('part 2 - print', () => {

    test('example from exercise', () => {
      const { dots, instructions } = parseExampleInput();
      expect(printOrigami(dots, instructions)).toEqual(
        '#####\n' +
        '#...#\n' +
        '#...#\n' +
        '#...#\n' +
        '#####');
    });

    test('puzzle input', () => {
      const { dots, instructions } = parsePuzzleInput();
      expect(printOrigami(dots, instructions)).toEqual(
        '####..##..#..#.#..#.###..####..##..###.\n' +
        '#....#..#.#..#.#.#..#..#.#....#..#.#..#\n' +
        '###..#..#.####.##...#..#.###..#....#..#\n' +
        '#....####.#..#.#.#..###..#....#....###.\n' +
        '#....#..#.#..#.#.#..#.#..#....#..#.#...\n' +
        '####.#..#.#..#.#..#.#..#.####..##..#...'
      );
    });
  });

  function parseExampleInput() {
    const input = "6,10\n" +
      "0,14\n" +
      "9,10\n" +
      "0,3\n" +
      "10,4\n" +
      "4,11\n" +
      "6,0\n" +
      "6,12\n" +
      "4,1\n" +
      "0,13\n" +
      "10,12\n" +
      "3,4\n" +
      "3,0\n" +
      "8,4\n" +
      "1,10\n" +
      "2,14\n" +
      "8,10\n" +
      "9,0\n" +
      "\n" +
      "fold along y=7\n" +
      "fold along x=5";

    return parseInput(input);
  }

  function parseInput(input: string): { dots: Dot[], instructions: FoldInstruction[] } {
    const rows = input.split("\n").filter(row => row);
    const dots: Dot[] = [];
    const instructions: FoldInstruction[] = [];

    rows.forEach((row) => {
      if (row.startsWith('fold')) {
        const [direction, line] = row.split(' ')[2].split('=');
        instructions.push({
          direction: direction as any,
          line: parseInt(line, 10)
        });
      } else {
        const [x, y] = row.split(',');
        dots.push({ x: parseInt(x, 10), y: parseInt(y, 10) });
      }
    });

    return { dots, instructions };
  }

  function parsePuzzleInput() {
    const input = fs.readFileSync(__dirname + '/input.txt').toString();

    return parseInput(input);
  }
});
