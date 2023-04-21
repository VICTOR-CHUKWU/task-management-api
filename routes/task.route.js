const express = require("express");
const router = express.Router();
const {
  getTask,
  getTasks,
  editTask,
  deleteTask,
  createTask,
} = require("../controller/taskController");

router.get("/", getTasks);

router.post("/", createTask);

router.patch("/:id", editTask);

router.delete("/:id", deleteTask);

router.get("/:id", getTask);

module.exports = router;
