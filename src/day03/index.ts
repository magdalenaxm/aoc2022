import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  let sum = 0;
  const input = parseInput(rawInput);
  const backpacks = input.split("\n").map((backpack) => ({
    first: backpack.substring(0, backpack.length / 2),
    second: backpack.substring(backpack.length / 2, backpack.length),
  }));

  backpacks.forEach((backpack) => {
    let commonChar = "";
    backpack.first.split("").forEach((item) => {
      if (backpack.second.includes(item)) commonChar = item;
    });

    if (commonChar === commonChar.toUpperCase()) {
      sum += commonChar.charCodeAt(0) - 38;
    } else {
      sum += commonChar.charCodeAt(0) - 96;
    }
  });

  return sum;
};

const part2 = (rawInput: string) => {
  let sum = 0;
  const input = parseInput(rawInput);
  const elves = input.split("\n");
  const groups: string[][] = [];
  let group: string[] = [];

  elves.forEach((elf, index) => {
    group.push(elf);

    if ((index + 1) % 3 === 0) {
      groups.push(group);
      group = [];
    }
  });

  groups.forEach((group) => {
    let commonChar = "";

    group[0].split("").forEach((item) => {
      if (group[1].includes(item) && group[2].includes(item)) {
        commonChar = item;
      }
    });

    if (commonChar === commonChar.toUpperCase()) {
      sum += commonChar.charCodeAt(0) - 38;
    } else {
      sum += commonChar.charCodeAt(0) - 96;
    }
  });

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
