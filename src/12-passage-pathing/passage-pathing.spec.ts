import {Cave, pathsCount, pathsCountMultipleVisits} from "./passage-pathing";

const fs = require('fs');

describe('day12 - passage pathing', () => {

  describe('part 1', () => {

    test('example1 from exercise', () => {
      const caves = parseExample1Input();
      expect(pathsCount(caves)).toEqual(10);
    });

    test('example2 from exercise', () => {
      const caves = parseExample2Input();
      expect(pathsCount(caves)).toEqual(19);
    });

    test('example3 from exercise', () => {
      const caves = parseExample3Input();
      expect(pathsCount(caves)).toEqual(226);
    });

    test('puzzle input', () => {
      const caves = parsePuzzleInput();
      expect(pathsCount(caves)).toEqual(3298);
    });
  });

  describe('part 2 - visiting small caves twice', () => {

    test('example1 from exercise', () => {
      const caves = parseExample1Input();
      expect(pathsCountMultipleVisits(caves)).toEqual(36);
    });

    test('example2 from exercise', () => {
      const caves = parseExample2Input();
      expect(pathsCountMultipleVisits(caves)).toEqual(103);
    });

    test('example3 from exercise', () => {
      const caves = parseExample3Input();
      expect(pathsCountMultipleVisits(caves)).toEqual(3509);
    });

    test('puzzle input', () => {
      const caves = parsePuzzleInput();
      expect(pathsCountMultipleVisits(caves)).toEqual(93572);
    });
  });

  function parseExample1Input(): Cave[] {
    const input = "start-A\n" +
      "start-b\n" +
      "A-c\n" +
      "A-b\n" +
      "b-d\n" +
      "A-end\n" +
      "b-end";

    return parseInput(input);
  }

  function parseExample2Input(): Cave[] {
    const input = "dc-end\n" +
      "HN-start\n" +
      "start-kj\n" +
      "dc-start\n" +
      "dc-HN\n" +
      "LN-dc\n" +
      "HN-end\n" +
      "kj-sa\n" +
      "kj-HN\n" +
      "kj-dc";

    return parseInput(input);
  }

  function parseExample3Input(): Cave[] {
    const input = "fs-end\n" +
      "he-DX\n" +
      "fs-he\n" +
      "start-DX\n" +
      "pj-DX\n" +
      "end-zg\n" +
      "zg-sl\n" +
      "zg-pj\n" +
      "pj-he\n" +
      "RW-he\n" +
      "fs-DX\n" +
      "pj-RW\n" +
      "zg-RW\n" +
      "start-pj\n" +
      "he-WI\n" +
      "zg-he\n" +
      "pj-fs\n" +
      "start-RW";

    return parseInput(input);
  }

  function parseInput(input: string): Cave[] {
    const rows = input.split("\n").filter(row => row);
    const caves: Cave[] = [];

    rows.forEach((row) => {
      const [from, to] = row.split('-');
      const cave1 = caves.find(cave => cave.name === from) || { name: from, caves: [] };
      const cave2 = caves.find(cave => cave.name === to) || { name: to, caves: [] };
      cave1.caves.push(cave2);
      cave2.caves.push(cave1);
      if (!caves.find(cave => cave.name === from)) {
        caves.push(cave1);
      }
      if (!caves.find(cave => cave.name === to)) {
        caves.push(cave2);
      }
    });

    return caves;
  }

  function parsePuzzleInput(): Cave[] {
    const input = fs.readFileSync(__dirname + '/input.txt').toString();

    return parseInput(input);
  }
});
