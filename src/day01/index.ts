import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const preparedElves: number[][] = [];
  const splitByElf = input.split("\n\n");
  let mostCalories = 0;

  splitByElf.forEach((elf) => {
    preparedElves.push(elf.split("\n").map((calorie) => parseInt(calorie)));
  });

  preparedElves.forEach((elf) => {
    const sum = elf.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

    if (sum > mostCalories) {
      mostCalories = sum;
    }
  });

  return mostCalories;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const preparedElves: number[][] = [];
  const splitByElf = input.split("\n\n");
  let cumulatedCalories: number[] = [];

  splitByElf.forEach((elf) => {
    preparedElves.push(elf.split("\n").map((calorie) => parseInt(calorie)));
  });

  preparedElves.forEach((elf) => {
    cumulatedCalories.push(
      elf.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0),
    );
  });

  cumulatedCalories = cumulatedCalories.sort(function (a, b) {
    return b - a;
  });

  return cumulatedCalories[0] + cumulatedCalories[1] + cumulatedCalories[2];
};

run({
  part1: {
    tests: [
      {
        input: `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
