// === CLASS IMPLEMENTATION ===
class Task {
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }
}

// === VARIABLES ===
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// === ARROW FUNCTIONS ===

// 1. Render tugas
const renderTasks = () => {
  taskList.innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-actions">
        <button onclick="editTask('${task.id}')">✏️</button>
        <button onclick="deleteTask('${task.id}')">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });
};

// 2. Simpan ke localStorage
const saveTasks = (tasks) =>
  localStorage.setItem("tasks", JSON.stringify(tasks));

// 3. Tambah tugas baru
const addTask = () => {
  const text = taskInput.value.trim();
  if (!text) return alert("Isi dulu tugasnya!");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const newTask = new Task(Date.now(), text);
  tasks.push(newTask);
  saveTasks(tasks);
  taskInput.value = "";
  renderTasks();
};

// === EVENT LISTENER ===
addBtn.addEventListener("click", addTask);
window.addEventListener("DOMContentLoaded", renderTasks);

// === EDIT & DELETE ===
const editTask = (id) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((t) => t.id == id);
  const newText = prompt("Edit tugas:", task.text);
  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
    saveTasks(tasks);
    renderTasks();
  }
};

const deleteTask = (id) => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t.id != id);
  saveTasks(tasks);
  renderTasks();
};

// === ASYNC FUNCTION (contoh penggunaan async/await) ===
const showClock = async () => {
  const now = new Date();
  const time = now.toLocaleTimeString("id-ID", { hour12: false });
  document.getElementById("clock").textContent = `🕒 ${time}`;
};

// Update jam setiap detik
setInterval(async () => {
  await showClock();
}, 1000);
