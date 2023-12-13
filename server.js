const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, 'public')));

const scriptFilePath = path.join(__dirname, '/scripts/scripts.js');
const usersFilePath = path.join(__dirname, '/backEnd/users.json');
const tasksFilePath = path.join(__dirname, '/backEnd/tasks.json');


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


app.delete('/tasks/:Nome', (req, res) => {
       
    //const patchTask = req.content;
    const patchTask = req.params;

    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao ler as tarefas.' });
        }

        const tasks = JSON.parse(data);
        var patchTasks = [];

        tasks.forEach(task => {
            if(task["Nome"] != patchTask["Nome"]) {                
                patchTasks.push(task);
            }
        })
        fs.writeFile(tasksFilePath, JSON.stringify(patchTasks), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao escrever as tarefas.' });
            }
        });
    }),

    res.json({ res: 'success' });
    
}); 

app.patch('/tasks', express.json(), (req, res) => {
    
    const patchTask = req.body;
    //console.log(patchTask);

    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao ler as tarefas.' });
        }

        const tasks = JSON.parse(data);
        var patchTasks = [];

        tasks.forEach(task => {
            if(task["Nome"] != patchTask["Nome"]) {
                patchTasks.push(task);
            }
            else{
                patchTasks.push(patchTask);
            }
        })
        fs.writeFile(tasksFilePath, JSON.stringify(patchTasks), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao escrever as tarefas.' });
            }
        });
    }),

    res.json({ res: 'success' });
    
});

app.post('/tasks', express.json(), (req, res) => {
    //const newTask = req.body.task;
    const newTask = req.body;

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
