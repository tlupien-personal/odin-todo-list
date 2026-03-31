class TaskNode {
  constructor(title, description, dueDate, priority, isComplete, notes) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = isComplete;
    this.notes = notes;
    this.subTasks = {};
    this.parent = null;
  }

  addSubTask(task) {
    task.parent = this.id;
    this.subTasks[task.id] = task;
  }

  removeSubTask(id) {
    this.subTasks.removeTask(id);
  }
}

export {
  TaskNode
}