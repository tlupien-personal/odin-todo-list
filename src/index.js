import "./style.css";
import { TaskContainer } from "./taskContainer.js";

// Testing Area

// avoid duplicating this stuff in localStorage for now (testing)...
localStorage.setItem("taskContainer", null);

const taskContainer = new TaskContainer();

const rootTask = taskContainer.createTask("ROOT");

const project1 = taskContainer.createTask(
  "Project 1",
  "For testing purposes",
  new Date(2026, 3, 3),
  1,
  false,
  "",
);
const project2 = taskContainer.createTask(
  "Project 2",
  "Also for testing purposes",
  new Date(2026, 4, 9),
  3,
  false,
  "",
);

const task1 = taskContainer.createTask(
  "Task 1",
  "Fake Task",
  new Date(2026, 5, 12),
  4,
  false,
  "Grandchild of root",
);

rootTask.addSubtask(project1);
rootTask.addSubtask(project2);

project1.addSubtask(task1);

task1.description = "The description has changed for this task!";

console.log(taskContainer)

taskContainer.save();
