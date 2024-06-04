const taskKey = "tarefas"

carregarTarefas();
function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem(taskKey));
    const ul = document.querySelector('#taskList');
    ul.innerHTML = '';
    tarefas?.forEach(tarefa => {
        console.log(tarefa);
        ul.innerHTML += getItemHtml(tarefa)
    });
}

function adicionarTarefa(e) {
    e.preventDefault();
    const form = document.querySelector('#taskForm')
    const formData = new FormData(form)
    const taskId = new Date().getTime()
  
    const task = {
      id: taskId,
      title: formData.get('title'),
      description: formData.get('description')
    }

    const taskList = document.querySelector('#taskList')
    taskList.innerHTML += getItemHtml(task)

    adicionarLocalStorage(task);
}



function adicionarLocalStorage(novaTarefa) {
    let tarefas = JSON.parse(localStorage.getItem(taskKey));

    if (tarefas === null) {
        tarefas = []
    }

    if (!tarefas?.find(p => p === novaTarefa)) {
        tarefas.push(novaTarefa);
    }

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function openEdit(elem) {
    const id = elem.parentElement.parentElement.getAttribute('idli')
    const form = document.querySelector('#editForm')
    form.idli = id;
    const formData = new FormData(form)
    const taskList = JSON.parse(localStorage.getItem(taskKey)) || []
    const task = taskList.find(p => p.id == id)
    form.elements['title'].value = task.title;
    form.elements['description'].value = task.description;
    openModal();
}

function saveEdit() {
    const form = document.querySelector('#editForm')
    const formData = new FormData(form)
    const taskTitle = formData.get('title')
    const taskDescription = formData.get('description')

    const tasks = JSON.parse(localStorage.getItem(taskKey)) || []

    const task = tasks.find(p => p.id == form.idli)
    task.title = taskTitle
    task.description = taskDescription
    localStorage.setItem(taskKey, JSON.stringify(tasks))

    editTaskHtml(task)
}

function editTaskHtml(task) {
    const li = document.querySelector(`[idli="${task.id}"]`);
    li.innerHTML = getInnerHtml(task)
}

function openModal() {
    const modal = document.querySelector('dialog')
    modal.showModal()
}

function closeModal() {
    const modal = document.querySelector('dialog')
    modal.close()
}

function deleteTask(element){
    const id = element.parentElement.parentElement.getAttribute('idli')
    let tarefas = JSON.parse(localStorage.getItem(taskKey));

    if (tarefas === null) {
        tarefas = []
    }

    const newTarefas = tarefas.filter(p => p.id != id)
    
    localStorage.setItem('tarefas', JSON.stringify(newTarefas));
    carregarTarefas()
}

function getItemHtml(task) {
    return `<li idli="${task.id}" >${getInnerHtml(task)}</li>`
}

function getInnerHtml(task) {
    return `<h2>${task.title}</h2><p>${task.description}</p><div id="action-buttons"><button class="edit" title="Editar Tarefa" onclick="openEdit(this)">✏️</button><button class="delete" title="Deletar Tarefa" onclick="deleteTask(this)">❌</button></div>`
}