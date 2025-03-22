const todos = [];

document.getElementById("new-todo").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        const newTodoInput = document.getElementById("new-todo");
        const todoText = newTodoInput.value.trim();
        if (todoText === "") return;

        addTodo(todoText);
        newTodoInput.value = "";
        renderTodos();
    }
});

function renderDoneTodos() {
    const todoListUl = document.getElementById("todo-list");
    todoListUl.innerHTML = "";
    
    buttonExibittion(todoListUl);
    for (const todo of todos) {
        if (todo.done) {
            const todoItemLi = document.createElement("li");
            todoItemLi.textContent = todo.text;
            todoItemLi.style.textDecoration = "line-through";
            todoListUl.appendChild(todoItemLi);
        }
    }
}

function renderPendingTodos() {
    const todoListUl = document.getElementById("todo-list");
    todoListUl.innerHTML = "";
    
    buttonExibittion(todoListUl);
    for (const todo of todos) {
        if(!todo.done) {
            const todoItemLi = document.createElement("li");
            todoItemLi.textContent = todo.text;
            const markTodoAsDoneButton = document.createElement("button");
            markTodoAsDoneButton.textContent = "Concluir";
            markTodoAsDoneButton.onclick = function () {
                todo.done = true;
                renderTodos();
            };
            todoItemLi.appendChild(markTodoAsDoneButton);
            todoListUl.appendChild(todoItemLi);
        }
    }
}

function renderTodos() {
    const todoListUl = document.getElementById("todo-list");
    todoListUl.innerHTML = "";
    
    buttonExibittion(todoListUl);
    for (const todo of todos) {
        const todoItemLi = document.createElement("li");
        todoItemLi.textContent = todo.text;
    
        if (!todo.done) {
            const markTodoAsDoneButton = document.createElement("button");
            markTodoAsDoneButton.textContent = "Concluir";
            markTodoAsDoneButton.onclick = function () {
                todo.done = true;
                renderTodos();
            };
            todoItemLi.appendChild(markTodoAsDoneButton);
        } else {
            todoItemLi.style.textDecoration = "line-through";
        }
    
        todoListUl.appendChild(todoItemLi);
    }
}

function addTodo(todoText) {
    const lastId = todos.length > 0 ? todos[todos.length - 1].id : 0;

    const newTodo = {
        id: lastId + 1,
        text: todoText,
        done: false,
    };

    todos.push(newTodo);
}

function markTodoAsDone(todoId) {
    const todo = todos.find((todo) => todo.id === todoId);
    todo.done = true;
}

function buttonExibittion(todoListUl) {
    if (todos.length > 0) {
        const showAllTodosButton = document.createElement("button");
        showAllTodosButton.classList.add("todos-exibition-buttons");
        showAllTodosButton.textContent = "Lista Completa";
        showAllTodosButton.onclick = function () {
            renderTodos();
        };
        todoListUl.appendChild(showAllTodosButton);

        const showOnlyPendingTodosButton = document.createElement("button");
        showOnlyPendingTodosButton.classList.add("todos-exibition-buttons");
        showOnlyPendingTodosButton.textContent = "To-dos Pendentes";
        showOnlyPendingTodosButton.onclick = function () {
            renderPendingTodos();
        }
        todoListUl.appendChild(showOnlyPendingTodosButton);

        const showOnlyDoneTodosButton = document.createElement("button");
        showOnlyDoneTodosButton.classList.add("todos-exibition-buttons");
        showOnlyDoneTodosButton.textContent = "To-dos Concluídos";
        showOnlyDoneTodosButton.onclick = function () {
            renderDoneTodos();
        }
        todoListUl.appendChild(showOnlyDoneTodosButton);
    }
}

renderTodos();