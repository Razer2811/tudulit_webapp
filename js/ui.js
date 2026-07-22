function renderTodos(todos, filter, onToggleTodo, onDeleteTodo) {
    const todoList = document.querySelector("#todo-list");

    todoList.innerHTML = "";

    const filteredTodos = todos.filter(function (todo) {
        if (filter === "active") {
            return !todo.completed;
        }

        if (filter === "completed") {
            return todo.completed;
        }

        return true;
    });

    if (filteredTodos.length === 0) {
        const emptyState = document.createElement("li");
        emptyState.className = "empty-state";
        emptyState.textContent = todos.length === 0
            ? "Chưa có công việc nào. Hãy thêm việc đầu tiên của bạn."
            : "Không có công việc nào trong mục này.";

        todoList.appendChild(emptyState);
        return;
    }

    for (const todo of filteredTodos) {
        const li = document.createElement("li");

        if (todo.completed) {
            li.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.setAttribute("aria-label", `Đánh dấu ${todo.text} là ${todo.completed ? "chưa hoàn thành" : "hoàn thành"}`);

        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Xóa";
        deleteButton.setAttribute("aria-label", `Xóa công việc ${todo.text}`);

        checkbox.addEventListener("change", function () {
            onToggleTodo(todo.id, checkbox.checked);
        });

        deleteButton.addEventListener("click", function () {
            onDeleteTodo(todo.id);
        });

        li.append(checkbox, span, deleteButton);
        todoList.appendChild(li);
    }
}

function updateTodoCount(todos) {
    const remainingTodos = todos.filter(function (todo) {
        return !todo.completed;
    }).length;

    const todoCount = document.querySelector("#todo-count");

    todoCount.textContent =
        `Còn ${remainingTodos}/${todos.length} công việc chưa hoàn thành.`;
}
