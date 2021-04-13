const list = document.getElementById('lista-tarefas');

function storeList() {
  const button = document.getElementById('salvar-tarefas');

  button.addEventListener('click', () => {
    window.localStorage.myList = list.innerHTML;
  });
}

function getList() {
  const { myList } = window.localStorage;

  if (!myList) list.innerHTML = '';
  else list.innerHTML = myList;
}

function addListItem() {
  const button = document.getElementById('criar-tarefa');
  const input = document.getElementById('texto-tarefa');

  button.addEventListener('click', () => {
    const listItem = document.createElement('li');
    listItem.className = 'tarefa';
    listItem.innerText = input.value;
    list.appendChild(listItem);
    input.value = '';
    storeList();
  });
}

function removeSelect() {
  for (let i = 0; i < list.children.length; i += 1) {
    list.children[i].classList.remove('selected');
    list.children[i].style.backgroundColor = document.body.style.backgroundColor;
  }
}

function selectItem() {
  list.addEventListener('click', (e) => {
    removeSelect();
    if (e.target.className !== 'tarefa selected') {
      e.target.classList.add('selected');
      e.target.style.backgroundColor = 'rgb(128, 128, 128)';
    }
  });
}

function completeItem() {
  list.addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('completed')) {
      e.target.classList.remove('completed');
    } else if (e.target.className !== 'tarefa completed') {
      e.target.classList.add('completed');
    }
    storeList();
  });
}

function removeEverything() {
  const button = document.getElementById('apaga-tudo');

  button.addEventListener('click', () => {
    list.innerHTML = '';
    storeList();
  });
}

function removeCompleted() {
  const button = document.getElementById('remover-finalizados');
  const completed = document.getElementsByClassName('completed');

  button.addEventListener('click', () => {
    while (completed.length > 0) {
      let i = 0;
      list.removeChild(completed[i]);
      i += 1;
    }
    storeList();
  });
}

function removeSelectedItem() {
  const button = document.getElementById('remover-selecionado');

  button.addEventListener('click', () => {
    for (let i = 0; i < list.children.length; i += 1) {
      if (list.children[i].classList.contains('selected')) {
        list.removeChild(list.children[i]);
      }
    }
  });
}

function moveDown() {
  const listItem = document.getElementsByTagName('li');
  const buttonDown = document.getElementById('mover-baixo');

  buttonDown.addEventListener('click', () => {
    for (let i = listItem.length - 1; i >= 0; i -= 1) {
      if (listItem[i].classList.value.includes('selected') && i !== (listItem.length - 1)) {
        const save = listItem[i].outerHTML;
        listItem[i].outerHTML = listItem[i + 1].outerHTML;
        listItem[i + 1].outerHTML = save;
      }
    }
  });
}

function moveUp() {
  const listItem = document.getElementsByTagName('li');
  const buttonUp = document.getElementById('mover-cima');

  buttonUp.addEventListener('click', () => {
    for (let i = 0; i < listItem.length; i += 1) {
      if (listItem[i].classList.value.includes('selected') && i !== 0) {
        const save = listItem[i].outerHTML;
        listItem[i].outerHTML = listItem[i - 1].outerHTML;
        listItem[i - 1].outerHTML = save;
      }
    }
  });
}

addListItem();
selectItem();
completeItem();
removeEverything();
removeCompleted();
getList();
removeSelectedItem();
moveDown();
moveUp();
