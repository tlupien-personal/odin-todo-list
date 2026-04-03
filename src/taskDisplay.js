import { createIcon, createPriorityIcon } from "./util.js";
import { isDate, format } from "date-fns";

const DATE_FORMAT = "MM/dd/yyyy";

class TaskDisplay {
  body = document.querySelector("#task-display");

  constructor(listeners) {
    this.listeners = listeners;
  }

  #createIconButton(iconName, className, callback) {
    const button = document.createElement("div");
    button.classList.add("icon-btn");
    button.classList.add(className);
    const icon = createIcon(iconName);
    button.appendChild(icon);
    button.addEventListener("click", callback);
    return button;
  }

  #createSubtaskCard(subtask, idx, className) {
    const taskCard = document.createElement("div");
    taskCard.classList.add(className);
    taskCard.setAttribute("data-child-index", idx);

    const downButton = this.#createIconButton("down", "down-btn", (e) =>
      this.listeners.goDown(
        e.currentTarget.parentElement.getAttribute("data-child-index"),
      ),
    );

    const isComplete = this.#createIconButton(
      subtask.isComplete ? "checked" : "box",
      "check-btn",
      (e) => this.listeners.toggleComplete(subtask),
    );

    const title = document.createElement("p");
    title.innerText = subtask.title;

    const due = document.createElement("p");
    due.innerText = format(subtask.dueDate, DATE_FORMAT);

    const priorityIcon = createPriorityIcon(subtask.priority);

    const deleteButton = this.#createIconButton("delete", "delete-btn", (e) =>
      this.listeners.removeSubtask(
        e.currentTarget.parentElement.getAttribute("data-child-index"),
      ),
    );

    taskCard.appendChild(downButton);
    taskCard.appendChild(isComplete);
    taskCard.appendChild(title);
    taskCard.appendChild(due);
    taskCard.appendChild(priorityIcon);
    taskCard.appendChild(deleteButton);

    return taskCard;
  }

  #createSubtaskCards(container, task) {
    task.subtasks.forEach((subtask, idx) => {
      const taskCard = this.#createSubtaskCard(subtask, idx, "task-card");
      container.appendChild(taskCard);
    });
  }

  #createTaskDetail(task) {
    const taskDetail = document.createElement("div");
    taskDetail.classList.add("task-detail");

    const upButton = this.#createIconButton("up", "up-btn", (e) =>
      this.listeners.goUp(),
    );
    taskDetail.appendChild(upButton);

    const editButton = this.#createIconButton("edit", "edit-btn", (e) =>
      console.log("EDIT NOT YET IMPLEMENTED!"),
    );
    taskDetail.appendChild(editButton);

    const priorityIcon = createPriorityIcon(task.priority);
    taskDetail.appendChild(priorityIcon);

    const title = document.createElement("h2");
    title.innerText = task.title;
    taskDetail.appendChild(title);

    const isComplete = this.#createIconButton(
      task.isComplete ? "checked" : "box",
      "check-btn",
      (e) => this.listeners.toggleComplete(task),
    );
    taskDetail.appendChild(isComplete);

    const due = document.createElement("p");
    due.innerText = `Due: ${format(task.dueDate, DATE_FORMAT)}`;
    taskDetail.appendChild(due);

    const desc = document.createElement("p");
    desc.innerText = task.description;
    taskDetail.appendChild(desc);

    const notes = document.createElement("p");
    notes.innerText = task.notes;
    taskDetail.appendChild(notes);

    return taskDetail;
  }

  display(task, isRoot) {
    this.body.innerText = "";
    if (isRoot) {
      const h = document.createElement("h1");
      h.innerText = "Projects";
      this.body.appendChild(h);
    } else {
      const taskDetail = this.#createTaskDetail(task);
      this.body.appendChild(taskDetail);
      if (task.subtasks.length > 0) {
        const subtaskHeading = document.createElement("h2");
        subtaskHeading.innerText = "Subtasks";
        this.body.appendChild(subtaskHeading);
      }
    }

    const subtaskContainer = document.createElement("div");
    subtaskContainer.classList.add("subtask-container");
    this.#createSubtaskCards(subtaskContainer, task);
    this.body.appendChild(subtaskContainer);
  }
}

export { TaskDisplay };
