export type Point = {
  x: number;
  y: number;
}

export type Line = {
  p1: Point;
  p2: Point;
}

export function overlappingHorizontalVerticalLinesCount(lines: Line[]): number {
  const horizontalVerticalLines = lines.filter((line) => line.p1.x === line.p2.x || line.p1.y === line.p2.y);

  return overlappingLinesCount(horizontalVerticalLines);
}

export function overlappingLinesCount(lines: Line[]): number {
  const grid: { [pointCoords: string]: number } = {};

  lines.forEach((line) => {
    const points = pointsOnLine(line);
    points.forEach((point) => {
      const coords = `${point.x}/${point.y}`;
      grid[coords] = grid[coords] ? grid[coords] + 1 : 1;
    });
  });

  let count = 0;

  Object.values(grid).forEach((nIntersections) => {
    if (nIntersections >= 2) {
      count++;
    }
  })

  return count;
}

export function pointsOnLine(line: Line): Point[] {
  const dx = Math.abs(line.p2.x - line.p1.x);
  const dy = Math.abs(line.p2.y - line.p1.y);
  const fromX = Math.min(line.p1.x, line.p2.x);
  const fromY = Math.min(line.p1.y, line.p2.y);
  const isDiagonal = dx === dy;

  const points: Point[] = [];

  if (isDiagonal) {
    // line equation: y = mx + b
    const m = line.p1.x === line.p2.x ? null : (line.p2.y - line.p1.y) / (line.p2.x - line.p1.x);
    const b = m === null ? line.p1.x : line.p1.y - m * line.p1.x;

    // solve by y
    for (let x = fromX; x <= fromX + dx; x++) {
      const y = m * x + b;
      points.push({ x, y });
    }
  } else {
    for (let x = fromX; x <= fromX + dx; x++) {
      for (let y = fromY; y <= fromY + dy; y++) {
        points.push({ x, y });
      }
    }
  }

  return points;
}
