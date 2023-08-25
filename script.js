const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
let taskCount = 0; // Initialize task count
let tasks = []; // Initialize an array to store tasks

addButton.addEventListener('click', addTask);

// Load tasks from local storage when the page loads
window.addEventListener('load', () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = savedTasks.split('|'); // Split stored tasks by separator
        tasks.forEach((taskText, index) => {
            const taskItem = createTaskItem(taskText, index + 1);
            taskList.appendChild(taskItem);
        });
        taskCount = tasks.length; // Update task count
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        taskCount++;
        tasks.push(taskText); // Add task to the tasks array
        localStorage.setItem('tasks', tasks.join('|')); // Update local storage
        const taskItem = createTaskItem(taskText, taskCount);
        taskList.appendChild(taskItem);
        taskInput.value = '';
    }
}

function createTaskItem(taskText, count) {
    const li = document.createElement('li');
    
    const taskTextElement = document.createElement('span');
    taskTextElement.textContent = `${count}. ${taskText}`;
    li.appendChild(taskTextElement);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(taskTextElement));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(li));

    li.appendChild(editButton);
    li.appendChild(deleteButton);

    return li;
}

function editTask(taskTextElement) {
    const taskText = taskTextElement.textContent.split('. ')[1];
    const newTaskText = prompt('Edit task:', taskText);
    if (newTaskText !== null) {
        taskTextElement.textContent = `${taskCount}. ${newTaskText}`;
        updateTasksArray(); // Update tasks array after editing
    }
}

function deleteTask(taskItem) {
    const confirmation = confirm("Are you sure you want to delete this task?");
    if (confirmation) {
        taskCount--;
        taskList.removeChild(taskItem);
        updateTaskCount();
        updateTasksArray(); // Update tasks array after deletion
    }
}

function updateTaskCount() {
    const taskItems = taskList.querySelectorAll('li');
    taskItems.forEach((taskItem, index) => {
        taskItem.firstChild.textContent = `${index + 1}. ${taskItem.firstChild.textContent.split('. ')[1]}`;
    });
}

function updateTasksArray() {
    tasks = Array.from(taskList.querySelectorAll('li')).map(taskItem => taskItem.firstChild.textContent.split('. ')[1]);
    localStorage.setItem('tasks', tasks.join('|')); // Update local storage
}
