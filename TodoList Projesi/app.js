// Tüm Elementleri Seçmek
const text = document.querySelector("#buttonText");
const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

// Todo listesi array'i
let todos = [];

// Sayfa yüklenince gerekli event'leri tanımla
document.addEventListener("DOMContentLoaded", function () {
  runEvents();
  setButtonStyles();
  checkTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
});

// Event listener'ları tanımla
function runEvents() {
  form.addEventListener("submit", addTodo);
  secondCardBody.addEventListener("click", removeTodoToUI);
  clearButton.addEventListener("click", allTodosEverywhere);
  filterInput.addEventListener("keyup", filter);
}

// Filtreleme işlemi

let alertGosterildi = false;

function filter(e){
  const filterValue = e.target.value.toLowerCase().trim();
  const todoListesi = document.querySelectorAll(".list-group-item");

  if(filterValue.length === 0){
    alertGosterildi = false;
    todoListesi.forEach(function(todo){
      todo.setAttribute("style", "display: block");
    });
    return;
  }

  if(todoListesi.length > 0){
    todoListesi.forEach(function(todo){
      if(todo.textContent.toLowerCase().trim().includes(filterValue)){
        todo.setAttribute("style", "display: block");
      }else{
        todo.setAttribute("style", "display: none !important");
      }
    });
  }
  else if (!alertGosterildi){
    showAlert("warning", "Filtreleme yapmak için en az bir todo olmalıdır!");
    alertGosterildi = true;
  }
}


// Tüm todoları sil
function allTodosEverywhere() {
  const todoListesi = document.querySelectorAll(".list-group-item");
  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      todo.remove();
    });
    localStorage.removeItem("todos");
    todos = [];
    showAlert("success", "Tüm todolar başarıyla silindi.", clearButton);
  } else {
    if (!clearButton.parentElement.querySelector(".alert")) {
      showAlert("warning", "Silmek için en az bir todo olmalı!", clearButton);
    }
  }
}

// Seçilen todo'yu sil
function removeTodoToUI(e) {
  if (e.target.className === "fa fa-remove") {
    const todo = e.target.parentElement.parentElement;
    todo.remove();
    removeTodoToStorage(todo.textContent);
    showAlert("success", "Todo başarıyla silindi.", firstCardBody);
    filterInput.value = "";
    previousFilterLength = 0;
    showAllTodos();
  }
}

// Tüm todoları görünür yap
function showAllTodos() {
  const todoListesi = document.querySelectorAll(".list-group-item");
  todoListesi.forEach(function (todo) {
    todo.style.display = "block";
  });
}

// Storage'dan seçilen todo'yu sil
function removeTodoToStorage(removeTodo) {
  checkTodosFromStorage();
  todos = todos.filter(function (todo) {
    return todo !== removeTodo;
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Todo ekleme işlemi
function addTodo(e) {
  e.preventDefault();
  const inputText = addInput.value.trim();

  if (inputText === "") {
    showAlert("warning", "Lütfen boş bırakmayınız!");
  } else {
    checkTodosFromStorage();
    const todoExists = todos.some(
      (todo) => todo.toLowerCase() === inputText.toLowerCase()
    );

    if (todoExists) {
      showAlert("warning", "Bu todo zaten mevcut!");
    } else {
      addTodoToUI(inputText);
      addTodoToStorage(inputText);
      showAlert("success", "Todo eklendi.");
      addInput.value = "";
      filterInput.value = "";
      previousFilterLength = 0;
      showAllTodos();
    }
  }
}

// Arayüze todo ekle
function addTodoToUI(newTodo) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";

  const span = document.createElement("span");
  span.textContent = newTodo;

  const a = document.createElement("a");
  a.href = "#";
  a.className = "delete-item";

  const i = document.createElement("i");
  i.className = "fa fa-remove";

  a.appendChild(i);
  li.appendChild(span);
  li.appendChild(a);
  todoList.appendChild(li);
}

// Storage'a todo ekle
function addTodoToStorage(newTodo) {
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Storage'daki todoları kontrol et
function checkTodosFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

// Alert gösterme fonksiyonu
function showAlert(type, message, targetBody) {
  if (!targetBody) {
    targetBody = firstCardBody;
  }

  const existingAlert = targetBody.querySelector(".alert");
  if (existingAlert) {
    existingAlert.remove();
  }

  const div = document.createElement("div");
  div.className = `alert alert-${type}`;
  div.textContent = message;
  targetBody.appendChild(div);

  setTimeout(function () {
    div.remove();
  }, 2500);
}

// Style ayarları
function setButtonStyles() {
  text.style.position = "relative";
  text.style.top = "-6px";
  clearButton.style.backgroundColor = "#dc3545";
  clearButton.style.color = "#fff";
  clearButton.style.border = "none";
  clearButton.addEventListener("mouseover", function () {
    clearButton.style.backgroundColor = "#c82333";
  });
  clearButton.addEventListener("mouseout", function () {
    clearButton.style.backgroundColor = "#dc3545";
  });
}
