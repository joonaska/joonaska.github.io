function init() {
  let infoText = document.getElementById('infoText');
  infoText.innerHTML = 'Ladataan tehtävälista palvelimelta, odota...';
  loadTodos();
}
async function loadTodos() {
  let response = await fetch('http://localhost:3000/todos');
  let todos = await response.json();
  console.log(todos);
  showTodos(todos);
}

function createTodoListItem(todo) {
  // luodaan uusi LI-elementti
  let li = document.createElement('li');
  // luodaan uusi id-attribuutti
  let li_attr = document.createAttribute('id');
  // kiinnitetään tehtävän/todon id:n arvo luotuun attribuuttiin
  li_attr.value = todo._id;
  // kiinnitetään attribuutti LI-elementtiin
  li.setAttributeNode(li_attr);
  // luodaan uusi tekstisolmu, joka sisältää tehtävän/todon tekstin
  let text = document.createTextNode(todo.text);
  // lisätään teksti LI-elementtiin
  li.appendChild(text);
  // luodaan uusi SPAN-elementti, käytännössä x-kirjan, jotta tehtävä saadaan poistettua
  let span1 = document.createElement('span');
  let span2 = document.createElement('span');

  // luodaan uusi class-attribuutti
  let span_attr = document.createAttribute('class');
  let span_attr2 = document.createAttribute('class');
  // kiinnitetään attribuuttiin delete-arvo, ts. class="delete", jotta saadaan tyylit tähän kiinni
  span_attr.value = 'delete';
  span_attr2.value = 'edit';
  // kiinnitetään SPAN-elementtiin yo. attribuutti
  span1.setAttributeNode(span_attr);
  span2.setAttributeNode(span_attr2);
  // luodaan tekstisolmu arvolla x
  let x = document.createTextNode(' x ');
  let e = document.createTextNode(' e ');
  // kiinnitetään x-tekstisolmu SPAN-elementtiin (näkyville)
  span2.appendChild(e);
  span1.appendChild(x);

  // määritetään SPAN-elementin onclick-tapahtuma kutsumaan removeTodo-funkiota
  span1.onclick = function () {
    removeTodo(todo._id);
  };
  span2.onclick = function () {
    editTodo(todo._id);
  };
  // lisätään SPAN-elementti LI-elementtin
  li.appendChild(span2);
  li.appendChild(span1);

  // palautetaan luotu LI-elementti
  // on siis muotoa: <li>Muista soittaa...<span class="remove">x</span></li>
  return li;
}
function showTodos(todos) {
  let todosList = document.getElementById('todosList');
  let infoText = document.getElementById('infoText');
  // no todos
  if (todos.length === 0) {
    infoText.innerHTML = 'Ei tehtäviä';
  } else {
    todos.forEach((todo) => {
      let li = createTodoListItem(todo);
      todosList.appendChild(li);
    });
    infoText.innerHTML = '';
  }
}
async function addTodo() {
  let newTodo = document.getElementById('newTodo');
  const data = { text: newTodo.value };
  const response = await fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  let todo = await response.json();
  let todosList = document.getElementById('todosList');
  let li = createTodoListItem(todo);
  todosList.appendChild(li);

  let infoText = document.getElementById('infoText');
  infoText.innerHTML = '';
  newTodo.value = '';
}

async function removeTodo(id) {
  const response = await fetch('http://localhost:3000/todos/' + id, {
    method: 'DELETE',
  });
  let responseJson = await response.json();
  let li = document.getElementById(id);
  li.parentNode.removeChild(li);

  let todosList = document.getElementById('todosList');
  if (!todosList.hasChildNodes()) {
    let infoText = document.getElementById('infoText');
    infoText.innerHTML = 'Ei tehtäviä';
  }
}
// async function editTodo(id) {
//   const response = await fetch('http://localhost:3000/todos/' + id, {
//     method: 'PUT',
//   });
//   let responseJson = await response.json();
//   let li = document.getElementById(id);
//   li.parentNode.removeChild(li);
