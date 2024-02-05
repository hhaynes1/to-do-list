export default class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
        this.index;
    }

    setIndex(newIndex) {
        this.index = newIndex;
    }

    getIndex() {
        return this.index;
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
        return this.tasks;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    getTasks() {
        return this.tasks;
    }

    getName() {
        return this.title;
    }
}