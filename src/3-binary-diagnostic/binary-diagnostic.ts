export function checkPowerConsumption(report: string[]): number {
  if (report.length === 0) {
    return 0;
  }

  const nBits = report[0].length;
  let gammaRate = '';
  let epsilonRate = '';

  for (let bitIndex = 0; bitIndex < nBits; bitIndex++) {
    const [zeroCount, oneCount] = countZeroOneBitsAtIndex(report, bitIndex);

    if (zeroCount > oneCount) {
      gammaRate += '1';
      epsilonRate += '0';
    } else {
      gammaRate += '0';
      epsilonRate += '1';
    }
  }

  return binaryToDecimal(gammaRate) * binaryToDecimal(epsilonRate);
}

export function lifeSupportRating(report: string[]): number {
  if (report.length === 0) {
    return 0;
  }

  const oxygenGeneratorRating = getOxygenGeneratorRating();
  const co2ScrubberRating = getCo2ScrubberRating();

  return binaryToDecimal(oxygenGeneratorRating) * binaryToDecimal(co2ScrubberRating);

  function getCo2ScrubberRating() {
    const filtered = filterRecursive(report, 0, (binaryNumber, bitIndex, zeroCount, oneCount) => {
      if (zeroCount <= oneCount) {
        return binaryNumber[bitIndex] === '0';
      }

      return binaryNumber[bitIndex] === '1';
    });

    return filtered[0];
  }

  function getOxygenGeneratorRating() {
    const filtered = filterRecursive(report, 0, (binaryNumber, bitIndex, zeroCount, oneCount) => {
      if (oneCount >= zeroCount) {
        return binaryNumber[bitIndex] === '1';
      }

      return binaryNumber[bitIndex] === '0';
    });

    return filtered[0];
  }

  function filterRecursive(
    binaryNumbers: string[],
    bitIndex: number,
    filterPredicate: (binaryNumber: string, bitIndex: number, zeroCount: number, oneCount: number) => boolean): string[]
  {
    if (binaryNumbers.length === 1) {
      return binaryNumbers;
    }

    const nBits = binaryNumbers[0].length;

    if (bitIndex >= nBits) {
      throw Error(`Bit index "${bitIndex}" greater than number of bits (${nBits})!`);
    }

    const [zeroCount, oneCount] = countZeroOneBitsAtIndex(binaryNumbers, bitIndex);

    const filtered = binaryNumbers.filter(
      (binaryNumber) => filterPredicate(binaryNumber, bitIndex, zeroCount, oneCount)
    );

    return filterRecursive(filtered, ++bitIndex, filterPredicate);
  }
}

function binaryToDecimal(binary: string): number {
  return parseInt(binary, 2);
}

function countZeroOneBitsAtIndex(binaryNumbers: string[], bitIndex: number): [number, number] {
  let zeroCount = 0;
  let oneCount = 0;

  binaryNumbers.forEach((binaryNumber) => {
    if (binaryNumber[bitIndex] === '1') {
      oneCount++;
    } else if (binaryNumber[bitIndex] === '0') {
      zeroCount++;
    }
  });

  return [zeroCount, oneCount];
}
