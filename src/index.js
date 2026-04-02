import "./reset.css";
import "./style.css";
import { TaskContainer } from "./taskContainer.js";
import { createTestTasks } from "./testData.js";
import { TaskDisplay } from "./taskDisplay.js";

// Testing Area

const taskContainer = new TaskContainer();
const regenTestData = false;

let rootTask;

if (regenTestData) {
  localStorage.setItem("taskContainer", null);
  rootTask = createTestTasks();
  taskContainer.save(rootTask);
  rootTask = taskContainer.load();
  // why twice? well, otherwise order is reversed
  // not sure why + idc b/c at some point will implement
  // priority + date order
  taskContainer.save(rootTask);
  rootTask = taskContainer.load();
} else {
  rootTask = taskContainer.load();
}

const taskDisplay = new TaskDisplay(rootTask);
taskDisplay.display();
