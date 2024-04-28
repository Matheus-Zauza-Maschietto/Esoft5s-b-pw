carregarTarefas();

function carregarTarefas(){
    const tarefas = JSON.parse(localStorage.getItem("tarefas"));
    const ul = document.querySelector('#listaTODO');
    ul.innerHTML = '';
    tarefas?.forEach(tarefa => {
        console.log(tarefa);   
        ul.innerHTML += `<li>${tarefa}</li>`
    });
}

function adicionarTarefa(e){
    e.preventDefault();
    const tarefa = document.querySelector('input').value;
    adicionarLocalStorage(tarefa);
    carregarTarefas();
}

function adicionarLocalStorage(novaTarefa){
    let tarefas = JSON.parse(localStorage.getItem("tarefas"));

    if(tarefas === null){
        tarefas = []
    }

    if(!tarefas?.find(p => p === novaTarefa)){
        tarefas.push(novaTarefa);
    }

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}