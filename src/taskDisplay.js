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

  #removeSubtask(idx) {
    this.current.removeSubtask(idx);
    this.display();
  }

  #createIconButton(iconName, className, callback) {
    const button = document.createElement("div");
    button.classList.add(className);
    const icon = createIcon(iconName);
    button.appendChild(icon);
    button.addEventListener("click", callback);
    return button;
  }

  #createTaskCard(task, idx, className) {
    const taskCard = document.createElement("div");
    taskCard.classList.add(className);
    taskCard.setAttribute("data-child-index", idx);

    const downButton = this.#createIconButton("down", "down-btn", (e) =>
      this.#goDown(
        e.currentTarget.parentElement.getAttribute("data-child-index"),
      ),
    );

    const title = document.createElement("p");
    title.innerText = task.title;

    const due = document.createElement("p");
    due.innerText = format(task.dueDate, DATE_FORMAT);

    const priorityIcon = createPriorityIcon(task.priority);

    const deleteButton = this.#createIconButton("delete", "delete-btn", (e) =>
      this.#removeSubtask(
        e.currentTarget.parentElement.getAttribute("data-child-index"),
      ),
    );

    taskCard.appendChild(downButton);
    taskCard.appendChild(title);
    taskCard.appendChild(due);
    taskCard.appendChild(priorityIcon);
    taskCard.appendChild(deleteButton);

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

    const upButton = document.createElement("div");
    upButton.classList.add("up-btn");
    const upIcon = createIcon("up");
    upButton.appendChild(upIcon);
    upButton.addEventListener("click", (e) => this.#goUp());

    taskDetail.appendChild(upButton);

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
