class TaskDisplay {
  display = document.querySelector("#task-display");

  constructor(root) {
    this.root = root;
    this.current = root;
  }

  #createTaskCard(task) {
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    const title = document.createElement("p");
    title.innerText = task.title;

    const due = document.createElement("p");
    due.innerText = task.dueDate;

    taskCard.appendChild(title);
    taskCard.appendChild(due);

    return taskCard;
  }

  #createTaskDetail(task) {
    const taskDetail = document.createElement("div");
    taskDetail.classList.add("task-detail");

    for (const [k, v] of Object.entries(task)) {
      if (k === "subtasks") {
        continue;
      }
      const p = document.createElement("p");
      p.innerText = v;

      taskDetail.appendChild(p);
    }

    return taskDetail;
  }

  displayCurrent() {
    const taskDetail = this.#createTaskDetail(this.current);

    const subtaskContainer = document.createElement("div");
    subtaskContainer.classList.add("subtask-container");

    this.current.subtasks.forEach((subtask) => {
      const taskCard = this.#createTaskCard(subtask);
      subtaskContainer.appendChild(taskCard);
    });

    this.display.appendChild(taskDetail);
    this.display.appendChild(subtaskContainer);
  }
}

export { TaskDisplay };
