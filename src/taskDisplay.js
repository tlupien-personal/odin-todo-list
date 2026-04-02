import { createIcon, createPriorityIcon } from "./util.js";
import { isDate, format } from "date-fns";

const DATE_FORMAT = "MM/dd/yyyy";

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
    due.innerText = format(task.dueDate, DATE_FORMAT);

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

    const priorityIcon = createPriorityIcon(task.priority);

    taskCard.appendChild(buttonSlot);
    taskCard.appendChild(title);
    taskCard.appendChild(due);
    taskCard.appendChild(priorityIcon);

    return taskCard;
  }

  #createSubtaskCards(container) {
    this.current.subtasks.forEach((subtask, idx) => {
      const taskCard = this.#createTaskCard(subtask, idx, "task-card");
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
      if (isDate(v)) {
        p.innerText = format(v, DATE_FORMAT);
      } else {
        p.innerText = v;
      }

      taskDetail.appendChild(p);
    }

    return taskDetail;
  }

  display() {
    this.body.innerText = "";
    if (this.current === this.root) {
      const h = document.createElement("h1");
      h.innerText = "Projects";
      this.body.appendChild(h);
    } else {
      const taskDetail = this.#createTaskDetail(this.current);
      this.body.appendChild(taskDetail);
    }

    const subtaskContainer = document.createElement("div");
    subtaskContainer.classList.add("subtask-container");
    this.#createSubtaskCards(subtaskContainer);
    this.body.appendChild(subtaskContainer);
  }
}

export { TaskDisplay };
