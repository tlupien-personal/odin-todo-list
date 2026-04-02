import "./reset.css";
import "./style.css";
import { TaskContainer } from "./taskContainer.js";
import { createTestTasks } from "./testData.js";
import { TaskDisplay } from "./taskDisplay.js";

// Testing Area

// localStorage.setItem("taskContainer", null);

const taskContainer = new TaskContainer();

// let rootTask = createTestTasks();

// console.log(rootTask);

// taskContainer.save(rootTask);

const rootTask = taskContainer.load();

// const child2 = rootTask.getSubtask(1);
// console.log(child2);
// rootTask.removeSubtask(rootTask.subtasks[0])
const taskDisplay = new TaskDisplay(rootTask);
taskDisplay.display();
// console.log(rootTask);

// taskContainer.save(rootTask);
