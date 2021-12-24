const { PriorityQueue } = require('dsa.js');

type Node = {
  x: number;
  y: number;
}

export function lowestTotalRiskDijkstra(matrix: number[][]): number {
  const maxX = matrix[0].length - 1;
  const maxY = matrix.length - 1;
  const queue = new PriorityQueue();
  const visited: Node[] = [];

  const startNode: Node = { x: 0, y: 0 };
  queue.enqueue([0, startNode]);

  while (queue.size > 0) {
    const [risk, node]: [risk: number, node: Node] = queue.dequeue();
    if (node.x === maxX && node.y === maxY) {
      return risk;
    }

    if (visited.find(n => n.x === node.x && n.y === node.y)) {
      continue;
    }
    visited.push(node);

    neighbours(node).forEach((neighbour) => {
      const { x, y } = neighbour;
      if (x >= 0 && x <= maxX && y >= 0 && y <= maxY) {
        queue.enqueue([risk + matrix[y][x], neighbour]);
      }
    });
  }

  return -1;

  function neighbours(node: Node): Node[] {
    const { x, y } = node;
    return [{ x, y: y - 1}, { x: x + 1, y }, { x, y: y + 1 }, { x: x - 1, y}];
  }
}

// Sorry 🙈
export function expandMatrix(matrix: number[][]): number[][] {
  const expandedMatrix: number[][] = new Array(matrix.length * 5);

  let increasedVertical = matrix;
  for (let i = 0; i < 5; i++) {
    // expand vertical
    for (let y = 0; y < matrix.length; y++) {
      expandedMatrix[i * matrix.length + y] = [...increasedVertical[y]];
    }
    //expand horizontal
    let increasedHorizontal = increaseMatrix(increasedVertical);
    for (let j = 1; j < 5; j++) {
      for (let y = 0; y < matrix.length; y++) {
        const cols = expandedMatrix[i * matrix.length + y];
        expandedMatrix[i * matrix.length + y] = [...cols, ...increasedHorizontal[y]];
      }
      increasedHorizontal = increaseMatrix(increasedHorizontal);
    }
    increasedVertical = increaseMatrix(increasedVertical);
  }

  return expandedMatrix;

  function increaseMatrix(matrix: number[][]): number[][] {
    return matrix.map((rows) => {
      return rows.map((risk) => {
        return risk === 9 ? 1 : risk + 1;
      });
    });
  }
}


type Position = { x: number, y: number }

// This naive approach using recursion does not work on larger maps.
export function lowestTotalRiskNaive(map: number[][]): number {
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
