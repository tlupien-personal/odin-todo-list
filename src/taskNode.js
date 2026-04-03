import { compareAsc, isDate } from "date-fns";

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
    this.dueDate = isDate(dueDate) ? dueDate : new Date(dueDate);
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

  removeSubtask(idx) {
    const node = this.getSubtask(idx);
    node.parent = null;
    this.subtasks.splice(idx, 1);
  }

  getSubtask(idx) {
    return this.subtasks[idx];
  }

  orderSubtasks() {
    this.subtasks.sort((a, b) => compareAsc(a.dueDate, b.dueDate) || a.priority - b.priority);
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

  markComplete() {
    this.isComplete = !this.isComplete;
  }
}

export { TaskNode };
