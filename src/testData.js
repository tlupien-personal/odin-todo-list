import { TaskNode } from "./taskNode.js";

const randBetween = function (lb, ub) {
  const r = Math.random();
  return lb + Math.floor(r * (ub + 1 - lb));
};

const randLipsum = function (frac) {
  const LIPSUM =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed fringilla lacus. Suspendisse sit amet convallis risus, vel viverra lorem. Nam dictum, mi tristique varius dignissim, tortor erat tempor mi, finibus tempus elit dui eu arcu. Vivamus iaculis vehicula varius. Phasellus faucibus erat ac nisi consectetur gravida. Integer consectetur sem eget posuere auctor. Phasellus sed ante consequat, blandit orci nec, pretium quam. Nunc ut dignissim nisi. Integer dignissim lacus sit amet eros venenatis, sed mattis tellus interdum. Quisque tincidunt quam vel condimentum ultrices.";
  return LIPSUM.slice(0, randBetween(0, Math.floor(LIPSUM.length / frac)));
};

const createTestTask = function (level, number) {
  const data = {
    title: `Test Task L${level} #${number}`,
    description: randLipsum(5),
    dueDate: new Date(2026, randBetween(3, 11), randBetween(1, 30)),
    priority: randBetween(1, 5),
    isComplete: false,
    notes: Math.random() > 2 / 3 ? randLipsum(1) : null,
  };
  const task = new TaskNode(data) 
  return task;
};

const createTestTasks = function () {
  const root = new TaskNode({ title: "ROOT" });

  for (let i = 0; i < 6; i++) {
    let level = 1;
    const l1Task = createTestTask(level, i + 1);
    root.addSubtask(l1Task);
    const nSubTasks = randBetween(0, 9);
    for (let j = 0; j < nSubTasks; j++) {
      let level = 2;
      const l2Task = createTestTask(level, `${i + 1}.${j + 1}`);
      l1Task.addSubtask(l2Task);
      const nSubSubTasks = randBetween(0, 4);
      for (let k = 0; k < nSubSubTasks; k++) {
        let level = 3;
        const l3Task = createTestTask(level, `${i + 1}.${j + 1}.${k + 1}`)
        l2Task.addSubtask(l3Task);
      }
    }
  }

  return root;
};

export { createTestTasks };
