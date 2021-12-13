export type Cave = {
  name: string;
  caves: Cave[];
}

export function pathsCount(caves: Cave[]): number {
  const allPaths: Array<Cave[]> = [];
  const start = caves.find(cave => cave.name === 'start');

  findPathsRecursive(start, []);

  return allPaths.length;

  function findPathsRecursive(from: Cave, path: Cave[]) {
    const visited = path.find(cave => cave.name === from.name);
    if (isSmallCave(from.name) && visited) {
      return;
    }

    path.push(from);

    if (from.name === 'end') {
      allPaths.push(path);
      return;
    }

    from.caves.forEach((to) => {
      findPathsRecursive(to, [...path]);
    });
  }
}

export function pathsCountMultipleVisits(caves: Cave[]): number {
  const allPaths: Array<Cave[]> = [];
  const [start] = caves.splice(caves.findIndex(cave => cave.name === 'start'), 1);
  const smallCaves = caves.filter(cave => isSmallCave(cave.name) && cave.name !== 'end');

  start.caves.forEach((cave) => {
    smallCaves.forEach((smallCave) => {
      findPathsRecursive(cave, smallCave, []);
    });
  });

  const pathValues = allPaths.map(caves => caves.map(cave => cave.name).join(','));

  return [...new Set(pathValues)].length;

  function findPathsRecursive(from: Cave, allowedToVisitTwice: Cave, path: Cave[]) {
    if (from.name === 'start') {
      return;
    }

    const nVisited = path.filter(cave => cave.name === from.name).length;

    if (isSmallCave(from.name)) {
      if (from.name === allowedToVisitTwice.name && nVisited === 2) {
        return;
      } else if (from.name !== allowedToVisitTwice.name && nVisited === 1) {
        return;
      }
    }

    path.push(from);

    if (from.name === 'end') {
      allPaths.push([start, ...path]);
      return;
    }

    from.caves.forEach((to) => {
      findPathsRecursive(to, allowedToVisitTwice, [...path]);
    });
  }
}

function isSmallCave(name: string): boolean {
  return name.toLowerCase() === name;
}
