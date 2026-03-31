import "./style.css";
import { TaskContainer } from "./taskContainer.js";
import { createTestTasks } from "./testData.js";

localStorage.setItem("taskContainer", null);

const taskContainer = new TaskContainer();

const rootTask = createTestTasks(taskContainer);

console.log(taskContainer.container);

// this being like this is a problem...
for (const taskId of rootTask.subtasks) {
  try {
    const task = taskContainer.readTask(taskId);
    console.log(task.subtasks.length);
  } catch (e) {
    console.log(e);
  }
}
