export type Rule = {
  pair: string;
  insertion: string;
}

export function polymerString(template: string, rules: Rule[], nSteps: number): string {
  let polymer = template;

  const replacements: { [pair: string]: string} = {};
  rules.forEach((rule) => {
    replacements[rule.pair] = rule.insertion;
  });

  for (let step = 0; step < nSteps; step++) {
    let newPolymer = '';
    for (let i = 0; i < polymer.length - 1; i++) {
      const pair = polymer[i] + polymer[i + 1];
      const replacement = replacements[pair] || '';
      newPolymer += polymer[i] + replacement;
    }
    polymer = newPolymer + polymer[polymer.length - 1];
  }

  return polymer;
}

export function polymerCounts(template: string, rules: Rule[], nSteps: number): { [element: string]: number } {
  const counts: { [element: string]: number } = {};
  const replacements: { [pair: string]: string} = {};

  rules.forEach((rule) => {
    replacements[rule.pair] = rule.insertion;
  });

  let pairsCount: { [pair: string]: number } = {};

  for (let i = 0; i < template.length - 1; i++) {
    const pair = template[i] + template[i + 1];
    pairsCount[pair] = pairsCount[pair] ? pairsCount[pair] + 1 : 1;
  }

  for (let step = 0; step < nSteps; step++) {
    const newPairsCount: { [pair: string]: number } = {};
    Object.keys(pairsCount).forEach((pair) => {
      const replacement = replacements[pair];
      if (replacement) {
        const newPair1 = pair[0] + replacement;
        const newPair2 = replacement + pair[1];
        newPairsCount[newPair1] = newPairsCount[newPair1] ? newPairsCount[newPair1] + pairsCount[pair] : pairsCount[pair];
        newPairsCount[newPair2] = newPairsCount[newPair2] ? newPairsCount[newPair2] + pairsCount[pair] : pairsCount[pair];
      }
    });
    pairsCount = newPairsCount;
  }

  Object.keys(pairsCount).forEach((pair) => {
    const firstElement = pair[0];
    const count = pairsCount[pair];
    counts[firstElement] = counts[firstElement] ? counts[firstElement] + count : count;
  });
  const lastElement = template[template.length - 1];
  counts[lastElement] += 1;

  return counts;
}

export function leastMostCommonPolymerElements(template: string, rules: Rule[], nSteps: number): { least: number, most: number } {
  const counts = polymerCounts(template, rules, nSteps);

  let most = 0;
  let least = null;

  Object.keys(counts).forEach((element) => {
    const count = counts[element];
    if (count > most) {
      most = count;
    }
    if (least === null || count < least) {
      least = count;
    }
  });

  return { least, most };
}
