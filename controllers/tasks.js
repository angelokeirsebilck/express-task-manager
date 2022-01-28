const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError, CustomAPIError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(201).json({ tasks: tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (task) {
    return res.status(200).send({ task: task });
  }

  return next(createCustomError(`No task with that id: ${taskID}`, 404));
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (task) {
    return res.status(200).send({ task: task });
  }
  return next(createCustomError(`No task with that id: ${taskID}`, 404));
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with that id: ${taskID}`, 404));
  }
  res.status(200).send({ task: task });
});

const editTask = async (req, res) => {
  const { id: taskID } = req.params;

  try {
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
      overwrite: true,
    });

    if (!task) {
      return next(createCustomError(`No task with that id: ${taskID}`, 404));
    }
    res.status(200).send({ task: task });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
};
