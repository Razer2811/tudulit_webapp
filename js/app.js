const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const message = document.querySelector("#message");

const filterButtons = document.querySelectorAll(".filter-button");

let currentFilter = "all";
let todos = getTodos();

renderApp();

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const todoText = todoInput.value.trim();

    if (todoText === "") {
        message.textContent = "Vui lòng nhập công việc.";
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: todoText,
        completed: false
    };

    todos.push(newTodo);

    saveTodos(todos);
    renderApp();

    todoInput.value = "";
    message.textContent = "";
    todoInput.focus();
});

function renderApp() {
    renderTodos(todos, currentFilter, toggleTodo, deleteTodo);
    updateTodoCount(todos);

    for (const button of filterButtons) {
        const isCurrentFilter = button.dataset.filter === currentFilter;

        button.classList.toggle("active", isCurrentFilter);
    }
}

for (const button of filterButtons) {
    button.addEventListener("click", function () {
        currentFilter = button.dataset.filter;
        renderApp();
    });
}

function toggleTodo(id, completed) {
    todos = todos.map(function (todo) {
        if (todo.id === id) {
            return {
                ...todo,
                completed: completed
            };
        }

        return todo;
    });

    saveTodos(todos);
    renderApp();
}

function deleteTodo(id) {
    todos = todos.filter(function (todo) {
        return todo.id !== id;
    });

    saveTodos(todos);
    renderApp();
}