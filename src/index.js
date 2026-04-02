import "./reset.css";
import "./style.css";
import { TaskContainer } from "./taskContainer.js";
import { createTestTasks } from "./testData.js";
import { TaskDisplay } from "./taskDisplay.js";

let rootTask;
const taskContainer = new TaskContainer();
document.addEventListener("visibilitychange", (e) => {
  e.preventDefault()
  taskContainer.save(rootTask);
})

// Testing Area
const regenTestData = false;

if (regenTestData) {
  localStorage.setItem("taskContainer", null);
  rootTask = createTestTasks();
} else {
  rootTask = taskContainer.load();
}

// End Testing Area

const taskDisplay = new TaskDisplay(rootTask);
taskDisplay.display();
