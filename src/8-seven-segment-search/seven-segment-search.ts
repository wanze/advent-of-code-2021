export type NotesEntry = {
  signals: Segment[];
  outputs: Segment[];
}

export type Segment = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g';

export function countUniqueDigits(entries: NotesEntry[]): number {
  const uniqueSegmentLengths = [2, 3, 4, 7];
  let count = 0;

  entries.forEach((entry) => {
    entry.outputs.forEach((output) => {
      const isUnique = uniqueSegmentLengths.indexOf(output.length) > -1;
      if (isUnique) {
        count += 1;
      }
    });
  });

  return count;
}

// const digits = {
//   0: 'abcefg',
//   1: 'cf',
//   2: 'acdeg',
//   3: 'acdfg',
//   4: 'bcdf',
//   5: 'abdfg',
//   6: 'abdefg',
//   7: 'acf',
//   8: 'abcdefg',
//   9: 'abcdfg',
// }

export function sumOutput(entries: NotesEntry[]): number {
  const sum = 0;

  entries.forEach((entry) => {
    const mapping: any = { 0: '', 1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: '' };
    entry.signals.forEach((signal) => {
      if (signal.length === 2) {
        mapping[1] = signal;
      } else if (signal.length === 3) {
        mapping[7] = signal;
      } else if (signal.length === 7) {
        mapping[8] = signal;
      } else if (signal.length === 4) {
        mapping[4] = signal;
      }
    });
  });

  return sum;
}
