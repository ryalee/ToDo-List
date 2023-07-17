const inputElement = document.querySelector('.newTask-input');
const addTaskButton = document.querySelector('.newTask-button');

const validateInput = () => {
  return inputElement.value.trim().length > 0;
}

const handleAddTask = () => {
  const inputIsValid = validateInput();

  if(!inputIsValid) {
    return inputElement.classList.add('error');
  }

  const taskItemDisplay = document.createElement('div');
  taskItemDisplay.classList.add('taskItem');

  const taskContent = document.createElement('p');
  taskContent.innerText = inputElement.value;
};

const handleInputChange = () => {
  const inputIsValid = validateInput();

  if(inputIsValid){
    return inputElement.classList.remove('error');
  }
}

addTaskButton.addEventListener('click', () => handleAddTask());

inputElement.addEventListener('change', () => handleInputChange());