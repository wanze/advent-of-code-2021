export function flashesAfterSteps(octopuses: number[][], steps: number): number {
  let nFlashes = 0;

  for (let step = 0; step < steps; step++) {
    const flashPositions: Array<{x: number, y: number}> = [];
    for (let y = 0; y < 10; y ++) {
      for (let x = 0; x < 10; x++) {
        const energy = octopuses[y][x];
        if (energy < 9) {
          octopuses[y][x] += 1;
        } else if (energy === 9) {
          flashPositions.push({ x, y });
        }
      }
    }

    flashPositions.forEach((pos) => {
      flashRecursive(pos.x, pos.y);
    });
  }

  return nFlashes;

  function flashRecursive(x: number, y: number) {
    if (x < 0 || y < 0 || x > 9 || y > 9) {
      return;
    }

    const energy = octopuses[y][x];

    if (energy === 0) {
      return;
    }

    if (energy === 9) {
      octopuses[y][x] = 0;
      nFlashes++;
      flashRecursive(x - 1, y - 1);
      flashRecursive(x, y - 1);
      flashRecursive(x + 1, y - 1);
      flashRecursive(x - 1, y);
      flashRecursive(x + 1, y);
      flashRecursive(x - 1, y + 1);
      flashRecursive(x, y + 1);
      flashRecursive(x + 1, y + 1);
    } else {
      octopuses[y][x] += 1;
    }
  }
}

export function stepAllOctopusesFlash(octopuses: number[][]): number {
  let currentStep = 0;
  let nFlashes = 0;

  while (nFlashes !== 100) {
    const flashPositions: Array<{x: number, y: number}> = [];
    for (let y = 0; y < 10; y ++) {
      for (let x = 0; x < 10; x++) {
        const energy = octopuses[y][x];
        if (energy < 9) {
          octopuses[y][x] += 1;
        } else if (energy === 9) {
          flashPositions.push({ x, y });
        }
      }
    }

    nFlashes = 0;
    flashPositions.forEach((pos) => {
      nFlashes += flashRecursive(pos.x, pos.y);
    });

    currentStep++;
  }

  return currentStep;

  function flashRecursive(x: number, y: number): number {
    if (x < 0 || y < 0 || x > 9 || y > 9) {
      return 0;
    }

    const energy = octopuses[y][x];

    if (energy === 0) {
      return 0;
    }

    let nFlashes = 0;

    if (energy === 9) {
      octopuses[y][x] = 0;
      nFlashes++;
      nFlashes += flashRecursive(x - 1, y - 1);
      nFlashes += flashRecursive(x, y - 1);
      nFlashes += flashRecursive(x + 1, y - 1);
      nFlashes += flashRecursive(x - 1, y);
      nFlashes += flashRecursive(x + 1, y);
      nFlashes += flashRecursive(x - 1, y + 1);
      nFlashes += flashRecursive(x, y + 1);
      nFlashes += flashRecursive(x + 1, y + 1);
    } else {
      octopuses[y][x] += 1;
    }

    return nFlashes;
  }
}
