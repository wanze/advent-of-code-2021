type Point = {
  x: number;
  y: number;
  height: number;
}

export function riskLevelLowPoints(map: number[][]): number {
  const lowPoints = getLowPoints(map);

  let riskLevel = 0;
  lowPoints.forEach((point) => {
    riskLevel += 1 + point.height;
  });

  return riskLevel;
}

export function largestBasinsScore(map: number[][]): number {
  const lowPoints = getLowPoints(map);

  const basins: Array<Point[]> = [];

  lowPoints.forEach((lowPoint) => {
    const basin: Point[] = findBasin(lowPoint);
    basins.push(basin);
  });

  const largestBasins = basins.sort((a, b) => b.length - a.length).slice(0, 3);

  let score = 1;
  largestBasins.forEach((basin) => {
    score = score * basin.length;
  });

  return score;

  function findBasin(lowPoint: Point) {
    const basin: Point[] = [lowPoint];

    let { x, y } = lowPoint;

    findBasinRecursive(lowPoint, x, y - 1, basin);
    findBasinRecursive(lowPoint, x + 1, y, basin);
    findBasinRecursive(lowPoint, x, y + 1, basin);
    findBasinRecursive(lowPoint, x - 1, y, basin);

    return basin;
  }

  function findBasinRecursive(prevPoint: Point, x: number, y: number, basin: Point[]) {
    if (x < 0 || y < 0 || x >= map[0].length || y >= map.length) {
      return;
    }

    const height = map[y][x];

    if (height > 8) {
      return;
    }

    const requiredHeight = prevPoint.height + 1;
    if (height !== requiredHeight) {
      return;
    }

    const visited = basin.find(p => p.x === x && p.y === y);
    if (visited) {
      return;
    }

    const point = { x, y, height };

    basin.push(point);

    // Search in all directions.
    findBasinRecursive(point, x, y - 1, basin);
    findBasinRecursive(point, x + 1, y, basin);
    findBasinRecursive(point, x, y + 1, basin);
    findBasinRecursive(point, x - 1, y, basin);
  }
}

function getLowPoints(map: number[][]): Point[] {
  const lowPoints: Point[] = [];
  const nCols = map[0].length;
  const nRows = map.length;

  for (let y = 0; y < nRows; y++) {
    for (let x = 0; x < nCols; x++) {
      const height = map[y][x];
      if (y > 0 && map[y - 1][x] <= height) {
        continue;
      }
      if ((x < (nCols - 1)) && map[y][x + 1] <= height) {
        continue;
      }
      if ((y < nRows - 1) && map[y + 1][x] <= height) {
        continue;
      }
      if (x > 0 && map[y][x - 1] <= height) {
        continue;
      }

      lowPoints.push({ x, y, height });
    }
  }

  return lowPoints;
}
