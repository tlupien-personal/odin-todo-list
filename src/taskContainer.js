import { TaskNode } from "./taskNode.js";

const TASK_CONTAINER_STORAGE_NAME = "taskContainer";

class TaskContainer {
  #buffer = [];

  #resetBuffer() {
    this.#buffer = [];
  }

  #fromDataFormat(node, data) {
    if (data.every((e) => e === null)) {
      return;
    } else {
      for (let i = 0; i < data.length; i++) {
        if (data[i] === null) {
          continue;
        }

        if (data[i].parent === node.id) {
          const child = new TaskNode(data[i]);
          node.addSubtask(child);
          data.splice(i, 1, null);
          this.#fromDataFormat(child, data);
        }
      }
    }
  }

  load() {
    const data = JSON.parse(localStorage.getItem(TASK_CONTAINER_STORAGE_NAME));
    const rootIndex = data.findIndex((node) => !node.parent);
    const root = new TaskNode(data[rootIndex]);
    data.splice(rootIndex, 1);
    this.#fromDataFormat(root, data);
    return root;
  }

  #toDataFormat(task) {
    if (task.subtasks.length === 0) {
      delete task.subtasks;
      this.#buffer.push(task);
    } else {
      while (task.subtasks.length !== 0) {
        this.#toDataFormat(task.subtasks.pop());
      }
      this.#toDataFormat(task);
    }
  }
  save(root) {
    this.#resetBuffer();
    const rootData = JSON.parse(JSON.stringify(root));
    this.#toDataFormat(rootData);
    localStorage.setItem(
      TASK_CONTAINER_STORAGE_NAME,
      JSON.stringify(this.#buffer),
    );
  }
}

export { TaskContainer };
