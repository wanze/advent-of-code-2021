import {polymerString, leastMostCommonPolymerElements, polymerCounts, Rule} from "./extended-polymerization";

const fs = require('fs');

describe('day14 - extended polymerization', () => {

  describe('part 1', () => {

    test('polymer from example', () => {
      const { template, rules } = parseExampleInput();
      expect(polymerString(template, rules, 4)).toEqual('NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB');
    });

    test('polymer counts from example', () => {
      const { template, rules } = parseExampleInput();
      expect(polymerCounts(template, rules, 1)).toEqual({ 'N': 2, 'C': 2, 'B': 2, 'H': 1 });
      expect(polymerCounts(template, rules, 2)).toEqual({ 'N': 2, 'C': 4, 'B': 6, 'H': 1 });
      expect(polymerCounts(template, rules, 10)).toEqual({ 'N': 865, 'C': 298, 'B': 1749, 'H': 161 });
    });

    test('example from exercise', () => {
      const { template, rules } = parseExampleInput();
      const { least, most } = leastMostCommonPolymerElements(template, rules, 10);
      expect(most - least).toEqual(1588)
    });

    test('puzzle input', () => {
      const { template, rules } = parsePuzzleInput();
      const { least, most } = leastMostCommonPolymerElements(template, rules, 10);
      expect(most - least).toEqual(2345)
    });
  });

  describe('part 2', () => {
    test('example input', () => {
      const { template, rules } = parseExampleInput();
      const { least, most } = leastMostCommonPolymerElements(template, rules, 40);
      expect(most - least).toEqual(2188189693529)
    });

    test('puzzle input', () => {
      const { template, rules } = parsePuzzleInput();
      const { least, most } = leastMostCommonPolymerElements(template, rules, 40);
      expect(most - least).toEqual(2304722022017)
    });
  });

  function parseExampleInput() {
    const input = "NNCB\n" +
      "\n" +
      "CH -> B\n" +
      "HH -> N\n" +
      "CB -> H\n" +
      "NH -> C\n" +
      "HB -> C\n" +
      "HC -> B\n" +
      "HN -> C\n" +
      "NN -> C\n" +
      "BH -> H\n" +
      "NC -> B\n" +
      "NB -> B\n" +
      "BN -> B\n" +
      "BB -> N\n" +
      "BC -> B\n" +
      "CC -> N\n" +
      "CN -> C";

    return parseInput(input);
  }

  function parseInput(input: string): { template: string, rules: Rule[] } {
    const rows = input.split("\n").filter(row => row);
    const template = rows[0];
    const rules: Rule[] = [];

    rows.slice(1).forEach((row) => {
      const [pair, insertion] = row.split(' -> ');
      rules.push({ pair, insertion });
    });

    return { template, rules };
  }

  function parsePuzzleInput() {
    const input = fs.readFileSync(__dirname + '/input.txt').toString();

    return parseInput(input);
  }
});
