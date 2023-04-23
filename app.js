var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTaskHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

var createNewTaskElement = function (taskString) {
    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var editInput = document.createElement("input");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    var deleteButtonImg = document.createElement("img");

    listItem.className = "task-list__item";
    label.innerText = taskString;
    label.className = "task-list__label";
    checkBox.type = "checkbox";
    checkBox.className = "task-list__checkbox";
    editInput.type = "text";
    editInput.classList = "task-list__input input";
    editButton.innerText = "Edit";  //innerText encodes special characters, HTML does not.
    editButton.classList = "task-list__button edit-button";
    deleteButton.classList = "task-list__button delete-button";
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.className = "delete-button__image"
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}

var addTask = function () {
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

var editTask = function () {
    var listItem = this.parentNode;
    var editInput = listItem.querySelector(".task-list__input");
    var label = listItem.querySelector(".task-list__label");
    var editBtn = listItem.querySelector(".edit-button");
    var containsClass = listItem.classList.contains("task-list__item_edit-mode");

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
    }

    listItem.classList.toggle("task-list__item_edit-mode");
};

var deleteTask = function () {

    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
}

//Mark task completed
var taskCompleted = function () {
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

//Mark task as incomplete.
var taskIncomplete = function () {
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

addButton.addEventListener("click", addTask);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelector(".task-list__checkbox");
    var editButton = taskListItem.querySelector(".edit-button");
    var deleteButton = taskListItem.querySelector(".delete-button");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}