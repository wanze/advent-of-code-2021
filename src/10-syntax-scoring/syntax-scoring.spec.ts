import {autocompleteScore, syntaxErrorScore} from "./syntax-scoring";

const fs = require('fs');

describe('day10 - syntax scoring', () => {

  describe('part 1 - syntax error score', () => {

    test('examples from exercise', () => {
      const input = parseExampleInput();
      expect(syntaxErrorScore(input)).toEqual(26397);
    });

    test('puzzle input', () => {
      const input = parsePuzzleInput();
      expect(syntaxErrorScore(input)).toEqual(462693);
    });
  });

  describe('part 2 - autocomplete score', () => {

    test('examples from exercise', () => {
      const input = parseExampleInput();
      expect(autocompleteScore(input)).toEqual(288957);
    });

    test('puzzle input', () => {
      const input = parsePuzzleInput();
      expect(autocompleteScore(input)).toEqual(3094671161);
    });
  });

  function parseExampleInput() {
    const input = "[({(<(())[]>[[{[]{<()<>>\n" +
      "[(()[<>])]({[<{<<[]>>(\n" +
      "{([(<{}[<>[]}>{[]{[(<()>\n" +
      "(((({<>}<{<{<>}{[]{[]{}\n" +
      "[[<[([]))<([[{}[[()]]]\n" +
      "[{[{({}]{}}([{[{{{}}([]\n" +
      "{<[[]]>}<{[{[{[]{()[[[]\n" +
      "[<(<(<(<{}))><([]([]()\n" +
      "<{([([[(<>()){}]>(<<{{\n" +
      "<{([{{}}[<[[[<>{}]]]>[]]";

    return parseInput(input);
  }

  function parseInput(input: string): string[] {
    return input.split("\n").filter(row => row);
  }

  function parsePuzzleInput(): string[] {
    const input = fs.readFileSync(__dirname + '/input.txt').toString();

    return parseInput(input);
  }
});
