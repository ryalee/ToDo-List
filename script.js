const inputElement = document.querySelector('.newTask-input');
const addTaskButton = document.querySelector('.newTask-button');

const tasksDisplay = document.querySelector('.task-display');

const validateInput = () => {
  return inputElement.value.trim().length > 0;
}

const handleAddTask = () => {
  const inputIsValid = validateInput();

  if (!inputIsValid) {
    return inputElement.classList.add('error');
  }

  const taskItemDisplay = document.createElement('div');
  taskItemDisplay.classList.add('taskItem');

  const taskContent = document.createElement('p');
  taskContent.innerText = inputElement.value;

  taskContent.addEventListener('click', () => handleClick(taskContent));

  const deleteItem = document.createElement('i');
  deleteItem.classList.add('far');
  deleteItem.classList.add('fa-trash-alt');

  deleteItem.addEventListener('click', () => handleDeleteClick(taskItemDisplay, taskContent));

  taskItemDisplay.appendChild(taskContent);
  taskItemDisplay.appendChild(deleteItem);

  tasksDisplay.appendChild(taskItemDisplay);

  inputElement.value = '';

  updateLocalStorage();
};

function handleClick(taskContent) {
  const tasks = tasksDisplay.childNodes;

  for (const task of tasks) {
    const currentTaskIsClicked = task.firstChild.isSameNode(taskContent);

    if (currentTaskIsClicked) {
      task.firstChild.classList.toggle("completed");
    }
  }

  updateLocalStorage();
}

function handleDeleteClick(taskItemDisplay, taskContent) {
  const tasks = tasksDisplay.childNodes;

  for (const task of tasks) {
    const currentTaskIsClicked = task.firstChild.isSameNode(taskContent);

    if (currentTaskIsClicked) {
      taskItemDisplay.remove();
    }
  }

  updateLocalStorage();
}

function handleInputChange() {
  const inputIsValid = validateInput();

  if (inputIsValid) {
    return inputElement.classList.remove('error');
  }
}

function updateLocalStorage() {
  const tasks = tasksDisplay.childNodes;

  const localStorageTasks = [...tasks].map(task => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains('completed');

    return {description: content.innerText, isCompleted};
  });

  localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
}

function refreshTaskStorage() {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

  if(!tasksFromLocalStorage) return;

  for (const task of tasksFromLocalStorage) {
    const taskItemDisplay = document.createElement('div');
    taskItemDisplay.classList.add('taskItem');

    const taskContent = document.createElement('p');
    taskContent.innerText = task.description;

    if (task.isCompleted) {
      taskContent.classList.add('completed');
    }

    taskContent.addEventListener('click', () => handleClick(taskContent));

    const deleteItem = document.createElement('i');
    deleteItem.classList.add('far');
    deleteItem.classList.add('fa-trash-alt');

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemDisplay, taskContent));

    taskItemDisplay.appendChild(taskContent);
    taskItemDisplay.appendChild(deleteItem);

    tasksDisplay.appendChild(taskItemDisplay);
  }
}

refreshTaskStorage(); 

addTaskButton.addEventListener('click', () => handleAddTask());

inputElement.addEventListener('change', () => handleInputChange());