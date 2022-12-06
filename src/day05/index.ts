import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

interface IStack<T> {
  push(item: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  size(): number;
}

class Stack<T> implements IStack<T> {
  private storage: T[] = [];

  constructor() {}

  push(item: T): void {
    this.storage.push(item);
  }

  pop(): T | undefined {
    return this.storage.pop();
  }

  peek(): T | undefined {
    return this.storage[this.size() - 1];
  }

  size(): number {
    return this.storage.length;
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const instructions = input.split("\n\n")[1].split("\n");
  const cratesInput = input.split("\n\n")[0].split("\n").reverse();

  const crates: Stack<string>[] = [];

  for (let i = 1; i < cratesInput.length; i++) {
    cratesInput[i].match(/.{3,4}/g)?.forEach((crate, index) => {
      if (crate.trim().length !== 0) {
        if (crates[index + 1]) {
          crates[index + 1].push(crate.replace(/[^A-Z]/g, ""));
        } else {
          const stack = new Stack<string>();
          stack.push(crate.replace(/[^A-Z]/g, ""));
          crates[index + 1] = stack;
        }
      }
    });
  }

  instructions.forEach((instruction) => {
    const numbers = instruction.match(/\d+/g);
    const count = parseInt(numbers![0]);
    const source = parseInt(numbers![1]);
    const target = parseInt(numbers![2]);

    for (let i = 0; i < count; i++) {
      crates[target].push(crates[source].pop()!);
    }
  });

  return crates.map((crate) => crate.peek()).join("");
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const instructions = input.split("\n\n")[1].split("\n");
  const cratesInput = input.split("\n\n")[0].split("\n").reverse();

  const crates: Stack<string>[] = [];

  for (let i = 1; i < cratesInput.length; i++) {
    cratesInput[i].match(/.{3,4}/g)?.forEach((crate, index) => {
      if (crate.trim().length !== 0) {
        if (crates[index + 1]) {
          crates[index + 1].push(crate.replace(/[^A-Z]/g, ""));
        } else {
          const stack = new Stack<string>();
          stack.push(crate.replace(/[^A-Z]/g, ""));
          crates[index + 1] = stack;
        }
      }
    });
  }

  instructions.forEach((instruction) => {
    const numbers = instruction.match(/\d+/g);
    const count = parseInt(numbers![0]);
    const source = parseInt(numbers![1]);
    const target = parseInt(numbers![2]);

    const buffer: string[] = [];

    for (let i = 0; i < count; i++) {
      buffer.push(crates[source].pop()!);
    }

    buffer.reverse().forEach((item) => crates[target].push(item));
  });

  return crates.map((crate) => crate.peek()).join("");
};

run({
  part1: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
