enum Direction {
  Up ='up',
  Forward = 'forward',
  Down = 'down',
}

type Command = {
  direction: Direction;
  number: number;
}

function commandFromInput(input: string): Command {
  const data = input.split(' ');

  return {
    direction: data[0] as Direction,
    number: parseInt(data[1], 10),
  }
}

export function calculatePosition(inputCommands: string[]): number {
  if (inputCommands.length === 0) {
    return 0;
  }

  let horizontal = 0;
  let depth = 0;

  inputCommands
    .map((input) => commandFromInput(input))
    .forEach((command) => {
      if (command.direction === 'forward') {
        horizontal += command.number;
      } else if (command.direction === 'down') {
        depth += command.number;
      } else if (command.direction === 'up') {
        depth -= command.number;
      }
    });

  return horizontal * depth;
}

export function calculatePositionWithAim(inputCommands: string[]): number {
  if (inputCommands.length === 0) {
    return 0;
  }

  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  inputCommands
    .map((input) => commandFromInput(input))
    .forEach((command) => {
      if (command.direction === 'forward') {
        horizontal += command.number;
        depth += aim * command.number;
      } else if (command.direction === 'down') {
        aim += command.number;
      } else if (command.direction === 'up') {
        aim -= command.number;
      }
    });

  return horizontal * depth;
}
