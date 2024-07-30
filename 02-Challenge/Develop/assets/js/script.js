// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    if (nextId === null) {
        nextId = 1;
    }
    return nextId++;

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    return `
    <div class="task-card" data-id=${task.id}">
        <h3>${task.title}</h3>
        <p>Due: ${task.dueDate}</p>
        <button class="delete-task">Delete</button>
    </div>
    `;

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    if (taskList === null) {
        taskList = [];
    }
    $('.task-lane').epmty();
    taskList.forEach(task => {
        const taskCard = createTaskCard(task);
        $(`#${task.status}`).append(taskCard);
    });

    $(".task-card").draggable({
        revert: "invalid",
        stack: ".task-card"
    });

    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("nextId", JSON.stringify(nextId));

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const taskTitle = $("#task-input").val();
    const dueDate = $("#due-date-input").val();

    if (taskTitle && dueDate) {
        const NewTask = {
            id: generateTaskId(),
            title: taskTitle,
            dueDate: dueDate,
            status: "todo"
        };
        taskList.push(NewTask);
        renderTaskList();
        $("#task-input").val('');
        $("#due-date-input").val('');
    }

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    function handleDeleteTask(event) {
        const taskId = $(event.target).closest('.task-card').data('id');
        taskList = taskList.filter(task => task.id !== taskId);
        renderTaskList();
    }

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = ui.draggable.data('id');
    const newStatus = $(this).attr('id');

    taskList.forEach(task => {
        if (task.id === taskId) {
            task.status = newStatus;
        }
    });
    renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    $("#task-form").submit(handleAddTask);

    $(document).on('click', '.delete-task', handleDeleteTask);

    $(".task-lane").droppable({
        accept: ".task-card",
        drop: handleDrop
    });

    $('#due-date-input').datepicker();

});
