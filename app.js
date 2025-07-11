const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://abdullahsmsiddiqui:8CX78aGHPZAUDmwm@cluster0.hq7hh8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const taskSchema = new mongoose.Schema({
  name: String
});

const Task = mongoose.model("Task", taskSchema);

app.get("/", function(req, res) {
  Task.find({}, function(err, tasks) {
    if (!err) {
      res.render("list", { ejes: tasks });
    } else {
      res.send("Error loading tasks");
    }
  });
});

app.post("/", function(req, res) {
  const newTask = new Task({ name: req.body.ele1 });
  newTask.save(function(err) {
    res.redirect("/");
  });
});

app.post("/edit", function(req, res) {
  const editId = req.body.editId;
  const updatedText = req.body.updatedText;
  Task.findByIdAndUpdate(editId, { name: updatedText }, function(err) {
    res.redirect("/");
  });
});

app.post("/delete", function(req, res) {
  const deleteId = req.body.deleteId;
  Task.findByIdAndDelete(deleteId, function(err) {
    res.redirect("/");
  });
});

app.listen(5000, function() {
  console.log("Server started on port 5000");
});
