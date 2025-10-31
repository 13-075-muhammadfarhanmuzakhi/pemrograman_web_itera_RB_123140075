const taskForm = document.getElementById("taskForm");
const taskName = document.getElementById("taskName");
const taskCourse = document.getElementById("taskCourse");
const taskDeadline = document.getElementById("taskDeadline");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const courseFilter = document.getElementById("courseFilter");
const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const clearTasks = document.getElementById("clearTasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.name
      .toLowerCase()
      .includes(searchInput.value.toLowerCase());
    const matchStatus =
      statusFilter.value === "all" ||
      (statusFilter.value === "completed" && task.completed) ||
      (statusFilter.value === "pending" && !task.completed);
    const matchCourse =
      courseFilter.value === "all" || courseFilter.value === task.course;
    return matchSearch && matchStatus && matchCourse;
  });

  filteredTasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = `task-item ${task.completed ? "completed" : ""}`;
    div.innerHTML = `
      <h4>${task.name}</h4>
      <p>Mata Kuliah: ${task.course}</p>
      <p>Deadline: ${task.deadline}</p>
      <button class="done-btn">${task.completed ? "Belum" : "Selesai"}</button>
      <button class="delete-btn">Hapus</button>
    `;

    div
      .querySelector(".done-btn")
      .addEventListener("click", () => toggleComplete(index));
    div
      .querySelector(".delete-btn")
      .addEventListener("click", () => deleteTask(index));

    taskList.appendChild(div);
  });

  totalTasks.textContent = tasks.length;
  pendingTasks.textContent = tasks.filter((t) => !t.completed).length;
  updateCourseFilterOptions();
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = taskName.value.trim();
  const course = taskCourse.value.trim();
  const deadline = taskDeadline.value;

  if (!name || !course || !deadline) {
    alert("Semua kolom harus diisi!");
    return;
  }

  const newTask = {
    name,
    course,
    deadline,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  taskForm.reset();
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(index) {
  if (confirm("Hapus tugas ini?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

clearTasks.addEventListener("click", () => {
  if (confirm("Hapus semua tugas?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
});

searchInput.addEventListener("input", renderTasks);
statusFilter.addEventListener("change", renderTasks);
courseFilter.addEventListener("change", renderTasks);

function updateCourseFilterOptions() {
  const uniqueCourses = [...new Set(tasks.map((t) => t.course))];
  courseFilter.innerHTML = `<option value="all">Semua Mata Kuliah</option>`;
  uniqueCourses.forEach((course) => {
    const opt = document.createElement("option");
    opt.value = course;
    opt.textContent = course;
    courseFilter.appendChild(opt);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const showReadme = document.getElementById("showReadme");
  const closeReadme = document.getElementById("closeReadme");
  const readmeContainer = document.getElementById("readmeContainer");

  showReadme.addEventListener("click", () => {
    readmeContainer.classList.add("show");
  });

  closeReadme.addEventListener("click", () => {
    readmeContainer.classList.remove("show");
  });

  renderTasks();
});
