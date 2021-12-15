export type Rule = {
  pair: string;
  insertion: string;
}

export function leastMostCommonPolymerElements(template: string, rules: Rule[], steps: number): { least: number, most: number } {
  const polymer = getPolymer(template, rules, steps);
  const counts: { [element: string]: number } = {};

  for (let i = 0; i < polymer.length; i++) {
    const element = polymer[i];
    counts[element] = counts[element] ? counts[element] + 1 : 1;
  }

  let least = 1000000;
  let most = 0;

  Object.keys(counts).forEach((element) => {
    const count = counts[element];
    if (count > most) {
      most = count;
    }
    if (count < least) {
      least = count;
    }
  });

  return { least, most };
}

export function getPolymer(template: string, rules: Rule[], steps: number): string {
  let polymer = template;
  for (let step = 0; step < steps; step++) {
    let i = 0;
    while (i < polymer.length - 1) {
      const pair = `${polymer[i]}${polymer[i + 1]}`;
      const rule = rules.find(rule => rule.pair === pair);
      if (rule) {
        polymer = polymer.substr(0, i + 1) + rule.insertion + polymer.substr(i + 1);
        i++;
      }
      i++;
    }
  }

  return polymer;
}
