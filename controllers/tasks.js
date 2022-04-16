const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(201).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const newTask = await Task.create(req.body);
  res.status(201).json({ newTask });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const taskUpdated = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!taskUpdated) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  res.status(200).json({ taskUpdated });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const taskDeleted = await Task.findByIdAndDelete({ _id: taskID });
  if (!taskDeleted) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  res.status(200).json({ taskDeleted });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
