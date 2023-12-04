const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;



const scriptFilePath = path.join(__dirname, 'scripts/scripts.js');
const usersFilePath = path.join(__dirname, 'backEnd/users.json');
const tasksFilePath = path.join(__dirname, 'backEnd/tasks.json');


app.get('/tasks', (req, res) => {
    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao ler as tarefas.' });
        }
        const tasks = JSON.parse(data);
        res.json(tasks);
    });
});

app.post('/tasks', express.json(), (req, res) => {
    const newTask = req.body.task;

    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao ler as tarefas.' });
        }

        const tasks = JSON.parse(data);
        tasks.push(newTask);

        fs.writeFile(tasksFilePath, JSON.stringify(tasks), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao escrever as tarefas.' });
            }
            res.json(tasks);
        });
    });
});



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'task.html'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


//usando get para escrever tarefas novas no task.json----------------------
/*
app.get('/pages/task.html', function (req, res) {
    res.sendFile(__dirname + "/" + "form.html");
});

app.get('/process_get', function(req, res){

    response = {
        nome:req.query.nome,
        tema:req.query.tema,
        descricao:req.query.descricao
    };
    var novaTarefa = req.query.nome + ' ' + req.query.tema + ' ' + req.query.descricao;
    console.log(response);
    res.end(JSON.stringify(response));
    escrever(novaTarefa);
});

function escrever (novaTarefa){
    fs.appendFile(taskFilePath, '\n' + novaTarefa, function(err){
        if(err) {
            console.log('Sobrescrita falhou');
        }
        console.log('Arquivo foi escrito');
    });
};
*/
//fim do GET-----------------------------------------------------------------