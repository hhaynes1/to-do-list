import Project from './Project.js';
import Task from './Task.js';
const d = document;

export default class AppUI {
    constructor() {
        this.projectList = [];
    }

    // logProjects() {
    //     console.log(this.projectList);
    // }

    // create DOM elements
    initialize() {
        console.log('initialization');
        const contentDiv = d.getElementById('content');

        const projectHeaderDiv = Object.assign(
            d.createElement('div'), { className: 'content-header' }
        );
        contentDiv.appendChild(projectHeaderDiv);

        const newProjectExpandButton = Object.assign(
            d.createElement('button'), { className: 'new-project-expand-button', textContent: '+' }
        );
        projectHeaderDiv.appendChild(newProjectExpandButton);
        newProjectExpandButton.addEventListener('click', () => {
            this.toggleProjectHeaderVisibility();
        });

        const projectNameInput = Object.assign(
            d.createElement('input'), { className: 'project-name-input', type: 'text', placeholder: 'New Sticky' }
        );
        projectHeaderDiv.appendChild(projectNameInput);

        const newProjectEnterButton = Object.assign(
            d.createElement('button'), { className: 'new-project-enter-button', textContent: 'Add' }
        );
        projectHeaderDiv.appendChild(newProjectEnterButton);
        newProjectEnterButton.addEventListener('click', () => {
            // if not empty, create new project with given name
            if (projectNameInput.value != '') {
                this.createNewProject(projectContainerDiv, projectNameInput.value);
                projectNameInput.value = '';
            }
        });

        // container for all projects
        const projectContainerDiv = Object.assign(
            d.createElement('div'), { className: 'project-container' }
        );
        contentDiv.appendChild(projectContainerDiv);
    }

    createNewProject(parentContainer, newProjectName) {
        // create Project object
        const newProject = new Project(newProjectName);

        // set new project index
        newProject.setIndex(this.projectList.length);
        // console.log(`new project index: ${newProject.getIndex()}`);
        this.projectList.push(newProject);

        // logging
        // this.logProjects();

        // create DOM elements
        const newProjectDiv = Object.assign(
            d.createElement('div'), { className: 'project-div' }
        );
        parentContainer.appendChild(newProjectDiv);
        this.makeElementDraggable(newProjectDiv);

        // new project header (title + taskButton)
        const newProjectHeader = Object.assign(
            d.createElement('div'), { className: 'task-header' }
        );
        newProjectDiv.appendChild(newProjectHeader);

        const projectMinusButton = Object.assign(
            d.createElement('button'), { className: 'project-minus-button', textContent: 'x' }
        );
        projectMinusButton.addEventListener('click', () => {
            // remove from project list
            this.removeProject(newProject.getIndex());

            // remove project DOM
            newProjectDiv.remove();
        })
        newProjectHeader.appendChild(projectMinusButton);

        const newProjectTitle = Object.assign(d.createElement('h3'),
            { className: 'task-title', textContent: `${newProject.getName()}`, contentEditable: false }
        );
        newProjectHeader.appendChild(newProjectTitle);

        const newTaskDiv = Object.assign(
            d.createElement('div'), { className: 'new-task-div' }
        );
        newProjectDiv.appendChild(newTaskDiv);

        const newTaskInput = Object.assign(
            d.createElement('input'), { className: 'new-task-input', placeholder: 'New Task' }
        );
        newTaskDiv.appendChild(newTaskInput);

        const newTaskButton = Object.assign(
            d.createElement('button'), { className: 'new-task-button', textContent: '+' }
        );
        newTaskDiv.appendChild(newTaskButton);
        newTaskButton.addEventListener('click', () => {
            this.createNewTask(newProjectDiv, newProject, newTaskInput.value);
            newTaskInput.value = '';
            // console.log(newProject.getTasks());
        })
    }

    removeProject(index) {
        this.projectList.splice(index, 1);
        // console.log(`removed index: ${index}, `);
        this.updateProjectIndex();
    }

