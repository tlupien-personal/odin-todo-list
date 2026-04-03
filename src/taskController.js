import { TaskContainer } from "./taskContainer.js";
import { TaskDisplay } from "./taskDisplay.js";
import { createTestTasks } from "./testData.js";

class TaskController {
  constructor(regenTestData) {
    this.taskContainer = new TaskContainer();

    if (regenTestData) {
      localStorage.setItem("taskContainer", null);
      this.root = createTestTasks();
    } else {
      this.root = this.taskContainer.load();
    }

    document.addEventListener("visibilitychange", (e) => {
      this.taskContainer.save(this.root);
    });

    this.current = this.root;
    this.displayView = new TaskDisplay(this.#displayListeners);
    this.formView = null; // NOT IMPLEMENTED YET

    this.#refresh();
  }

  #isRoot() {
    return this.current === this.root;
  }

  #refresh() {
    this.current.orderSubtasks();
    this.displayView.display(this.current, this.#isRoot());
  }

  #displayListeners = {
    goDown: (idx) => this.#goDown(idx),
    goUp: () => this.#goUp(),
    removeSubtask: (idx) => this.#removeSubtask(idx),
    toggleComplete: (task) => this.#toggleComplete(task),
  };

  #goDown(idx) {
    this.current = this.current.getSubtask(idx);
    this.#refresh();
  }

  #goUp() {
    this.current = this.current.getParent(this.root);
    this.#refresh();
  }

  #removeSubtask(idx) {
    this.current.removeSubtask(idx);
    this.#refresh();
  }

  #toggleComplete(task) {
    task.markComplete();
    this.#refresh();
  }
}

export { TaskController };
