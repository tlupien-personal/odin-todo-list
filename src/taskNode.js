class TaskNode {
  constructor({
    id,
    title,
    description,
    dueDate,
    priority,
    isComplete,
    notes,
    parent,
  }) {
    this.id = id ?? crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = isComplete;
    this.notes = notes;
    this.parent = parent;
    this.subtasks = [];
  }

  addSubtask(task) {
    task.parent = this.id;
    this.subtasks.push(task);
  }
}

export { TaskNode };
