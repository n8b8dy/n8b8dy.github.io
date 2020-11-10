const input = document.getElementById('input'),
      list = document.getElementById('todo-list');

const todos = JSON.parse(localStorage.getItem('todos')) || {};

const dtButton = document.getElementById('dark-theme-button');

const save = function(key) {
  localStorage.setItem('todos', JSON.stringify(todos));
},
addTodo = function(value) {
  if (!todos.hasOwnProperty(value)) {
    todos[value] = {value: input.value, checked: false,};
  }

  let item = document.createElement('div');
  item.innerHTML = `<div class="checkbox"></div><span class="text"></span><div class="delete">X</div>`;
  item.getElementsByClassName('text')[0].innerText = value;
  item.className = 'todo-item';
  list.insertAdjacentElement('afterbegin', item);

  save();
},
deleteTodo = function(item) {
  delete todos[(item.getElementsByClassName('text')[0].innerText)];
  item.remove();
  save();
},
markAsDone = function(item) {
  if (item.classList.contains('done')) {
    item.previousElementSibling.innerText = '';
    item.closest('.todo-item').style.opacity = 1;
    item.classList.remove('done');
    todos[item.innerText].checked = false;

    save();
    return;
  }
  todos[item.innerText].checked = true;
  item.previousElementSibling.innerText = '✔';
  item.closest('.todo-item').style.opacity = 0.7;
  item.classList.add('done');
  
  save();
},
switchThemes = function() {
  let style = document.querySelector('link[href="dark-style.css"]');
  if (style) {
    dtButton.innerHTML = 'Off';
    style.remove();
    localStorage.setItem('dark-theme', 'false');
  } else {
    let addedStyle = document.createElement('link');
    addedStyle.rel = 'stylesheet';
    addedStyle.href = 'dark-style.css';
    document.head.insertAdjacentElement('beforeend', addedStyle);
    dtButton.innerHTML = 'On';
    localStorage.setItem('dark-theme', 'true');
  }
};

if (localStorage.getItem('dark-theme') === 'true') {
  switchThemes();
}

for (let todo in todos) {
  addTodo(todos[todo].value);
}
for (let i of document.getElementsByClassName('text')) {
  if (todos[i.innerText].checked) {
    markAsDone(i);
  }
}

const enterEvent = function(key) {
  if (key.code != 'Enter' || input.value.trim() == '') {return;}
  addTodo(input.value);
  input.value = '';
}

input.addEventListener('focus', function() {
  input.addEventListener('keyup', enterEvent);
});
input.addEventListener('blur', function() {
  input.removeEventListener('keyup', enterEvent);
});

list.addEventListener('click', function(e) {
  if (e.target.classList.contains('delete')) {
    deleteTodo(e.target.closest('.todo-item'));
    return;
  }
  if (e.target.classList.contains('checkbox')) {
    markAsDone(e.target.closest('.todo-item').getElementsByClassName('text')[0]);
  }
});

dtButton.addEventListener('click', switchThemes);