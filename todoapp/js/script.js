let isSigningIn = false; // Add this at the top of your script

async function signInWithGoogle() {
  if (isSigningIn) return; // Prevent multiple clicks
  
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    window.location.href = "index.html";
  } catch (error) {
    if (error.code === 'auth/cancelled-popup-request') {
      console.log("User cancelled the popup");
    } else {
      alert("Sign-in failed: " + error.message);
    }
  } finally {
    isSigningIn = false;
  }
}
// DOM Elements
const taskForm = document.getElementById('taskForm');
const txtTask = document.getElementById('taskName');
const selectStatus = document.getElementById('taskStatus');
const btnSave = document.querySelector('[form="taskForm"]');
const taskList = document.getElementById('taskList');
const addTaskBtn = document.querySelector('.btn-primary.btn-sm');
const searchInput = document.querySelector('input[type="search"]');
const myModal = new bootstrap.Modal(document.getElementById('MyModal'));

// Event Listeners
addTaskBtn.addEventListener('click', () => {
    btnSave.removeAttribute('data-taskId');
    taskForm.reset();
    myModal.show();
});

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const tasks = getTasks();
    const filteredTasks = tasks.filter(task => 
        task.name.toLowerCase().includes(searchTerm) || 
        task.status.toLowerCase().includes(searchTerm)
    );
    renderTasks(filteredTasks);
});

// Form Submission
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const taskName = txtTask.value.trim();
    const selectedStatus = selectStatus.value;
    const taskId = Number(btnSave.getAttribute('data-taskId'));
    
    if (taskName && selectedStatus) {
        if (taskId) {
            updateTask(taskId, taskName, selectedStatus);
        } else {
            addTask(taskName, selectedStatus);
        }
        myModal.hide();
    } else {
        alert('Please enter task name and select status.');
    }
});

// Task Functions
function addTask(taskName, status) {
    const tasks = getTasks();
    const newTask = {
        id: Date.now(),
        name: taskName,
        status: status,
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveTasks(tasks);
    renderTasks();
}

function updateTask(id, newName, newStatus) {
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex !== -1) {
        tasks[taskIndex].name = newName;
        tasks[taskIndex].status = newStatus;
        tasks[taskIndex].updatedAt = new Date().toISOString();
        saveTasks(tasks);
        renderTasks();
    }
}

function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        const tasks = getTasks().filter(task => task.id !== id);
        saveTasks(tasks);
        renderTasks();
    }
}

function editTask(id) {
    const tasks = getTasks();
    const task = tasks.find(task => task.id === id);
    
    if (task) {
        txtTask.value = task.name;
        selectStatus.value = task.status;
        btnSave.setAttribute('data-taskId', id);
        myModal.show();
    }
}

// Storage Functions
function getTasks() {
    const tasksJSON = localStorage.getItem('tasks');
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render Function
function renderTasks(tasks = getTasks()) {
    taskList.innerHTML = tasks.map((task, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${task.name}</td>
            <td>
                <span class="badge ${task.status === 'Completed' ? 'bg-success' : 'bg-warning'}">
                    ${task.status}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editTask(${task.id})">
                    <i class="bi bi-pencil"></i>
                </button>
            </td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}
auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = 'login.html';
  }
});
// Initial render
renderTasks();

