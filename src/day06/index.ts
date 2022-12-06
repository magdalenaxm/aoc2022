import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let marker = undefined;

  for (let i = 4; i < input.length; i++) {
    const subMarker = input.substring(i - 4, i);

    if (subMarker.split("").length === new Set(subMarker).size && !marker) {
      marker = i;
    }
  }

  return marker;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let marker = undefined;

  for (let i = 14; i < input.length; i++) {
    const subMarker = input.substring(i - 14, i);

    if (subMarker.split("").length === new Set(subMarker).size && !marker) {
      marker = i;
    }
  }

  return marker;
};

run({
  part1: {
    tests: [
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 10,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 19,
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
