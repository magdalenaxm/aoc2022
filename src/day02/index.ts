import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const checkIfWon = (shape: string, opponent: string) => {
  if (
    (shape === "X" && opponent === "C") ||
    (shape === "Y" && opponent === "A") ||
    (shape === "Z" && opponent === "B")
  ) {
    return "won";
  } else if (
    (opponent === "A" && shape === "Z") ||
    (opponent === "B" && shape === "X") ||
    (opponent === "C" && shape === "Y")
  ) {
    return "lost";
  }

  return "draw";
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const simpleRounds = input.split("\n");
  let score = 0;

  const advancedRounds = simpleRounds.map((round) => {
    const shapes = round.split(" ");
    return {
      opponent: shapes[0],
      me: shapes[1],
    };
  });

  advancedRounds.forEach((round) => {
    let subscore = 0;

    switch (round.me) {
      case "X":
        subscore = 1;
        break;
      case "Y":
        subscore = 2;
        break;
      case "Z":
        subscore = 3;
        break;
    }

    switch (checkIfWon(round.me, round.opponent)) {
      case "won":
        subscore += 6;
        break;
      case "draw":
        subscore += 3;
        break;
    }

    score += subscore;
  });

  return score;
};

const mapping: { [key: string]: string } = { A: "X", B: "Y", C: "Z" };

const chooseShape = (opponent: string, end: string) => {
  if (end === "X") {
    if (opponent === "A") {
      return "Z";
    } else if (opponent === "B") {
      return "X";
    }
    if (opponent === "C") {
      return "Y";
    }
  } else if (end === "Z") {
    if (opponent === "C") {
      return "X";
    } else if (opponent === "A") {
      return "Y";
    } else if (opponent === "B") {
      return "Z";
    }
  }

  return mapping[opponent];
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const simpleRounds = input.split("\n");
  let score = 0;

  const advancedRounds = simpleRounds.map((round) => {
    const shapes = round.split(" ");
    return {
      opponent: shapes[0],
      end: shapes[1],
    };
  });

  advancedRounds.forEach((round) => {
    let subscore = 0;

    switch (round.end) {
      case "X":
        subscore = 0;
        break;
      case "Y":
        subscore = 3;
        break;
      case "Z":
        subscore = 6;
        break;
    }

    switch (chooseShape(round.opponent, round.end)) {
      case "X":
        subscore += 1;
        break;
      case "Y":
        subscore += 2;
        break;
      case "Z":
        subscore += 3;
        break;
    }

    score += subscore;
  });

  return score;
};

run({
  part1: {
    tests: [
      {
        input: `A Y
B X
C Z`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `A Y
B X
C Z`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
