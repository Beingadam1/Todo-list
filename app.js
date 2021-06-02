// Defining the DOM
const form = document.querySelector('.d-flex');
const filter = document.querySelector('#filter');
const todoList = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-todo');
const todoInput = document.querySelector('#todo');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // Get todo from LS
  document.addEventListener('DOMContentLoaded', getTodo)
  // Add todo
  form.addEventListener('submit', addTodo);

  // Remove todo
  todoList.addEventListener('click', removeTodo);

  // Clear todo
  clearBtn.addEventListener('click', clearTodo);
}

// Get todo from LS
function getTodo() {
  let todos;

  if(localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.forEach(function (todo) {
    // Create li element
    const li = document.createElement('li');
  
    // Add class
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
  
    // create text node and append to li
    li.appendChild(document.createTextNode(todo));
  
    // Create link element
    const link = document.createElement('a');
  
    // Add class
    link.className = 'delete-item';
  
    // Add icon
    link.innerHTML = '<i class="fas fa-trash text-danger"></i>'

    // Add pointer effect
    link.style.cursor = 'pointer';
    
    // Append link to li
    li.appendChild(link);
    
    // Append li to ul
    todoList.appendChild(li);
  })
}


// Add todo event
function addTodo(e) {
  if (todoInput.value === '') {
    showError('Please add a todo!');
  } else {
    // Create li element
    const li = document.createElement('li');
  
    // Add class
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
  
    // create text node and append to li
    li.appendChild(document.createTextNode(todoInput.value));
  
    // Create link element
    const link = document.createElement('a');
  
    // Add class
    link.className = 'delete-item';
  
    // Add icon
    link.innerHTML = '<i class="fas fa-trash text-danger"></i>'

    // Add pointer effect
    link.style.cursor = 'pointer';
    
    // Append link to li
    li.appendChild(link);
    
    // Append li to ul
    todoList.appendChild(li);

    // Store in Ls
    storeTodoInLocalStorage(todoInput.value);
  
    // Clear input
    todoInput.value = '';
    
  }
  e.preventDefault();
}

// Store in Ls
function storeTodoInLocalStorage(todo) {
  let todos;

  if(localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.push(todo);

  localStorage.setItem('todos', JSON.stringify(todos));
}

// Show Error
function showError(error) {
  // Create element
  const errorDiv = document.createElement('div');

  // Get Element
  const card = document.querySelector('.card')
  const heading = document.querySelector('.heading')

  // Add class
  errorDiv.className = 'alert alert-danger text-center';

  //Create a text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error
  card.insertBefore(errorDiv, heading);

  // Clear error
  setTimeout(function clearError() {
    document.querySelector('.alert').remove();
  }, 2000)
}


// Remove todo event
function removeTodo(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove todo from LS
      removeTodoFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove todo from LS
function removeTodoFromLocalStorage(todoItem) {
  let todos;

  if(localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.forEach(function (todo, index) {
    if(todoItem.textContent === todo) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

// Clear todo event
function clearTodo() {
  while(todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }

  // Clear todo from Ls
  clearTodoFromLocalStorage();
}

function clearTodoFromLocalStorage() {
  localStorage.clear();
}