export function checkPowerConsumption(report: string[]): number {
  if (report.length === 0) {
    return 0;
  }

  const nBits = report[0].length;
  let gammaRate = '';
  let epsilonRate = '';

  for (let bitIndex = 0; bitIndex < nBits; bitIndex++) {
    let zeroBitsCount = 0;
    let oneBitsCount = 0;

    report.forEach((binaryNumber) => {
      if (binaryNumber[bitIndex] === '1') {
        oneBitsCount++;
      } else if (binaryNumber[bitIndex] === '0') {
        zeroBitsCount++;
      }
    });

    if (oneBitsCount > zeroBitsCount) {
      gammaRate += '1';
      epsilonRate += '0';
    } else {
      gammaRate += '0';
      epsilonRate += '1';
    }
  }

  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}

export function lifeSupportRating(report: string[]): number {
  if (report.length === 0) {
    return 0;
  }

  const oxygenGeneratorRating = filter(report, 0, (binaryNumber, bitIndex, zeroCount, oneCount) => {
    if (oneCount >= zeroCount) {
      return binaryNumber[bitIndex] === '1';
    }

    return binaryNumber[bitIndex] === '0';
  });

  const co2ScrubberRating = filter(report, 0, (binaryNumber, bitIndex, zeroCount, oneCount) => {
    if (zeroCount <= oneCount) {
      return binaryNumber[bitIndex] === '0';
    }

    return binaryNumber[bitIndex] === '1';
  });

  return parseInt(oxygenGeneratorRating[0], 2) * parseInt(co2ScrubberRating[0], 2);

  function filter(
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

    let zeroCount = 0;
    let oneCount = 0;

    binaryNumbers.forEach((binaryNumber) => {
      if (binaryNumber[bitIndex] === '1') {
        oneCount++;
      } else if (binaryNumber[bitIndex] === '0') {
        zeroCount++;
      }
    });

    const filtered = binaryNumbers.filter(
      (binaryNumber) => filterPredicate(binaryNumber, bitIndex, zeroCount, oneCount)
    );

    return filter(filtered, ++bitIndex, filterPredicate);
  }
}
