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

  addSubtask(node) {
    node.parent = this.id;
    this.subtasks.push(node);
  }

  removeSubtask(node) {
    node.parent = null;
    const subtaskIndex = this.subtasks.findIndex(
      (subtask) => subtask.id === node.id,
    );
    this.subtasks.splice(subtaskIndex, 1);
  }

  getSubtask(idx) {
    return this.subtasks[idx];
  }

  getParent(node) {
    if (node.id === this.parent) {
      return node;
    } else if (node.subtasks.length !== 0) {
      for (const child of node.subtasks) {
        const result = this.getParent(child);
        if (result) return result;
      }
    } else {
      return null;
    }
  }
}

export { TaskNode };
