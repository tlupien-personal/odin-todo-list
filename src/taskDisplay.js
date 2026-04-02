import { createIcon } from "./util.js";

class TaskDisplay {
  body = document.querySelector("#task-display");

  constructor(root) {
    this.root = root;
    this.current = root;
  }

  #goDown(idx) {
    this.current = this.current.getSubtask(idx);
    this.display();
  }

  #goUp() {
    this.current = this.current.getParent(this.root);
    this.display();
  }

  #createTaskCard(task, idx, className) {
    const taskCard = document.createElement("div");
    taskCard.classList.add(className);

    const title = document.createElement("p");
    title.innerText = task.title;

    const due = document.createElement("p");
    due.innerText = task.dueDate;

    const buttonSlot = document.createElement("div");
    buttonSlot.classList.add("down-btn");
    buttonSlot.setAttribute("data-child-index", idx);

    if (task.subtasks.length > 0) {
      const downIcon = createIcon("down");
      buttonSlot.appendChild(downIcon);
      buttonSlot.addEventListener("click", (e) =>
        this.#goDown(e.currentTarget.getAttribute("data-child-index")),
      );
    }


    taskCard.appendChild(title);
    taskCard.appendChild(due);
    taskCard.appendChild(buttonSlot);

    return taskCard;
  }

  #createSubtaskCards(container, className) {
    this.current.subtasks.forEach((subtask, idx) => {
      const taskCard = this.#createTaskCard(subtask, idx, className);
      container.appendChild(taskCard);
    });
  }

  #createTaskDetail(task) {
    const taskDetail = document.createElement("div");
    taskDetail.classList.add("task-detail");

    const buttonSlot = document.createElement("div");
    buttonSlot.classList.add("up-btn");
    const upIcon = createIcon("up");
    buttonSlot.appendChild(upIcon);
    buttonSlot.addEventListener("click", (e) => this.#goUp());

    taskDetail.appendChild(buttonSlot);

    for (const [k, v] of Object.entries(task)) {
      if (["id", "parent", "subtasks"].includes(k)) {
        continue;
      }
      const p = document.createElement("p");
      p.innerText = v;

      taskDetail.appendChild(p);
    }

    return taskDetail;
  }

  #displayCurrent() {
    const taskDetail = this.#createTaskDetail(this.current);

    const subtaskContainer = document.createElement("div");
    subtaskContainer.classList.add("subtask-container");

    this.#createSubtaskCards(subtaskContainer, "task-card");

    this.body.appendChild(taskDetail);
    this.body.appendChild(subtaskContainer);
  }

  #displayRoot() {
    const projectGrid = document.createElement("div");
    projectGrid.classList.add("project-grid");

    this.#createSubtaskCards(projectGrid, "project-card");

    this.body.appendChild(projectGrid);
  }

  display() {
    this.body.innerText = "";
    if (this.current === this.root) {
      this.#displayRoot();
    } else {
      this.#displayCurrent();
    }
  }
}

export { TaskDisplay };
