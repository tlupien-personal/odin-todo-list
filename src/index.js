import "./style.css";
import { TaskContainer } from "./taskContainer.js";
import { createTestTasks } from "./testData.js";

// Testing Area

// localStorage.setItem("taskContainer", null);

const taskContainer = new TaskContainer();

// let rootTask = createTestTasks();

// console.log(rootTask);

// taskContainer.save(rootTask);

const rootTask = taskContainer.load();

console.log(rootTask);
