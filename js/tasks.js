
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
let photos = document.getElementById ("photos")

let allTasks = [];
let currentTab = "all";

async function loadTasks() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    allTasks = await res.json();
    updateUI();
}

function updateUI() {
    const completed = allTasks.filter(t => t.completed).length;
    const total = allTasks.length;
    const percent = Math.round((completed / total) * 100);

    progressBar.style.width = percent + "%";
    progressText.textContent = `${completed} of ${total} completed (${percent}%)`;

    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    let filtered = allTasks;

    if (currentTab === "pending") {
        filtered = allTasks.filter(t => !t.completed);
    } else if (currentTab === "done") {
        filtered = allTasks.filter(t => t.completed);
    }

    filtered.forEach(task => {
        const div = document.createElement("div");
        div.className = "flex items-center justify-between bg-white shadow p-4 rounded-lg";

        div.innerHTML = `
            <div class="flex items-center gap-3">
                <input type="checkbox" ${task.completed ? "checked" : ""} class="h-5 w-5 taskCheck">
                <span class="${task.completed ? "line-through text-gray-500" : ""}">
                    ${task.title}
                </span>
            </div>

            <button 
                class="px-3 py-1 rounded-lg text-white 
                    ${task.completed ? "bg-green-600" : "bg-purple-600"} toggleBtn">
                ${task.completed ? "Done" : "To Do"}
            </button>
        `;

        const checkbox = div.querySelector(".taskCheck");
        const toggleBtn = div.querySelector(".toggleBtn");

        checkbox.onclick = () => toggleTask(task);
        toggleBtn.onclick = () => toggleTask(task);

        taskList.appendChild(div);
    });
}

function toggleTask(task) {
    task.completed = !task.completed;
    updateUI();
}

document.querySelectorAll(".tabBtn").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".tabBtn").forEach(t => t.classList.remove("text-purple-600", "font-semibold"));

        btn.classList.add("text-purple-600", "font-semibold");
        currentTab = btn.getAttribute("data-tab");
        renderTasks();
    };
});

loadTasks();






 document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleSidebar');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.querySelector('main');
  const toggleIcon = document.getElementById('toggleIcon');

  toggleBtn.addEventListener('click', () => {
    // Sidebar width toggle
    sidebar.classList.toggle('w-64');
    sidebar.classList.toggle('w-20');

    // Main content margin toggle

    mainContent.classList.toggle('lg:ml-64');
    mainContent.classList.toggle('lg:ml-20');

    // Toggle icon rotate
    toggleIcon.classList.toggle('rotate-180');

    // Sidebar ichidagi textlarni toggle qilish
    const sidebarTextItems = sidebar.querySelectorAll('li span, li a, h1, p');
    sidebarTextItems.forEach(el => {
      if (!el.querySelector('img') && !el.querySelector('i')) {
        el.classList.toggle('hidden');
      }
    });

  });
});
