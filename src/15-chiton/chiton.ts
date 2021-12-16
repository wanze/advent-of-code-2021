type Position = { x: number, y: number }

export function lowestTotalRisk(map: number[][]): number {
  const allPaths: Array<Position[]> = [];
  const maxY = map.length - 1;
  const maxX = map[0].length - 1;

  findPathsRecursive(0, 0, null, []);

  let lowestRisk = 1000000000000;

  allPaths.forEach((path) => {
    let risk = 0;
    path.forEach((path) => {
      risk += map[path.y][path.x];
    });
    if (risk < lowestRisk) {
      lowestRisk = risk;
    }
  });

  return lowestRisk;

  function findPathsRecursive(x: number, y: number, prevPos: Position|null, path: Position[]) {
    const visited = path.find(pos => pos.x === x && pos.y === y);
    if (visited) {
      return;
    }

    if (x === maxX && y === maxY) {
      allPaths.push(path);
      return;
    }

    const pos = { x, y };

    path.push(pos);

    // if ((x - 1) >= 0 && (prevPos && prevPos.x !== (x - 1))) {
    //   findPathsRecursive(x - 1, y, pos, [...path]);
    // }
    if ((x + 1) <= maxX && (prevPos && prevPos.x !== (x + 1))) {
      findPathsRecursive(x + 1, y, pos, [...path]);
    }
    if ((y + 1) <= maxY) {
      findPathsRecursive(x, y + 1,pos,  [...path]);
    }
  }
}
