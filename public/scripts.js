function myFunction() {
    document.getElementById("demo").innerHTML = "Paragraph added.";
  }

//Quando carrega a página, já pega as tarefas 
window.onload = function() {
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            loadTasks(tasks);
        })
        .catch(error => console.error('Erro:', error));
};

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



//Funções para adicionar task ao servidor--------------------------------------
//adicopna ao 'Database'
function putTaskDTB(newDbTaskName, newDbTaskTopic, newDbTaskDesc){
    fetch('/tasks', {
        method: 'POST' ,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Nome: newDbTaskName, Tema: newDbTaskTopic, Descricao: newDbTaskDesc}), 
    })
    .then(response => response.json())
    .catch(error => console.error('Erro no Script: ', error));
}


//Reorganiza a página, e chama a função de inserir no database
function addTask(){
    let textvalue = document.getElementById('nomeTask').value;
    let topicvalue = document.getElementById('topicTask').value;
    let descriptionvalue = document.getElementById('descriptionTask').value;

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
        putTaskDTB(textvalue, topicvalue, descriptionvalue);
    }
    else{
        alert('Insira as informações da tarefa!');
    }
}
//------------------------------------------------------------------------

function removeTask(){
    /*var taskName = document.getElementById('activeItem').innerHTML;
    fetch(`/task/${taskName}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())   
    */
    

    var taskName = document.getElementById('activeItem').innerHTML;
    console.log(taskName);
    //var mainInfo = document.getElementById('taskInfo');
    fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
        tasks.forEach(task => {
            if(task["Nome"] == taskName){
                console.log(task["Descricao"]);          
            }
        });
    })
    .catch(error => console.error('Erro:', error));
}


function updateTaskDB(){

    var ref = document.getElementById('activeItem').innerHTML;

    let newDbTaskName = document.getElementById('nomeTask').value;
    let newDbTaskTopic = document.getElementById('topicTask').value;
    let newDbTaskDesc = document.getElementById('descriptionTask').value;

    console.log(ref);
    console.log(newDbTaskName);
    console.log(newDbTaskTopic);
    console.log(newDbTaskDesc);

    /*
    fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
        tasks.forEach(task => {
            if(task["Nome"] == ref){     
                if(newDbTaskName =! ''){
                    task["Nome"] = newDbTaskName;
                }           
                if(newDbTaskTopic =! ''){
                    task["Tema"] = newDbTaskTopic;
                }
                if(newDbTaskDesc =! ''){
                    task["Descricao"] = newDbTaskDesc;
                }
                //mainInfo.append(chdHeader, chdTopic, chdDescription);
            }
        });
    })
    .catch(error => console.error('Erro:', error));
    */
}

function updateTask(){
    deactivateMain();
    deactivateFooter();

    var taskName = document.getElementById('activeItem').innerHTML;
    var mainInfo = document.getElementById('taskInfo');

    let chdForm = document.createElement('form');
    chdForm.method = "post";
    chdForm.role = "form";

    fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
        tasks.forEach(task => {
            if(task["Nome"] == taskName){
                let chdHeader = task["Nome"];                
                let chdTopic = task["Tema"];
                let chdDescription = task["Descricao"];

                let chdLabelName = document.createElement('label');
                chdLabelName.className = "form-group";
                chdLabelName.innerHTML = `<label for=''>Nome da Tarefa</label>
                <input type="text" class="form-control" name="name" placeholder="${chdHeader}" id = "nomeTask">`;

                let chdLabelGeneric = document.createElement('label');
                chdLabelGeneric.className = "form-group";
                chdLabelGeneric.innerHTML = `<label for="">Assunto Geral</label>
                <input type="text" class="form-control" name="subject" placeholder="${chdTopic}" id = "topicTask">`;

                let chdLabelDescription = document.createElement('label');
                chdLabelDescription.className = "form-group";
                chdLabelDescription.innerHTML = `<label for="" style="top: 10px;">Descrição</label>
                <textarea name="message" id = "descriptionTask" class="form-control" placeholder="${chdDescription}"></textarea>`;

                let chdButton = document.createElement('button');
                chdButton.className = "button";
                chdButton.innerHTML = `<button type="submit" class="mainButton"
                onclick="updateTaskDB()">Submit</button>`;

                mainInfo.append(chdForm, chdLabelName, chdLabelGeneric, chdLabelDescription, chdButton);

            }
        });
    })
    .catch(error => console.error('Erro:', error));

}

function styleMenuItem(newItem) {
    if (document.getElementById('activeItem')){
        let oldItem = document.getElementById('activeItem');
        oldItem.classList.remove("selectedItem");
        oldItem.classList.add("menuitem");
        oldItem.id = "";
    }
    newItem.classList.remove("menuitem");
    newItem.classList.add("selectedItem");
    newItem.id = "activeItem";
    showTaskInfo();
    
}

function showTaskInfo(){
    var taskName = document.getElementById('activeItem').innerHTML;
    console.log(taskName);
    deactivateMain();
    var mainInfo = document.getElementById('taskInfo');
    fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
        tasks.forEach(task => {
            if(task["Nome"] == taskName){
                let chdHeader = document.createElement('h2');
                chdHeader.id = "headTask";
                chdHeader.innerHTML = task["Nome"];
                let chdTopic = document.createElement('p');
                chdTopic.innerHTML = task["Tema"];
                let chdDescription = document.createElement('p');
                chdDescription.innerHTML = task["Descricao"];
                mainInfo.append(chdHeader, chdTopic, chdDescription);
            }
        });
    })
    .catch(error => console.error('Erro:', error));
}

//Funções para reorganizar o grid-view
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
    <input type="text" class="form-control" name="subject" placeholder="Digite o tema da tarefa" id = "topicTask">`;

    let chdLabelDescription = document.createElement('label');
    chdLabelDescription.className = "form-group";
    chdLabelDescription.innerHTML = `<label for="" style="top: 10px;">Descrição</label>
    <textarea name="message" id = "descriptionTask" class="form-control"></textarea>`;

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
    chdButtonConcluir.textContent = "Editar";
    chdButtonConcluir.addEventListener('click', () => {
        updateTask();
      });
    
    let chdButtonDeletar = document.createElement('button');
    chdButtonDeletar.className = "ftrButton";
    chdButtonDeletar.style="background-color:rgb(211, 73, 73)";
    chdButtonDeletar.textContent = "Finalizar";
    chdButtonDeletar.addEventListener('click', () => {
        removeTask();
    });

    /*let chdButtonDeletar = document.createElement('button');
    chdButtonDeletar.innerHTML = `<button type ="button" onclick="alert('Deletar')" 
    class="ftrButton" style="background-color:rgb(211, 73, 73);">Deletar</button>`;
    */
    footer.append(chdButtonConcluir, chdButtonDeletar);
}