let toDoList = [];

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  toDoList.push(todo);
	const list = document.getElementById('jslist');
  list.insertAdjacentHTML('beforeend', `
    <li class="todo-item" data-key="${todo.id}">
      <input id="${todo.id}" type="checkbox"/>
      <label for="${todo.id}" class="tick js-tick"></label>
      <span>${todo.text}</span>
      <button class="delete-todo js-delete-todo">
        <svg><use href="#delete-icon"></use></svg>
      </button>
    </li>
  `);
};

function toggleDone(key) {
  const index = toDoList.findIndex(item => item.id === Number(key));
  toDoList[index].checked = !toDoList[index].checked;

  const item = document.querySelector(`[data-key='${key}']`);
  if (toDoList[index].checked) {
    item.classList.add('done');
  } else {
    item.classList.remove('done');
  }
};

function deleteTodo(key) {
  toDoList = toDoList.filter(item => item.id !== Number(key));
  const item = document.querySelector(`[data-key='${key}']`);
  item.remove();

  // select the list element and trim all whitespace once there are no todo items left
  const list = document.querySelector('.js-todo-list');
  if (toDoList.length === 0) list.innerHTML = '';
}

const form = document.getElementById('jsform');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.getElementById('jsinput');

  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});

const list = document.getElementById('jslist');
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  // add this `if` block
  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});