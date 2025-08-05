let currentInput = "";
let operator = "";
let previousInput = "";
let shouldResetDisplay = false;

document.getElementById("calcBtn").addEventListener("click", showCalculator);
document.getElementById("todoBtn").addEventListener("click", showTodoList);
document.getElementById("taskInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function showCalculator() {
  document.getElementById("calculator").classList.remove("hidden");
  document.getElementById("todolist").classList.add("hidden");
  document.getElementById("calcBtn").classList.add("active");
  document.getElementById("todoBtn").classList.remove("active");
}

function showTodoList() {
  document.getElementById("todolist").classList.remove("hidden");
  document.getElementById("calculator").classList.add("hidden");
  document.getElementById("todoBtn").classList.add("active");
  document.getElementById("calcBtn").classList.remove("active");
}

function appendToDisplay(value) {
  const display = document.getElementById("display");
  if (shouldResetDisplay) {
    display.value = "";
    shouldResetDisplay = false;
  }
  if (value === "*") {
    display.value += "×";
    currentInput += "*";
  } else if (value === "/") {
    display.value += "÷";
    currentInput += "/";
  } else if (value === "-") {
    display.value += "−";
    currentInput += "-";
  } else {
    display.value += value;
    currentInput += value;
  }
}

function clearDisplay() {
  document.getElementById("display").value = "";
  currentInput = "";
  operator = "";
  previousInput = "";
}

function deleteLast() {
  const display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
  currentInput = currentInput.slice(0, -1);
}

function calculate() {
  try {
    const result = eval(currentInput);
    document.getElementById("display").value = result;
    currentInput = result.toString();
    shouldResetDisplay = true;
  } catch (error) {
    document.getElementById("display").value = "Error";
    currentInput = "";
  }
}

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") return;

  const taskList = document.getElementById("taskList");
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";

  taskItem.innerHTML = `
        <input type="checkbox" onchange="toggleTask(this)">
        <span class="task-text">${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;

  taskList.appendChild(taskItem);
  input.value = "";
}

function toggleTask(checkbox) {
  const taskItem = checkbox.parentElement;
  if (checkbox.checked) {
    taskItem.classList.add("completed");
  } else {
    taskItem.classList.remove("completed");
  }
}

function deleteTask(button) {
  const taskItem = button.parentElement;
  taskItem.remove();
}
