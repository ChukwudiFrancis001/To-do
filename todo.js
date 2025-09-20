// DOM Elements
const taskFormElement = document.getElementById("taskForm");
const taskInputElement = document.getElementById("taskInput");
const taskListElement = document.getElementById("taskList");
const taskCounterElement = document.getElementById("taskCounter");

// Implementation of localStorage
function saveTasks() {
  const tasks = [];
  const taskItems = taskListElement.getElementsByTagName("li");
  for (let task of taskItems) {
    tasks.push({
      text: task.querySelector(".taskText").textContent,
      completed: task.classList.contains("completed"),
    });
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addTask(task.text, task.completed);
  });
}

// Add Task (CREATE)
taskFormElement.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent form reload
  const taskText = taskInputElement.value.trim();
  if (taskText === "") return;

  addTask(taskText);
  taskInputElement.value = "";
  updateCounter();
});

// Function to create and display a task (READ)
function addTask(taskText) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.className = "taskText";
  span.textContent = taskText;
  li.appendChild(span);

  // Toggle completed by clicking text
  span.addEventListener("click", function () {
    li.classList.toggle("completed");
    updateCounter();
    saveTasks();
  });

  // Update (EDIT)
  const editBtn = document.createElement("button");
  editBtn.className = "editBtn";
  editBtn.textContent = "Edit";
  li.appendChild(editBtn);
  editBtn.addEventListener("click", function () {
    const newTask = prompt("Edit task:", span.textContent);
    if (newTask !== "") {
      span.textContent = newTask.trim();
    }
    saveTasks();
  });

  // Delete (DELETE)
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "deleteBtn";
  deleteBtn.textContent = "Delete";
  li.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", function () {
    li.remove();
    updateCounter();
    saveTasks();
  });

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "taskCheckbox";
  checkbox.addEventListener("change", function () {
    li.classList.toggle("completed", checkbox.checked);
    updateCounter();
    saveTasks();
  });
  li.appendChild(checkbox);

  // Append all to list item
  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  li.appendChild(checkbox);

  // Append list item to the task list
  taskListElement.appendChild(li);
  saveTasks();

  // Update counter
  function updateCounter() {
    const tasks = taskListElement.getElementsByTagName("li");
    let completedTasks = 0,
      uncompletedTasks = 0;
    for (let task of tasks) {
      if (task.classList.contains("completed")) {
        completedTasks++;
      } else {
        uncompletedTasks++;
      }
    }
    taskCounterElement.textContent = `Completed: ${completedTasks} | Uncompleted: ${uncompletedTasks}`;
  }

  // Clear input
  taskInputElement.value = "";
}

//   const editBtn = document.createElement("button");
//   editBtn.className = "editBtn";
//   editBtn.textContent = "Edit";
//   li.appendChild(editBtn);
//   editBtn.addEventListener("click", function () {
//     const newTaskText = prompt("Edit task:", span.textContent);
//     if (newTaskText !== "") {
//       span.textContent = newTaskText.trim();
//     }
//   });

//   // Delete Button
//   const deleteBtn = document.createElement("button");
//   deleteBtn.className = "deleteBtn";
//   deleteBtn.textContent = "Delete";
//   li.appendChild(deleteBtn);
//   deleteBtn.addEventListener("click", function () {
//     li.remove();
//   });

//   // Append all to list item
//   li.appendChild(span);
//   li.appendChild(editBtn);
//   li.appendChild(deleteBtn);

//   // Append list item to the task list
//   taskListElement.appendChild(li);

//   // Clear input
//   taskInputElement.value = "";
// });
