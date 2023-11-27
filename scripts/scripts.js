function myFunction() {
    document.getElementById("demo").innerHTML = "Paragraph added.";
  }



function addTask(){
    let textvalue = document.getElementById('nomeTask').value;
    if(textvalue){
        var newTask = document.createElement('li');
        newTask.className = "menuitem";
        newTask.innerHTML = textvalue;
        let todoList = document.getElementById('menubar');
        todoList.appendChild(newTask);
    }
    else{
        document.getElementById("demo").innerHTML = "Insira um nome!";
    }
}

function editNewTask(){
    var e = document.getElementById('taskInfo');
    while (e.firstChild) {
        e.removeChild(e.firstChild);
    }
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

    e.append(chdForm, chdLabelName, chdLabelGeneric);
}