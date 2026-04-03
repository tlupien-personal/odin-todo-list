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
    this.dueDate = this.#validateDueDate(dueDate);
    this.priority = this.#validatePriority(priority);
    this.isComplete = isComplete;
    this.notes = notes;
    this.parent = parent;
    this.subtasks = [];
  }

  #validateDueDate(dueDate) {
    if (!dueDate) {
      return null;
    } else if (isDate(dueDate)) {
      return dueDate;
    } else {
      let dateString = dueDate.split("T")[0];
      dateString += "T00:00";
      return (this.dueDate = new Date(dateString));
    }
  }

  #validatePriority(priority) {
    if (priority > 3) {
      return 3;
    } else if (priority < 1) {
      return 1;
    } else {
      return priority;
    }
  }

  update({ title, description, dueDate, priority, notes }) {
    this.title = title;
    this.description = description;
    this.dueDate = this.#validateDueDate(dueDate);
    this.priority = this.#validatePriority(priority);
    this.notes = notes;
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
    this.subtasks.sort(
      (a, b) => compareAsc(a.dueDate, b.dueDate) || b.priority - a.priority,
    );
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
