function myFunction() {
    document.getElementById("demo").innerHTML = "Paragraph added.";
  }

window.onload = function() {
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            loadTasks(tasks);
        })
        .catch(error => console.error('Erro:', error));
};

function styleMenuItem(newItem) {
    let oldItem = document.getElementById('activeItem');
    oldItem.classList.remove("selectedItem");
    oldItem.classList.add("menuitem");
    oldItem.id = "";
    newItem.classList.remove("menuitem");
    newItem.classList.add("selectedItem");
    newItem.id = "activeItem";
}

function putTaskDTB(newDbTaskask){
    fetch('/tasks', {
        method: 'POST' ,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: newDbTaskask}), 
    })
    .then(response => response.json())
    .catch(error => console.error('Erro no Script: ', error));
}

function addTask(){
    let textvalue = document.getElementById('nomeTask').value;
    if(textvalue){
        var newTask = document.createElement('li');
        newTask.className = "menuitem";
        newTask.innerHTML = textvalue;
        newTask.id = "";
        newTask.setAttribute("onClick", "styleMenuItem(this)");
        
        let todoList = document.getElementById('menulist');
        todoList.appendChild(newTask);
        deactivateMain();
        constructMainInfo();
        constructFooter();
        putTaskDTB(textvalue);
    }
    else{
        alert('Insira as informações da tarefa!');
    }
}

function loadTasks(tasks){
    var loadTodoList = document.getElementById('menulist');
    loadTodoList.innerHTML = '';
    tasks.forEach(task => {
        var newTask = document.createElement('li');
        newTask.className = "menuitem";
        newTask.innerHTML = task["Nome"];
        newTask.id = "";
        loadTodoList.appendChild(newTask);
        newTask.setAttribute("onClick", "styleMenuItem(this)");
    });
}

function editNewTask(){   
    deactivateMain();
    deactivateFooter();

    var mainForm = document.getElementById('taskInfo');

    let chdForm = document.createElement('form');
    chdForm.method = "post";
    chdForm.role = "form";

    let chdLabelName = document.createElement('label');
    chdLabelName.className = "form-group";
    chdLabelName.innerHTML = `<label for=''>Nome da Tarefa</label>
    <input type="text" class="form-control" name="name" placeholder="Digite o nome da tarefa" id = "nomeTask">`;

    let chdLabelGeneric = document.createElement('label');
    chdLabelGeneric.className = "form-group";
    chdLabelGeneric.innerHTML = `<label for="">Assunto Geral</label>
    <input type="text" class="form-control" name="subject" placeholder="Digite o tema da tarefa">`;

    let chdLabelDescription = document.createElement('label');
    chdLabelDescription.className = "form-group";
    chdLabelDescription.innerHTML = `<label for="" style="top: 10px;">Descrição</label>
    <textarea name="message" id="" class="form-control"></textarea>`;

    let chdButton = document.createElement('button');
    chdButton.className = "button";
    chdButton.innerHTML = `<button type="submit" class="mainButton"
    onclick="addTask()">Submit</button>`;

    mainForm.append(chdForm, chdLabelName, chdLabelGeneric, chdLabelDescription, chdButton);
}

function deactivateMain(){
    var main = document.getElementById('taskInfo');
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
}

function deactivateFooter(){
    var ftr = document.getElementById('footer');
    while (ftr.firstChild) {
        ftr.removeChild(ftr.firstChild);
    }
}

function constructMainInfo(){
    var mainInfo = document.getElementById('taskInfo');
    let chdHeader = document.createElement('h2');
    chdHeader.id = "headTask";
    chdHeader.innerHTML = "Nome da Tarefa";
    let chdDescription = document.createElement('p');
    chdDescription.innerHTML = "Description";
    mainInfo.append(chdHeader, chdDescription);
}

function constructFooter(){
    var footer = document.getElementById('footer');
    let chdButtonConcluir = document.createElement('button');
    chdButtonConcluir.className = "ftrButton";
    chdButtonConcluir.style="background-color: #4caf50";
    chdButtonConcluir.textContent = "Concluir";
    chdButtonConcluir.addEventListener('click', () => {
        alert('concluir!');
      });
    
    let chdButtonDeletar = document.createElement('button');
    chdButtonDeletar.className = "ftrButton";
    chdButtonDeletar.style="background-color:rgb(211, 73, 73)";
    chdButtonDeletar.textContent = "Deletar";
    chdButtonDeletar.addEventListener('click', () => {
        alert('deletar!');
    });

    /*let chdButtonDeletar = document.createElement('button');
    chdButtonDeletar.innerHTML = `<button type ="button" onclick="alert('Deletar')" 
    class="ftrButton" style="background-color:rgb(211, 73, 73);">Deletar</button>`;
    */
    footer.append(chdButtonConcluir, chdButtonDeletar);
}