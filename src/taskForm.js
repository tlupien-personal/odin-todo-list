import { format } from "date-fns";
import { createIconButton } from "./util.js";

class TaskForm {
  body = document.querySelector("#task-display");

  constructor(listeners) {
    this.listeners = listeners;
  }

  #createLabel(id, prettyName) {
    const label = document.createElement("label");
    label.setAttribute("for", id);
    label.innerText = prettyName;
    return label;
  }

  #createInput(id, prettyName, type, value) {
    const chunk = document.createElement("div");
    chunk.classList.add("form-chunk");

    const label = this.#createLabel(id, prettyName);
    chunk.appendChild(label);

    const input = document.createElement("input");
    input.id = id;
    input.setAttribute("name", id);
    input.setAttribute("type", type);
    input.value = value;
    chunk.appendChild(input);

    return chunk;
  }

  #createTextarea(id, prettyName, rows, cols, value) {
    const chunk = document.createElement("div");
    chunk.classList.add("form-chunk");

    const label = this.#createLabel(id, prettyName);
    chunk.appendChild(label);

    const textarea = document.createElement("textarea");
    textarea.id = id;
    textarea.setAttribute("name", id);
    textarea.setAttribute("rows", rows);
    textarea.setAttribute("cols", cols);
    textarea.value = value;
    chunk.appendChild(textarea);

    return chunk;
  }

  #createForm(task) {
    if (!task) {
      task = {
        title: "",
        dueDate: Date.now(),
        priority: 3,
        description: "",
        notes: "",
      };
    }

    const form = document.createElement("form");
    form.id = "task-form";

    const title = this.#createInput("title", "Title", "text", task.title);
    form.appendChild(title);

    const specialRow = document.createElement("div");
    specialRow.classList.add("form-row");

    const due = this.#createInput(
      "dueDate",
      "Due",
      "date",
      format(task.dueDate, "yyyy-MM-dd"),
    );
    specialRow.appendChild(due);

    const priority = this.#createInput(
      "priority",
      "Priority",
      "number",
      task.priority,
    );
    priority.lastChild.addEventListener("input", (e) => {
      let value = parseInt(e.currentTarget.value);
      if (value > 3) e.currentTarget.value = 3;
      if (value < 1) e.currentTarget.value = 1;
    });
    specialRow.appendChild(priority);
    form.appendChild(specialRow);

    const desc = this.#createTextarea(
      "description",
      "Description",
      3,
      20,
      task.description,
    );
    form.appendChild(desc);

    const notes = this.#createTextarea("notes", "Notes", 10, 20, task.notes);
    form.appendChild(notes);

    return form;
  }

  #createControls(task) {
    const saveButton = createIconButton("save", "save-btn", (e) => {
      const form = document.querySelector("#task-form");
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      this.listeners.save(data, task);
    });

    const closeButton = createIconButton("close", "close-btn", (e) =>
      this.listeners.close(),
    );

    const controls = document.createElement("div");
    controls.classList.add("form-buttons");
    controls.appendChild(saveButton);
    controls.appendChild(closeButton);
    return controls;
  }

  #createFormContainer(task) {
    const taskFormContainer = document.createElement("div");
    taskFormContainer.classList.add("task-form-container");

    const controls = this.#createControls(task);
    const form = this.#createForm(task);
    taskFormContainer.appendChild(controls);
    taskFormContainer.appendChild(form);

    return taskFormContainer;
  }

  showEditForm(task) {
    const taskDetail = document.querySelector(".task-detail");
    taskDetail.remove();
    const taskFormContainer = this.#createFormContainer(task);
    this.body.prepend(taskFormContainer);
  }

  showAddForm() {
    if (!document.querySelector(".subtask-container>.task-form-container")) {
      const subtaskContainer = document.querySelector(".subtask-container");
      const taskFormContainer = this.#createFormContainer();
      subtaskContainer.prepend(taskFormContainer);
    }
  }
}

export { TaskForm };
