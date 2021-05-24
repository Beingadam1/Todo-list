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
  // Add todo
  form.addEventListener('submit', addTodo);

  // Remove todo
  todoList.addEventListener('click', removeTodo);

  // Clear todo
  clearBtn.addEventListener('click', clearTodo);
}

// Add todo event
function addTodo(e) {
  if (todoInput.value === '') {
    showError('Please add a todo');
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
  
    // Clear input
    todoInput.value = '';
  }
  e.preventDefault();
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
      e.target.parentElement.parentElement.remove()
    }
  }
}

// Clear todo event
function clearTodo() {
  while(todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
}