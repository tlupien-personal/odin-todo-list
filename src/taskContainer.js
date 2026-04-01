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
    if (data === null) {
      return new TaskNode({title: "ROOT"});
    }
    const rootIndex = data.findIndex((node) => !node.parent);
    const root = new TaskNode(data[rootIndex]);
    data.splice(rootIndex, 1);
    this.#fromDataFormat(root, data);
    return root;
  }

  #toDataFormat(node) {
    if (node.subtasks.length === 0) {
      delete node.subtasks;
      this.#buffer.push(node);
    } else {
      while (node.subtasks.length !== 0) {
        this.#toDataFormat(node.subtasks.pop());
      }
      this.#toDataFormat(node);
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
