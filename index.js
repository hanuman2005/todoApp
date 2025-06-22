const addTodoButton = document.getElementById("addTodoButton");
const saveTodosButton = document.getElementById("saveTodosButton");
const todosContainer = document.getElementById("todosContainer");

function getTodoList() {
  let parsedTodoList = JSON.parse(localStorage.getItem("todoList"));
  if (parsedTodoList === null) {
    return [];
  } else {
    return parsedTodoList;
  }
}

let todoList = getTodoList();
let todosCount = todoList.length;

saveTodosButton.onclick = function () {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

function onAddTodo() {
  let userInputElement = document.getElementById("userTodoInput");
  let userTodoInput = userInputElement.value;
  if (userTodoInput === "") {
    alert("Enter valid input");
    return;
  }

  todosCount = todosCount + 1;
  const newTodoItem = {
    text: userTodoInput,
    uniqueNo: todosCount,
    isChecked: false,
  };

  todoList.push(newTodoItem);
  createAndAppendTodo(newTodoItem);
  userInputElement.value = "";
}

addTodoButton.onclick = function () {
  onAddTodo();
};

function onTodoStatusChange(labelId, todoId) {
  let labelElement = document.getElementById(labelId);
  labelElement.classList.toggle("checked");

  let todoObjectIndex = todoList.findIndex(
    (eachTodo) => "todo" + eachTodo.uniqueNo === todoId
  );

  let todoObject = todoList[todoObjectIndex];

  if (todoObject.isChecked === true) {
    todoObject.isChecked = false;
  } else {
    todoObject.isChecked = true;
  }
}

function onDeleteTodo(todoId) {
  let todoItem = document.getElementById(todoId);
  todosContainer.removeChild(todoItem);

  let deleteTodoItemIndex = todoList.findIndex(
    (eachTodo) => "todo" + eachTodo.uniqueNo === todoId
  );

  todoList.splice(deleteTodoItemIndex, 1);
}

function createAndAppendTodo(todo) {
  const todoId = "todo" + todo.uniqueNo;
  const checkboxId = "checkbox" + todo.uniqueNo;
  const labelId = "label" + todo.uniqueNo;

  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item-container", "d-flex", "flex-row");
  todoItem.id = todoId;
  todosContainer.appendChild(todoItem);

  const checkboxElement = document.createElement("input");
  checkboxElement.id = checkboxId;
  checkboxElement.type = "checkbox";
  checkboxElement.checked = todo.isChecked;
  checkboxElement.onclick = function () {
    onTodoStatusChange(labelId, todoId);
  };
  checkboxElement.classList.add("checkbox-input");
  todoItem.appendChild(checkboxElement);

  const labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoItem.appendChild(labelContainer);

  const labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id = labelId;
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  if (todo.isChecked === true) {
    labelElement.classList.add("checked");
  }
  labelContainer.appendChild(labelElement);

  const deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick = function () {
    onDeleteTodo(todoId);
  };

  deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}
