const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); 


let tasks = [];


app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});


app.post("/api/tasks", (req, res) => {
    const { task } = req.body;
    if (typeof task === "string" && task.trim() !== "") { 
        tasks.push(task.trim()); 
        res.status(201).json({ message: "Task added successfully!" });
    } else {
        res.status(400).json({ error: "Task cannot be empty or invalid." });
    }
});


app.delete("/api/tasks/:index", (req, res) => {
    const index = parseInt(req.params.index, 10); 
    if (!isNaN(index) && index >= 0 && index < tasks.length) {
        tasks.splice(index, 1); 
        res.json({ message: "Task deleted successfully!" });
    } else {
        res.status(404).json({ error: "Task not found or invalid index." });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
