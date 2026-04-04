import { createPriorityIcon, createIconButton } from "./util.js";
import { format } from "date-fns";

const DATE_FORMAT = "MM/dd/yyyy";

class TaskDisplay {
  body = document.querySelector("#task-display");

  constructor(listeners) {
    this.listeners = listeners;
  }

  #createSubtaskCard(subtask, idx, className) {
    const taskCard = document.createElement("div");
    taskCard.classList.add(className);
    taskCard.setAttribute("data-child-index", idx);

    const downButton = createIconButton("down", "down-btn", (e) =>
      this.listeners.goDown(
        e.currentTarget.parentElement.getAttribute("data-child-index"),
      ),
    );

    const isComplete = createIconButton(
      subtask.isComplete ? "checked" : "box",
      "check-btn",
      (e) => this.listeners.toggleComplete(subtask),
    );

    const title = document.createElement("p");
    title.innerText = subtask.title;

    const due = document.createElement("p");
    due.innerText = format(subtask.dueDate, DATE_FORMAT);

    const priorityIcon = createPriorityIcon(subtask.priority);

    const deleteButton = createIconButton("delete", "delete-btn", (e) =>
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

    const upButton = createIconButton("up", "up-btn", (e) =>
      this.listeners.goUp(),
    );
    taskDetail.appendChild(upButton);

    const editButton = createIconButton("edit", "edit-btn", (e) =>
      this.listeners.showEdit(task),
    );
    taskDetail.appendChild(editButton);

    const priorityIcon = createPriorityIcon(task.priority);
    taskDetail.appendChild(priorityIcon);

    const title = document.createElement("h2");
    title.innerText = task.title;
    taskDetail.appendChild(title);

    const isComplete = createIconButton(
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

  #createHeading (isRoot) {
    const headingContainer = document.createElement("div");
    headingContainer.classList.add("heading-container")
    const addButton = createIconButton("add", "add-btn", (e) => this.listeners.showAdd())

    let heading;
    if (isRoot) {
      heading = document.createElement("h1");
      heading.innerText = "Projects";
    } else {
      heading = document.createElement("h3");
      heading.innerText = "Subtasks"
    }

    headingContainer.appendChild(heading);
    headingContainer.appendChild(addButton);

    return headingContainer
  }

  display(task, isRoot) {
    this.body.innerText = "";

    if (!isRoot) {
      const taskDetail = this.#createTaskDetail(task);
      this.body.appendChild(taskDetail);
    }

    const heading = this.#createHeading(isRoot);
    this.body.appendChild(heading);

    const subtaskContainer = document.createElement("div");
    subtaskContainer.classList.add("subtask-container");
    this.#createSubtaskCards(subtaskContainer, task);
    this.body.appendChild(subtaskContainer);
  }
}

export { TaskDisplay };
