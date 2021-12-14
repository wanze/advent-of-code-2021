export type Dot = {
  x: number;
  y: number;
}

export type FoldInstruction = {
  direction: 'x' | 'y';
  line: number;
}

export function numberOfDotsAfterFirstFold(dots: Dot[], instructions: FoldInstruction[]): number {
  return numberOfDots(dots, instructions.slice(0, 1));
}

export function printOrigami(dots: Dot[], instructions: FoldInstruction[]): string {
  const foldedDots = fold(dots, instructions);

  let maxX = 0;
  let maxY = 0;

  foldedDots.forEach((dot) => {
    if (dot.x > maxX) {
      maxX = dot.x;
    }
    if (dot.y > maxY) {
      maxY = dot.y;
    }
  });

  let out = '';
  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      const dot = foldedDots.find(dot => dot.x === x && dot.y === y);
      out += dot ? '#' : '.';
    }
    out += y < maxY ? "\n" : '';
  }

  return out;
}

function fold(dots: Dot[], instructions: FoldInstruction[]): Dot[] {
  let foldedDots: Dot[] = [...dots];

  instructions.forEach((fold) => {
    foldedDots.forEach((dot) => {
      if (fold.direction === 'y') {
        if (dot.y > fold.line) {
          const diff = dot.y - fold.line;
          dot.y = fold.line - diff;
        }
      } else if (fold.direction === 'x') {
        if (dot.x > fold.line) {
          const diff = dot.x - fold.line;
          dot.x = fold.line - diff;
        }
      }
    });

    const uniqueDots = [...new Set(foldedDots.map(dot => `${dot.x},${dot.y}`))];
    foldedDots = uniqueDots.map((coords) => {
      const [x, y] = coords.split(',');
      return { x: parseInt(x, 10), y: parseInt(y, 10) };
    });
  });

  return foldedDots;
}

function numberOfDots(dots: Dot[], instructions: FoldInstruction[]): number {
  const foldedDots = fold(dots, instructions);

  return foldedDots.length;
}
