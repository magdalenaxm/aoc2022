import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

function addFile(obj: any, value: any, path: string) {
  let i;
  const paths = path.split(".");
  for (i = 0; i < paths.length - 1; i++) obj = obj[paths[i]];

  obj[paths[i]] = {
    ...obj[paths[i]],
    files: [...(obj[paths[i]].files ?? []), value],
  };
}

function addDirectory(obj: any, value: any, path: string) {
  let i;
  const paths = path.split(".");
  for (i = 0; i < paths.length - 1; i++) obj = obj[paths[i]];

  obj[paths[i]] = { ...obj[paths[i]], ...value };
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");
  const fileTree: { [key: string]: any } = { root: {} };
  let path = "root";
  const sizes: { [key: string]: number } = {};

  lines.forEach((line) => {
    if (line === "$ ls") {
      return;
    }

    if (line === "$ cd /") {
      path = "root";
      return;
    } else if (line === "$ cd ..") {
      path = path.substring(0, path.lastIndexOf("."));
      return;
    } else if (line.includes("$ cd")) {
      path += "." + line.split(" ")[2];
      return;
    }

    if (line.includes("dir")) {
      const name = line.split(" ")[1];
      addDirectory(fileTree, { [name]: { files: [] } }, path);
      return;
    }

    const size = line.split(" ")[0];
    const name = line.split(" ")[1];
    addFile(fileTree, { name, size: parseInt(size) }, path);
  });

  const iterate = (obj: any, sum: number) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key].files) {
        sum = obj[key].files.reduce(
          (accumulator: number, object: { size: number }) => {
            return accumulator + object.size;
          },
          0,
        );
      }

      if (obj[key].files) {
        iterate(obj[key], sum);
      }
    });

    return sum;
  };

  console.log(iterate(fileTree, 0));

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },

  onlyTests: false,
});
