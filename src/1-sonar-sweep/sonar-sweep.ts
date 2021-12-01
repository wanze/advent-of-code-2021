export function increasingMeasurements(measurements: number[]): number {
  if (measurements.length <= 1) {
    return 0;
  }

  let count = 0;
  let previousMeasurement = measurements[0];

  for (let i = 1; i < measurements.length; i++) {
    const currentMeasurement = measurements[i];
    if (currentMeasurement > previousMeasurement) {
      count++;
    }
    previousMeasurement = currentMeasurement;
  }

  return count;
}

export function increasingMeasurementsSlidingWindows(measurements: number[]): number {
  const windowSize = 3;

  if (measurements.length <= windowSize) {
    return 0;
  }

  let count = 0;
  let previousSum: null|number = null;

  for (let i = 1; i < measurements.length - 1; i++) {
    const currentSum = measurements[i - 1] + measurements[i] + measurements[i + 1];
    if (previousSum !== null && currentSum > previousSum) {
      count++;
    }
    previousSum = currentSum;
  }

  return count;
}
