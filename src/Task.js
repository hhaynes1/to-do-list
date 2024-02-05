export default class Task {
    constructor(title) {
        this.title = title;
        this.priority = 'High';
        this.index;
    }

    setIndex(newIndex) {
        this.index = newIndex;
    }

    getIndex() {
        return this.index;
    }

    setPriority(newPriority) {
        this.priority = newPriority;
    }
}