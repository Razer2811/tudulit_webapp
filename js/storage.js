const STORAGE_KEY = "my-todo-list";

function getTodos() {
    const savedTodos = localStorage.getItem(STORAGE_KEY);

    if (!savedTodos) {
        return [];
    }

    return JSON.parse(savedTodos);
}

function saveTodos(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}