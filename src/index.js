import "./style.css";
import { TaskNode } from "./taskNode.js";

// Testing Area

const rootTask = new TaskNode("Root", null, null, null, null, null);
const project1 = new TaskNode(
  "Project 1",
  "For testing purposes",
  new Date(2026, 3, 3),
  1,
  false,
  "",
);
const project2 = new TaskNode(
  "Project 2",
  "Also for testing purposes",
  new Date(2026, 4, 9),
  3,
  false,
  "",
);

const task1 = new TaskNode(
  "Task 1",
  "Fake Task",
  new Date(2026, 5, 12),
  4,
  false,
  "Grandchild of root",
);

rootTask.addSubTask(project1);
rootTask.addSubTask(project2);

project1.addSubTask(task1);

const test = JSON.stringify(rootTask, null, 2);
console.log(test);
