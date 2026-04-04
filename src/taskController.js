import { TaskContainer } from "./taskContainer.js";
import { TaskDisplay } from "./taskDisplay.js";
import { TaskForm } from "./taskForm.js";
import { TaskNode } from "./taskNode.js";

class TaskController {
  constructor() {
    this.taskContainer = new TaskContainer();
    this.root = this.taskContainer.load();

    document.addEventListener("visibilitychange", (e) => {
      this.taskContainer.save(this.root);
    });

    this.current = this.root;
    this.displayView = new TaskDisplay(this.#displayListeners);
    this.formView = new TaskForm(this.#formListeners);

    this.#refresh();
  }

  #isRoot() {
    return this.current === this.root;
  }

  #refresh() {
    this.current.orderSubtasks();
    this.displayView.display(this.current, this.#isRoot());
    this.formView.unblock();
  }

  #displayListeners = {
    goDown: (idx) => this.#goDown(idx),
    goUp: () => this.#goUp(),
    removeSubtask: (idx) => this.#removeSubtask(idx),
    toggleComplete: (task) => this.#toggleComplete(task),
    showEdit: (task) => this.#showEdit(task),
    showAdd: (task) => this.#showAdd(task),
  };

  #formListeners = {
    close: () => this.#close(),
    save: (data, task) => this.#save(data, task),
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

  #showEdit(task) {
    this.formView.showEditForm(task);
    this.formView.block();
  }

  #showAdd() {
    this.formView.showAddForm();
    this.formView.block();
  }

  #close() {
    this.#refresh();
  }

  #save(data, task) {
    if (!task) {
      const newTask = new TaskNode(data);
      this.current.addSubtask(newTask);
    } else {
      task.update(data);
    }
    this.#refresh();
  }
}

export { TaskController };
