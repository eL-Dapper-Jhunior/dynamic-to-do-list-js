document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // Create the addTask function
    function addTask() {
      // Retrieve and trim the value from the task input field
      const taskText = taskInput.value.trim();
  
      // Check if taskText is not empty
      if (taskText !== '') {
        // Create a new li element
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
  
        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
  
        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
          taskList.removeChild(taskItem);
        };
  
        // Append the remove button to the li element
        taskItem.appendChild(removeButton);
  
        // Append the li element to taskList
        taskList.appendChild(taskItem);
  
        // Clear the task input field
        taskInput.value = '';
      }
    }
  
    // Add an event listener to addButton
    addButton.addEventListener('click', addTask);
  
    // Add an event listener to taskInput for the 'keypress' event
    taskInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        addTask();
      }
    });
  });