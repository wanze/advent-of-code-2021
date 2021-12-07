type Counts = { [position: number]: number };

export function requiredFuelLinear(horizontalPositions: number[]): number {
  return requiredFuel(horizontalPositions, (diff) => diff);
}

export function requiredFuelNonLinear(horizontalPositions: number[]): number {
  return requiredFuel(horizontalPositions, (diff) => {
      let step = 0;
      for (let i = 1; i <= diff; i++) {
        step += i;
      }
      return step;
  });
}

function requiredFuel(horizontalPositions: number[], stepFactor: (positionDiff: number) => number): number {
  let { counts, minPos, maxPos } = getCountsAndMinMaxPositions(horizontalPositions);
  let minFuel = 0;

  for (let pos = minPos; pos <= maxPos; pos++) {
    let fuel = 0;
    for (let otherPos = minPos; otherPos <= maxPos; otherPos++) {
      if (pos === otherPos || !counts[otherPos]) {
        continue;
      }

      const positionDiff = Math.abs(pos - otherPos);
      fuel += stepFactor(positionDiff) * counts[otherPos];
    }
    if (minFuel === 0 || fuel < minFuel) {
      minFuel = fuel;
    }
  }

  return minFuel;
}

function getCountsAndMinMaxPositions(horizontalPositions: number[]): { counts: Counts, minPos: number, maxPos: number } {
  const counts : { [position: number]: number } = {};
  let maxPos = 0;
  let minPos = 1000000000;

  horizontalPositions.forEach((pos) => {
    if (pos > maxPos) {
      maxPos = pos;
    }
    if (pos < minPos ) {
      minPos = pos;
    }

    if (pos in counts) {
      counts[pos] += 1;
    } else {
      counts[pos] = 1;
    }
  });

  return { counts, minPos, maxPos };
}
