const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/todos", (req, res) => {
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Server error");
    }
    res.status(200).json(JSON.parse(data));
  });
});

app.get("/todos/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const todos = JSON.parse(data);
    const findTodo = todos.find((todo) => todo.id == id);

    if (findTodo) {
      res.status(200).json(findTodo);
    } else {
      res.status(404).send("Todo not found");
    }
  });
});

app.post("/todos", (req, res) => {
  const id = Math.round(Math.random() * 1000000);

  const { title, description } = req.body;

  const newTodo = {
    id: id,
    title: title,
    description: description,
    completed: false,
  };

  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const todos = JSON.parse(data);

    todos.push(newTodo);

    fs.writeFile("todos.json", JSON.stringify(todos), (err, data) => {
      if (err) {
        console.log(err);
      }
      res.status(201).json({ id: id });
    });
  });
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const todos = JSON.parse(data);
    const editTodo = todos.find((todo) => todo.id == id);
    const editTodoIndex = todos.findIndex((todo) => todo.id == id);

    if (editTodo) {
      (editTodo.title = title),
        (editTodo.description = description),
        (editTodo.completed = completed);

      const editedTodo = {
        id: parseInt(id),
        title,
        description,
        completed,
      };

      todos.splice(editTodoIndex, 1);

      todos.push(editedTodo);

      fs.writeFile("todos.json", JSON.stringify(todos), (err, data) => {
        if (err) {
          console.log(err);
        }
        res.status(200).send("OK");
      });
    } else {
      res.status(404).send("Todo not found");
    }
  });
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const todos = JSON.parse(data);

    const deleteTodoIndex = todos.findIndex((todo) => todo.id == id);

    if (deleteTodoIndex != -1) {
      todos.splice(deleteTodoIndex, 1);
      fs.writeFile("todos.json", JSON.stringify(todos), (err, data) => {
        if (err) {
          console.log(err);
        }
        res.status(200).send("OK");
      });
    } else {
      res.status(404).send("Todo not found");
    }
  });
});

app.use((req, res) => {
  res.status(404).send("Route not found");
});

// app.listen(PORT, () => {
//   console.log("RUNNING AT PORT " + PORT);
// });

module.exports = app;
