let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        displayTasks();
        saveToLocalStorage();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
    saveToLocalStorage();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
    saveToLocalStorage();
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    displayTasks();
    saveToLocalStorage();
}

function filterTasks(filter) {
    let filteredTasks = [];

    if (filter === 'all') {
        filteredTasks = tasks;
    } else if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    displayTasks(filteredTasks);
}

function displayTasks(displayedTasks = tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    displayedTasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('task');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(index));
        listItem.appendChild(checkbox);

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.classList.add('task-text');
        if (task.completed) {
            taskText.classList.add('completed');
        }
        listItem.appendChild(taskText);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(index));
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    tasks = storedTasks ? JSON.parse(storedTasks) : [];
    displayTasks();
}

// Initial display
loadFromLocalStorage();
// ... (rest of the existing code)

function updateTaskCounter() {
    const remainingTasks = tasks.filter(task => !task.completed).length;
    const taskCounter = document.getElementById('taskCounter');
    taskCounter.textContent = `${remainingTasks} ${remainingTasks === 1 ? 'task' : 'tasks'} remaining`;
}

function displayTasks(displayedTasks = tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    displayedTasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('task');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(index));
        listItem.appendChild(checkbox);

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskText.classList.add('task-text');
        if (task.completed) {
            taskText.classList.add('completed');
        }
        listItem.appendChild(taskText);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(index));
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });

    updateTaskCounter();
}

// ... (rest of the existing code)
function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    displayTasks();
    saveToLocalStorage();
}