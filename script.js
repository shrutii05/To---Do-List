// Get the task list element
const taskList = document.getElementById('task-list');

// Get the task input element
const taskInput = document.getElementById('task-input');

// Get the add task button element
const addTaskBtn = document.getElementById('add-task-btn');

// Get the undo button element
const undoBtn = document.getElementById('undo-btn');

// Get the redo button element
const redoBtn = document.getElementById('redo-btn');

// Get the font select element
const fontSelect = document.getElementById('font-select');

// Get the size select element
const sizeSelect = document.getElementById('size-select');

// Get the color picker element
const colorPicker = document.getElementById('color-picker');

// Initialize an empty array to store tasks
let tasks = [];

// Initialize an empty array to store deleted tasks
let deletedTasks = [];

// Function to add a task to the task list
function addTask() {
  // Get the task text from the input field
  const taskText = taskInput.value.trim();

  // Check if the task text is not empty
  if (taskText !== '') {
    // Create a new task object
    const task = {
      text: taskText,
      font: fontSelect.value,
      size: sizeSelect.value,
      color: colorPicker.value,
    };

    // Add the task to the tasks array
    tasks.push(task);

    // Clear the input field
    taskInput.value = '';

    // Update the task list
    updateTaskList();
  }
}

// Function to update the task list
function updateTaskList() {
  // Clear the task list element
  taskList.innerHTML = '';

  // Loop through the tasks array
  tasks.forEach((task, index) => {
    // Create a new list item element
    const listItem = document.createElement('li');

    // Create a new span element for the task text
    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = task.text;
    taskTextSpan.style.fontFamily = task.font;
    taskTextSpan.style.fontSize = `${task.size}px`;
    taskTextSpan.style.color = task.color;

    // Create a new button element for deleting the task
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => deleteTask(index));

    // Add the task text span and delete button to the list item
    listItem.appendChild(taskTextSpan);
    listItem.appendChild(deleteBtn);

    // Add the list item to the task list
    taskList.appendChild(listItem);
  });
}

// Function to delete a task from the task list
function deleteTask(index) {
  // Add the task to the deleted tasks array
  deletedTasks.push(tasks[index]);

  // Remove the task from the tasks array
  tasks.splice(index, 1);

  // Update the task list
  updateTaskList();
}

// Function to undo a deleted task
function undoTask() {
  // Check if there are deleted tasks
  if (deletedTasks.length > 0) {
    // Get the last deleted task
    const task = deletedTasks.pop();

    // Add the task to the tasks array
    tasks.push(task);

    // Update the task list
    updateTaskList();
  }
}

// Function to redo a task
function redoTask() {
  // Check if there are tasks
  if (tasks.length > 0) {
    // Get the last task
    const task = tasks.pop();

    // Add the task to the deleted tasks array
    deletedTasks.push(task);

    // Update the task list
    updateTaskList();
  }
}

// Add event listeners to the add task button, undo button, and redo button
addTaskBtn.addEventListener('click', addTask);
undoBtn.addEventListener('click', undoTask);
redoBtn.addEventListener('click', redoTask);

// Update the task list initially
updateTaskList();