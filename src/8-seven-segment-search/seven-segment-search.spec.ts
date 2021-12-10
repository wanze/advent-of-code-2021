import {countUniqueDigits, NotesEntry, Segment} from "./seven-segment-search";

const fs = require('fs');

describe('day8 - seven segment search', () => {

  describe('part 1', () => {

    test('examples from exercise', () => {
      const entries = parseExampleInput();
      expect(countUniqueDigits(entries)).toEqual(26);
    });

    test('puzzle input', () => {
      const entries = parsePuzzleInput();
      expect(countUniqueDigits(entries)).toEqual(318);
    });
  });

  describe('part 2', () => {

    // test('examples from exercise', () => {
    //   const horizontalPositions = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];
    //   expect(requiredFuelNonLinear(horizontalPositions)).toEqual(168);
    // });
    //
    // test('puzzle input', () => {
    //   const horizontalPositions = parseInput();
    //   expect(requiredFuelNonLinear(horizontalPositions)).toEqual(93006301);
    // });
  });

  function parseExampleInput() {
    const input = "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe\n" +
      "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc\n" +
      "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg\n" +
      "fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb\n" +
      "aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea\n" +
      "fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb\n" +
      "dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe\n" +
      "bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef\n" +
      "egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb\n" +
      "gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce";

    return parseInput(input);
  }

  function parseInput(input: string): NotesEntry[] {
    const entries: NotesEntry[] = [];

    input
      .split("\n")
      .filter(l => l)
      .forEach((line) => {
        const [inputString, outputString ] = line.split(' | ');
        entries.push({
          signals: inputString.split(' ') as Segment[],
          outputs: outputString.split(' ') as Segment[],
        });
    });

    return entries;
  }

  function parsePuzzleInput(): NotesEntry[] {
    const input = fs.readFileSync(__dirname + '/input.txt').toString();

    return parseInput(input);
  }
});
