// Initial Tasks

let tasks = [
    {
        id: 1,
        name: "Java Practice",
        completed: false
    },

    {
        id: 2,
        name: "HTML Practice",
        completed: false
    },

    {
        id: 3,
        name: "Project Completing",
        completed: false
    },

    {
        id: 4,
        name: "Music 🎵",
        completed: false
    }

];


// Display Tasks

function displayTasks() {

    let taskList = document.getElementById("taskList");

    let completedTasks = document.getElementById("completedTasks");

    taskList.innerHTML = "";

    completedTasks.innerHTML = "";


    let pendingCount = 0;

    let completedCount = 0;


    tasks.forEach(function(task) {

        let taskDiv = document.createElement("div");

        taskDiv.className = "task";


        let taskName = document.createElement("span");

        taskName.textContent = task.name;


        let buttonsDiv = document.createElement("div");

        buttonsDiv.className = "task-buttons";


        // Edit Button

        let editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.className = "edit-btn";

        editButton.onclick = function() {

            editTask(task.id);

        };



        let doneButton = document.createElement("button");

        doneButton.className = task.completed
            ? "undo-btn"
            : "done-btn";

        doneButton.textContent = task.completed
            ? "Undo"
            : "Done";

        doneButton.onclick = function() {

            toggleTask(task.id);

        };


        // Delete Button

        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-btn";

        deleteButton.onclick = function() {

            deleteTask(task.id);

        };


        // Add Buttons

        buttonsDiv.appendChild(editButton);

        buttonsDiv.appendChild(doneButton);

        buttonsDiv.appendChild(deleteButton);


        // Add Task Name

        taskDiv.appendChild(taskName);

        taskDiv.appendChild(buttonsDiv);


        // Pending or Completed

        if (task.completed) {

            completedTasks.appendChild(taskDiv);

            completedCount++;

        } else {

            taskList.appendChild(taskDiv);

            pendingCount++;

        }

    });


    // Empty Messages

    if (pendingCount === 0) {

        taskList.innerHTML =
            '<p class="empty-message">No pending tasks. Great job! 🎉</p>';

    }

    if (completedCount === 0) {

        completedTasks.innerHTML =
            '<p class="empty-message">No completed tasks yet.</p>';

    }

}


// Add New Task

function addTask() {

    let taskInput = document.getElementById("taskInput");

    let taskName = taskInput.value.trim();


    if (taskName === "") {

        alert("Please enter a task!");

        return;

    }


    let newTask = {

        id: Date.now(),

        name: taskName,

        completed: false

    };


    tasks.push(newTask);


    taskInput.value = "";


    displayTasks();

}


// Edit Task

function editTask(id) {

    let task = tasks.find(t => t.id === id);

    if (task) {

        showPopup(
            "Edit Task",
            "Update your task name below.",
            "✏️",
            "edit",
            id,
            task.name
        );

    }

}


// Complete / Undo Task

function toggleTask(id) {

    let task = tasks.find(function(task) {

        return task.id === id;

    });


    if (task) {

        task.completed = !task.completed;

        displayTasks();

    }

}


// Delete Task

function deleteTask(id) {

    showPopup(
        "Delete Task?",
        "Are you sure you want to delete this task?",
        "🗑️",
        "delete",
        id
    );

}


// Enter Key Support

document.getElementById("taskInput").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});
let currentAction = null;
let currentTaskId = null;


// Open Popup

function showPopup(title, message, icon, action, taskId, inputValue = "") {

    document.getElementById("popupOverlay").style.display = "flex";

    document.getElementById("popupTitle").textContent = title;

    document.getElementById("popupMessage").textContent = message;

    document.getElementById("popupIcon").textContent = icon;

    document.getElementById("popupInput").value = inputValue;

    currentAction = action;

    currentTaskId = taskId;

    document.getElementById("popupInput").style.display =
        action === "edit" ? "block" : "none";

    document.getElementById("confirmBtn").textContent =
        action === "delete" ? "Delete" : "Confirm";

    document.getElementById("confirmBtn").style.background =
        action === "delete" ? "#e74c3c" : "#4caf68";

}


// Close Popup

function closePopup() {

    document.getElementById("popupOverlay").style.display = "none";

}


// Confirm Button

document.getElementById("confirmBtn").onclick = function() {

    if (currentAction === "edit") {

        let newName = document.getElementById("popupInput").value.trim();

        if (newName === "") {
            alert("Please enter a task name!");
            return;
        }

        let task = tasks.find(t => t.id === currentTaskId);

        if (task) {
            task.name = newName;
        }

    }

    else if (currentAction === "delete") {

        tasks = tasks.filter(t => t.id !== currentTaskId);

    }

    displayTasks();

    closePopup();

};


// Cancel Button

document.getElementById("cancelBtn").onclick = closePopup;

// Initial Display

displayTasks();