    updateProjectIndex() {
        for (let i = 0; i < this.projectList.length; i++) {
            this.projectList[i].index = i;
        }
        // this.logProjects();
    }

    createNewTask(parentContainer, parentProject, newTaskName) {

        // do nothing, if no task
        if (!newTaskName) {
            return;
        }

        // create Task object
        const newTask = new Task(newTaskName);
        // console.log('new task created!');
        parentProject.addTask(newTask);

        // set new task index
        newTask.setIndex(parentProject.getTasks.length);
        // this.logProjects();

        // create DOM elements
        const taskDiv = Object.assign(
            d.createElement('div'), { className: 'task-div' }
        );
        parentContainer.appendChild(taskDiv);

        // checkbox 'done'
        // const taskCheckbox = Object.assign(
        //     d.createElement('input'), { className: 'task-checkbox', type: 'checkbox' }
        // );
        // taskDiv.appendChild(taskCheckbox);
        // taskCheckbox.addEventListener('change', () => {
        //     if (taskCheckbox.checked) {
        //         taskDescription.style.textDecoration = 'line-through';
        //     } else {
        //         taskDescription.style.textDecoration = 'none';
        //     }
        // })

        // task description
        const taskDescription = Object.assign(
            d.createElement('p'), { className: 'task-description', textContent: `${newTaskName}` }
        );
        taskDescription.addEventListener('click', () => {
            taskDescription.classList.toggle('strikethrough');
        })
        taskDiv.appendChild(taskDescription);

        // priority
        const taskPriorityButton = Object.assign(d.createElement('button'),
            { className: 'task-priority-button', textContent: 'High' }
        );
        taskDiv.appendChild(taskPriorityButton);
        taskPriorityButton.addEventListener('click', () => {
            if (taskPriorityButton.textContent === 'High') {
                // High to Med
                newTask.setPriority('Med');
                taskPriorityButton.textContent = 'Med';
                taskPriorityButton.style.backgroundColor = '#FCE205';
            } else if (taskPriorityButton.textContent === 'Med') {
                // Med to low
                newTask.setPriority('Low');
                taskPriorityButton.textContent = 'Low';
                taskPriorityButton.style.backgroundColor = '#39E75F';
            } else {
                // Low to High
                newTask.setPriority('High');
                taskPriorityButton.textContent = 'High';
                taskPriorityButton.style.backgroundColor = '#E3242B';
            }
        })

        const taskMinusButton = Object.assign(
            d.createElement('button'), { className: 'task-minus-button', textContent: '-' }
        );
        taskDiv.appendChild(taskMinusButton);
        taskMinusButton.addEventListener('click', () => {
            // remove this task from parent project
            parentProject.removeTask(newTask);

            // remove DOM element for this task
            taskDiv.remove();
        })
    }

    toggleProjectHeaderVisibility() {
        if (d.querySelector('.new-project-expand-button').textContent === '+') {
            d.querySelector('.project-name-input').style.visibility = 'visible';
            d.querySelector('.new-project-enter-button').style.visibility = 'visible';
            d.querySelector('.new-project-expand-button').textContent = '-';
        } else {
            d.querySelector('.project-name-input').style.visibility = 'hidden';
            d.querySelector('.project-name-input').value = '';
            d.querySelector('.new-project-enter-button').style.visibility = 'hidden';
            d.querySelector('.new-project-expand-button').textContent = '+';
        }
    }

    makeElementDraggable(element) {
        let pos1 = 0;
        let pos2 = 0;
        let pos3 = 0;
        let pos4 = 0;
        element.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            // e.preventDefault();

            // starting positiion
            pos3 = e.clientX;
            pos4 = e.clientY;
            d.onmouseup = closeDragElement;

            // call function on cursor move
            d.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e.preventDefault();

            // calculate new cursor position
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            // set new position
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // release event on mouse release
            d.onmouseup = null;
            d.onmousemove = null;
        }
    }
}