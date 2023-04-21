const Task = require("../models/task.model");
const asyncWrapper = require("../middleware/async");
const { createCustomeError } = require("../errors/customeError");

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});
const getTask = asyncWrapper(async (req, res, next) => {
  // const task = await Task.findById(req.params.id).exec();
  const task = await Task.findOne({ _id: req.params.id }).exec();
  if (!task) {
    return next(
      createCustomeError(`can not get task with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ task });
});

const createTask = asyncWrapper(async (req, res, next) => {
  const { name } = req.body;
  const task = await Task.create(req.body);
  if (!name) {
    return next(
      createCustomeError("can not create task without name field", 400)
    );
  }
  res.status(201).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findByIdAndRemove(req.params.id);
  if (!task) {
    return next(
      createCustomeError(`can not delete task with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    task: null,
    status: "success",
    message: "task deleted succesfully",
  });
});

const editTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findByIdAndUpdate(taskId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(
      createCustomeError(`can not update task with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ task });
});

module.exports = {
  getTask,
  getTasks,
  editTask,
  deleteTask,
  createTask,
};
