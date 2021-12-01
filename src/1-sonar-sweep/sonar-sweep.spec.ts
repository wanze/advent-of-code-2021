const fs = require('fs');

import { increasingMeasurements, increasingMeasurementsSlidingWindows } from "./sonar-sweep";

describe('sonar sweep', () => {
  describe('part 1 - single measurements', () => {
    test('returns zero for empty measurements', () => {
      expect(increasingMeasurements([])).toEqual(0);
    });

    test('returns zero for single measurement', () => {
      expect(increasingMeasurements([100])).toEqual(0);
    });

    test('returns zero for constant measurements', () => {
      expect(increasingMeasurements([5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5])).toEqual(0);
    });

    test('returns zero for only decreasing measurements', () => {
      expect(increasingMeasurements([3, 2, 1, 0, -1, -2, -3])).toEqual(0);
    });

    test('returns one for single increasing measurement', () => {
      expect(increasingMeasurements([10, 11, 10, 10, 9, 9, 8, 1, 0, -1])).toEqual(1);
    });

    test('example report from exercise', () => {
      const measurements = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
      expect(increasingMeasurements(measurements)).toEqual(7);
    });

    test('puzzle input', () => {
      const measurements = parseInput();
      expect(increasingMeasurements(measurements)).toEqual(1298);
    });
  });

  describe('part 2 - using sliding windows', () => {
    test('returns zero if number of measurements is less than 4', () => {
      expect(increasingMeasurementsSlidingWindows([1])).toEqual(0);
      expect(increasingMeasurementsSlidingWindows([1, 2])).toEqual(0);
      expect(increasingMeasurementsSlidingWindows([1, 2, 3])).toEqual(0);
    });

    test('returns count for more than 3 measurements', () => {
      expect(increasingMeasurementsSlidingWindows([1, 2, 3, 4])).toEqual(1);
    });

    test('example report from exercise', () => {
      const measurements = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
      expect(increasingMeasurementsSlidingWindows(measurements)).toEqual(5);
    });

    test('puzzle input', () => {
      const measurements = parseInput();
      expect(increasingMeasurementsSlidingWindows(measurements)).toEqual(1248);
    });
  });

  function parseInput() {
    const measurements = fs.readFileSync(__dirname + '/input.txt')
      .toString()
      .split("\n");

    return measurements.map((measurement: string) => parseInt(measurement, 10));
  }
});
