import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const createSectionArray = (start: string, end: string) => {
  let result = [];

  for (let i = parseInt(start); i <= parseInt(end); i++) {
    result.push(i);
  }

  return result;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let totalIncluded = 0;
  const elvesPairs = input.split("\n").map((pair) => ({
    one: {
      start: pair.split(",")[0].split("-")[0],
      end: pair.split(",")[0].split("-")[1],
    },
    two: {
      start: pair.split(",")[1].split("-")[0],
      end: pair.split(",")[1].split("-")[1],
    },
  }));

  elvesPairs.forEach((pair) => {
    let elfOne = createSectionArray(pair.one.start, pair.one.end);
    let elfTwo = createSectionArray(pair.two.start, pair.two.end);

    const longerArray = elfOne.length >= elfTwo.length ? elfOne : elfTwo;
    const shorterArray = elfOne.length >= elfTwo.length ? elfTwo : elfOne;

    const filteredArray = longerArray.filter((value) =>
      shorterArray.includes(value),
    );

    if (filteredArray.length === shorterArray.length) {
      totalIncluded += 1;
    }
  });

  return totalIncluded;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let totalIncluded = 0;
  const elvesPairs = input.split("\n").map((pair) => ({
    one: {
      start: pair.split(",")[0].split("-")[0],
      end: pair.split(",")[0].split("-")[1],
    },
    two: {
      start: pair.split(",")[1].split("-")[0],
      end: pair.split(",")[1].split("-")[1],
    },
  }));

  elvesPairs.forEach((pair) => {
    let elfOne = createSectionArray(pair.one.start, pair.one.end);
    let elfTwo = createSectionArray(pair.two.start, pair.two.end);

    const longerArray = elfOne.length >= elfTwo.length ? elfOne : elfTwo;
    const shorterArray = elfOne.length >= elfTwo.length ? elfTwo : elfOne;

    const filteredArray = longerArray.filter((value) =>
      shorterArray.includes(value),
    );

    if (filteredArray.length > 0) {
      totalIncluded += 1;
    }
  });

  return totalIncluded;
};

run({
  part1: {
    tests: [
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
