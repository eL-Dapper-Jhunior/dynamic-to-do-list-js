// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // Load tasks from Local Storage
    function loadTasks() {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.forEach(taskText => addTask(taskText, false));
    }
  
    // Create the addTask Function
    function addTask(taskText, save = true) {
      // Retrieve and trim the value from the task input field
      const trimmedTaskText = taskText.trim();
  
      // Check if taskText is not empty
      if (trimmedTaskText === '') {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Please enter a task.';
        taskList.appendChild(errorMessage);
        return;
      }
  
      // Create a new li element
      const taskItem = document.createElement('li');
      taskItem.textContent = trimmedTaskText;
  
      // Create a new button element for removing the task
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.className = 'remove-btn';
  
      // Assign an onclick event to the remove button
      removeButton.onclick = function() {
        taskList.removeChild(taskItem);
        updateTasks();
      };
  
      // Append the remove button to the li element
      taskItem.appendChild(removeButton);
  
      // Append the li element to taskList
      taskList.appendChild(taskItem);
  
      // Clear the task input field
      taskInput.value = '';
  
      // Save tasks to Local Storage
      if (save) {
        updateTasks();
      }
    }
  
    // Update tasks array and save to Local Storage
    function updateTasks() {
      const tasks = [];
      const taskItems = taskList.children;
      for (let i = 0; i < taskItems.length; i++) {
        const taskItem = taskItems[i];
        const taskText = taskItem.textContent;
        const removeButton = taskItem.querySelector('.remove-btn');
        const taskWithoutRemoveButton = taskText.replace(removeButton.textContent, '').trim();
        tasks.push(taskWithoutRemoveButton);
      }
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    // Load tasks from Local Storage
    loadTasks();
  
    // Attach Event Listeners
    addButton.addEventListener('click', function() {
      addTask(taskInput.value);
    });
  
    taskInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        addTask(taskInput.value);
      }
    });
  });