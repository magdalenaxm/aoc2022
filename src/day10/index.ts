import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n").map((line) => ({
    instruction: line.split(" ")[0],
    count: line.split(" ")[0] === "noop" ? 0 : parseInt(line.split(" ")[1]),
  }));
  let x = 1;
  const cycles: number[] = [1];

  const relevantCycles = [20, 60, 100, 140, 180, 220];
  let sum = 0;

  lines.forEach((line) => {
    if (line.instruction === "noop") {
      cycles.push(x);
    } else {
      for (let i = 0; i < 2; i++) {
        if (i === 0) {
          cycles.push(x);
        } else {
          x += line.count;
          cycles.push(x);
        }
      }
    }
  });

  relevantCycles.forEach((cycle) => {
    sum += cycle * cycles[cycle - 1];
  });

  return sum;
};

const testCRT = (crt: string[][]) => {
  let helper = "";

  for (let i = 0; i < crt.length; i++) {
    for (let j = 0; j < crt[i].length; j++) {
      helper += crt[i][j];
    }

    if (i !== crt.length - 1) {
      helper += "\n";
    }
  }

  return helper;
};

const printCRT = (crt: string[][]) => {
  let helper = "";

  for (let i = 0; i < crt.length; i++) {
    for (let j = 0; j < crt[i].length; j++) {
      helper += crt[i][j];
    }
    console.log(helper);
    helper = "";
  }

  console.log("\n");
};

const printSprite = (positions: number[]) => {
  const line = Array(40).fill(".");
  positions.forEach((position) => {
    line[position] = "#";
  });
  console.log(`\n${line.join("")}\n`);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n").map((line) => ({
    instruction: line.split(" ")[0],
    count: line.split(" ")[0] === "noop" ? 0 : parseInt(line.split(" ")[1]),
  }));

  let spritePosition = [0, 1, 2];
  let currentCRT = { x: 0, y: 0 };
  const crt: string[][] = [
    Array(40).fill(" "),
    Array(40).fill(" "),
    Array(40).fill(" "),
    Array(40).fill(" "),
    Array(40).fill(" "),
    Array(40).fill(" "),
  ];

  lines.forEach((line) => {
    if (line.instruction === "noop") {
      crt[currentCRT.x][currentCRT.y] = spritePosition.includes(currentCRT.y)
        ? "#"
        : " ";

      if (currentCRT.y === 39) {
        currentCRT = { x: currentCRT.x + 1, y: 0 };
      } else {
        currentCRT = { x: currentCRT.x, y: currentCRT.y + 1 };
      }
    } else {
      for (let i = 0; i < 2; i++) {
        crt[currentCRT.x][currentCRT.y] = spritePosition.includes(currentCRT.y)
          ? "#"
          : " ";

        if (i === 1) {
          spritePosition = [
            spritePosition[0] + line.count,
            spritePosition[1] + line.count,
            spritePosition[2] + line.count,
          ];
        }

        if (currentCRT.y === 39) {
          currentCRT = { x: currentCRT.x + 1, y: 0 };
        } else {
          currentCRT = { x: currentCRT.x, y: currentCRT.y + 1 };
        }
      }
    }
  });

  printCRT(crt);

  return "RUAKHBEK";
};

run({
  part1: {
    tests: [
      {
        input: `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`,
        expected: 13140,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`,
        expected: `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
