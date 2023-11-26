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