class TaskNode {
  constructor(
    title,
    description,
    dueDate,
    priority,
    isComplete,
    notes,
    parent,
    subtasks = [],
  ) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = isComplete;
    this.notes = notes;
    this.parent = parent;
    this.subtasks = subtasks;
  }

  static fromData(data) {
    const instance = new TaskNode();
    Object.assign(instance, data);
    return instance
  }

  addSubtask(task) {
    task.parent = this.id
    this.subtasks.push(task.id);
  }
}

export { TaskNode };
