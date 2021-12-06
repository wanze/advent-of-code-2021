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
