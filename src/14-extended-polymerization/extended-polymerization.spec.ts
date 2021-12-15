import {getPolymer, leastMostCommonPolymerElements, Rule} from "./extended-polymerization";

const fs = require('fs');

describe('day14 - extended polymerization', () => {

  describe('part 1', () => {

    test('example polymer from exercise', () => {
      const { template, rules } = parseExampleInput();
      expect(getPolymer(template, rules, 4)).toEqual('NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB');
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
    test('puzzle input', () => {
      const { template, rules } = parsePuzzleInput();
      const { least, most } = leastMostCommonPolymerElements(template, rules, 40);
      expect(most - least).toEqual(0)
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
