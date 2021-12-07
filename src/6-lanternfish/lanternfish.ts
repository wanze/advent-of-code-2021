export function numberOfLanternFishNaive(initialFish: number[], afterDays: number): number {
  const fish = generateFishRecursive(initialFish, afterDays);

  return fish.length;

  function generateFishRecursive(fish: number[], daysLeft: number): number[] {
    if (daysLeft === 0) {
      return fish;
    }

    const append = [];
    for (let i = 0; i < fish.length; i++) {
      if (fish[i] === 0) {
        append.push(8);
        fish[i] = 6;
      } else {
        fish[i] -= 1;
      }
    }
    fish.push(...append);

    return generateFishRecursive(fish, --daysLeft);
  }
}

export function numberOfLanternFish(initialFish: number[], afterDays: number): number {
  let counts: { [day: number]: number } = {};
  for (let i = 0; i <= 8; i++) {
    counts[i] = initialFish.filter(n => n === i).length;
  }

  for (let day = 1; day <= afterDays; day++) {
    let newCounts = { ...counts };
    for (let i = 8; i >= 1; i--) {
      newCounts[i - 1] = counts[i];
    }
    newCounts[8] = counts[0];
    newCounts[6] += counts[0];
    counts = { ...newCounts }
  }

  let count = 0;
  Object.values(counts).forEach((n: any) => {
    count += n;
  });

  return count;
}
