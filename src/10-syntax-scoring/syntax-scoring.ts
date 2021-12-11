export function syntaxErrorScore(inputs: string[]): number {
  const scores = { ')': 3, ']': 57, '}': 1197, '>': 25137 };

  let score = 0;

  inputs.forEach((input) => {
    const chars = input.split('');
    const corrupted = isCorrupted(chars);
    if (corrupted) {
      score += scores[corrupted];
    }
  });

  return score;
}

export function autocompleteScore(inputs: string[]): number {
  const points = { ')': 1, ']': 2, '}': 3, '>': 4 };
  const scores: number[] = [];
  const closingChars = { '(': ')', '[': ']', '{': '}', '<': '>' };

  inputs
    .filter(input => isCorrupted(input.split('')) === false)
    .forEach((input) => {
      const openCharsStack: string[] = [];
      const chars = input.split('');
      chars.forEach((char) => {
        if (isOpeningChar(char)) {
          openCharsStack.push(char);
        } else {
          openCharsStack.pop();
        }
      });

      let score = 0;
      openCharsStack.reverse().forEach((openChar) => {
        const closingChar = closingChars[openChar];
        score = score * 5 + points[closingChar];
      });
      scores.push(score);
    });

    scores.sort((a, b) => a - b);

    const middle = (scores.length - 1) / 2;

    return scores[middle];
}

function isOpeningChar(char: string): boolean {
  return ['(', '[', '{', '<'].includes(char);
}

function isCorrupted(chars: string[]): false|string {
  const openCharsStack: string[] = [];

  for (let i = 0; i < chars.length; i++){
    const char = chars[i];
    if (isOpeningChar(char)) {
      openCharsStack.push(char);
    } else {
      const lastOpening = openCharsStack.pop();
      if (
        (lastOpening === '(' && char !== ')') ||
        (lastOpening === '[' && char !== ']') ||
        (lastOpening === '{' &&  char !== '}') ||
        (lastOpening === '<' && char !== '>')
      ) {
        return char;
      }
    }
  }

  return false;
}
