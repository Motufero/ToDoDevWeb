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
        alert('Insira as informações da tarefa!');
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

    let chdLabelDescription = document.createElement('label');
    chdLabelDescription.className = "form-group";
    chdLabelDescription.innerHTML = `<label for="" style="top: 10px;">Descrição</label>
    <textarea name="message" id="" class="form-control"></textarea>`;

    let chdButton = document.createElement('button');
    chdButton.className = "button";
    chdButton.innerHTML = `<button type="submit" class="button"
    onclick="addTask()">Submit</button>`;

    e.append(chdForm, chdLabelName, chdLabelGeneric, chdLabelDescription, chdButton);

}