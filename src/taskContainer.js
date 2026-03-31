import { TaskNode } from "./taskNode.js";

const TASK_CONTAINER_STORAGE_NAME = "taskContainer";

class TaskContainer {
  constructor() {
    this.container = this.load();
  }

  createTask(data) {
    const task = TaskNode.fromData(data);
    this.container[task.id] = task;
    return task;
  }

  readTask(id) {
    return this.container[id];
  }

  removeTask(id) {
    delete this.container[id];
  }

  load() {
    const data = JSON.parse(localStorage.getItem(TASK_CONTAINER_STORAGE_NAME));
    const container = {};
    if (data === null) {
      return container;
    }
    for (const [k, v] of Object.entries(data)) {
      container[k] = TaskNode.fromData(v);
    }
    return container;
  }

  save() {
    localStorage.setItem(
      TASK_CONTAINER_STORAGE_NAME,
      JSON.stringify(this.container),
    );
  }
}

export { TaskContainer };
