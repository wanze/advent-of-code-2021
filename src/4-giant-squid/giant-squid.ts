export type Board = {
  numbers: number[];
  marked?: (0 | 1)[];
}

export function bingoScoreWinningBoard(initialBoards: Board[], numbers: number[]): number {
  const boards = initialBoards.map((board) => initMarks(board));

  for (const number of numbers) {
    for (const board of boards) {
      markNumber(board, number);
      if (isComplete(board)) {
        return number * sumUnmarkedNumbers(board);
      }
    }
  }

  throw new Error('no board completed after playing all numbers');
}

export function bingoScoreLoosingBoard(initialBoards: Board[], numbers: number[]): number {
  const boards = initialBoards.map((board) => initMarks(board));
  const completedBoards: number[] = [];

  for (const number of numbers) {
    for (let i = 0; i < boards.length; i++) {
      if (completedBoards.includes(i)) {
        continue;
      }

      const board = boards[i];
      markNumber(board, number);

      if (isComplete(board)) {
        completedBoards.push(i);
        if (completedBoards.length === boards.length) {
          return number * sumUnmarkedNumbers(board);
        }
      }
    }
  }

  throw new Error('no board completed after playing all numbers');
}

function markNumber(board: Board, number: number) {
  const index = board.numbers.indexOf(number);
  if (index > -1) {
    board.marked[index] = 1;
  }
}

function initMarks(board: Board): Board {
  return { ...board, marked: Array(5 * 5).fill(0) }
}

function sumUnmarkedNumbers(board: Board) {
  let sum = 0;

  board.numbers.forEach((number, index) => {
    if (board.marked[index] === 0) {
      sum += number;
    }
  });

  return sum;
}

function isComplete(board: Board) {
  return rowCompleted() || columnCompleted();

  function rowCompleted() {
    for (let i = 0; i <= 20; i += 5) {
      const row = board.marked.slice(i, i + 5);
      const solved = row.every((marked) => marked === 1);
      if (solved) {
        return true;
      }
    }

    return false;
  }

  function columnCompleted() {
    for (let i = 0; i < 5; i++) {
      if (
        board.marked[i] === 1 &&
        board.marked[i + 5] === 1 &&
        board.marked[i + 10] === 1 &&
        board.marked[i + 15] === 1 &&
        board.marked[i + 20] === 1
      ) {
        return true;
      }
    }

    return false;
  }
}
