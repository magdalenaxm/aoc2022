import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

enum Direction {
  U = "U",
  R = "R",
  D = "D",
  L = "L",
}

const printField = (field: string[][]) => {
  let helper = "";

  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      helper += field[i][j];
    }
    console.log(helper);
    helper = "";
  }

  console.log("\n");
};

const prepareField = (x: number, y: number) => {
  const field = [];
  for (let i = 0; i < y; i++) {
    const row = [];

    for (let j = 0; j < x; j++) {
      row.push(".");
    }
    field.push(row);
  }

  return field;
};

const calculateVisited = (field: string[][]) => {
  let visited = 0;

  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      if (field[i][j] === "#" || field[i][j] === "s" || field[i][j] === "T") {
        visited += 1;
      }
    }
  }

  return visited;
};

const moveTail = (
  headPosition: { x: number; y: number },
  tailPosition: { x: number; y: number },
) => {
  const diffX = headPosition.x - tailPosition.x;
  const diffY = headPosition.y - tailPosition.y;

  if (diffX === 2 && diffY === 0) {
    return { x: tailPosition.x + 1, y: tailPosition.y };
  } else if (diffX === -2 && diffY === 0) {
    return { x: tailPosition.x - 1, y: tailPosition.y };
  } else if (diffY === 2 && diffX === 0) {
    return { x: tailPosition.x, y: tailPosition.y + 1 };
  } else if (diffY === -2 && diffX === 0) {
    return { x: tailPosition.x, y: tailPosition.y - 1 };
  } else if (
    (diffX === -2 && diffY === 1) ||
    (diffX === -1 && diffY === 2) ||
    (diffX === -2 && diffY === 2)
  ) {
    return { x: tailPosition.x - 1, y: tailPosition.y + 1 };
  } else if (
    (diffX === 1 && diffY === 2) ||
    (diffX === 2 && diffY === 1) ||
    (diffX === 2 && diffY === 2)
  ) {
    return { x: tailPosition.x + 1, y: tailPosition.y + 1 };
  } else if (
    (diffX === 2 && diffY === -1) ||
    (diffX === 1 && diffY === -2) ||
    (diffX === 2 && diffY === -2)
  ) {
    return { x: tailPosition.x + 1, y: tailPosition.y - 1 };
  } else if (
    (diffX === -1 && diffY === -2) ||
    (diffX === -2 && diffY === -1) ||
    (diffX === -2 && diffY === -2)
  ) {
    return { x: tailPosition.x - 1, y: tailPosition.y - 1 };
  }

  return { x: tailPosition.x, y: tailPosition.y };
};

const moveHead = (
  headPosition: { x: number; y: number },
  direction: Direction,
) => {
  switch (direction) {
    case "U":
      return { x: headPosition.x - 1, y: headPosition.y };
    case "R":
      return { x: headPosition.x, y: headPosition.y + 1 };
    case "D":
      return { x: headPosition.x + 1, y: headPosition.y };
    case "L":
      return { x: headPosition.x, y: headPosition.y - 1 };
    default:
      return headPosition;
  }
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const moves: { direction: Direction; count: number }[] = input
    .split("\n")
    .map((move) => ({
      direction: move.split(" ")[0] as Direction,
      count: parseInt(move.split(" ")[1]),
    }));
  let visitedFields: Set<string> = new Set();

  let field = prepareField(1000, 1000);
  const startingPosition = { x: 200, y: 200 };
  field[startingPosition.x][startingPosition.y] = "H";

  let headPosition = startingPosition;
  let tailPosition = startingPosition;

  moves.forEach((move, index) => {
    for (let i = 0; i < move.count; i++) {
      field[headPosition.x][headPosition.y] = ".";
      headPosition = moveHead(headPosition, move.direction);
      field[headPosition.x][headPosition.y] = "H";

      if (index === 0 && i === 0) {
        field[startingPosition.x][startingPosition.y] = "T";
        visitedFields.add(
          JSON.stringify({ x: tailPosition.x, y: tailPosition.y }),
        );
      } else {
        field[tailPosition.x][tailPosition.y] = ".";
        tailPosition = moveTail(headPosition, tailPosition);

        visitedFields.add(
          JSON.stringify({ x: tailPosition.x, y: tailPosition.y }),
        );

        if (
          !(
            headPosition.x === tailPosition.x &&
            headPosition.y === tailPosition.y
          )
        ) {
          field[tailPosition.x][tailPosition.y] = "T";
        }
      }

      if (index === 0 && i === 1) {
        field[startingPosition.x][startingPosition.y] = "s";
      }
    }
  });

  return [...visitedFields].length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const moves: { direction: Direction; count: number }[] = input
    .split("\n")
    .map((move) => ({
      direction: move.split(" ")[0] as Direction,
      count: parseInt(move.split(" ")[1]),
    }));
  const startingPosition = { x: 400, y: 400 };

  let visitedFields: Set<string> = new Set();
  visitedFields.add(JSON.stringify(startingPosition));

  let field = prepareField(1000, 1000);
  const positions = Array(10).fill(startingPosition);

  field[startingPosition.x][startingPosition.y] = "H";

  moves.forEach((move, moveIndex) => {
    for (let i = 0; i < move.count; i++) {
      positions.forEach((position, index) => {
        if (index === 0) {
          field[position.x][position.y] = ".";
          positions[0] = moveHead(position, move.direction);
          field[positions[0].x][positions[0].y] = "H";
        } else {
          const newTail = moveTail(positions[index - 1], position);

          if (index === 9) {
            if (JSON.stringify(newTail) !== JSON.stringify(position)) {
              field[position.x][position.y] = ".";
              positions[index] = newTail;

              visitedFields.add(JSON.stringify({ x: newTail.x, y: newTail.y }));
              field[position.x][position.y] = "9";
            }
          } else {
            field[position.x][position.y] = ".";
            positions[index] = newTail;
            field[newTail.x][newTail.y] = `${index}`;
          }
        }
      });
    }
  });

  return [...visitedFields].length;
};

run({
  part1: {
    tests: [
      {
        input: `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
