const {
  AllTasksService,
  NewTasksService,
  TaskByIdService,
  TasksDeleteByIdService,
  ModifyTasksByIdService
} = require('../services/TasksService');
const { newError } = require('../../utils/errorModeling');
const { response } = require('../../utils/response');

exports.AllTasksController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const taskList = await AllTasksService(userId);
    return response(taskList.msg, res, 200, taskList.content);
  } catch (err) {
    return next(newError(`Couldn't get tasks list`, 500));
  }
}

exports.NewTasksController = async (req, res, next) => {
  try {
    const newTask = req.body;
    const taskSaved = await NewTasksService(newTask);
    return response(taskSaved.msg, res, 200, taskSaved.content);
  } catch (err) {
    return next(newError(`Couldn't save task`, 500));
  }
}

exports.TasksControllerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const taskById = await TaskByIdService(id);
    return response(taskById.msg, res, 200, taskById.content);
  } catch (err) {
    return next(newError(`Couldn't get task`, 500));
  }
}

exports.TasksDeleteByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const taskExist = await TaskByIdService(id);
    if (!taskExist.status) return response(taskExist.msg, res, 200, {});
    const taskDelted = await TasksDeleteByIdService(id);
    if (!taskDelted.status) return response(taskDelted.msg, res, 200, {});
    return response(taskDelted.msg, res, 200, taskExist.content);
  } catch (err) {
    return next(newError(`Couldn't delete task`, 500));
  }
}

exports.ModifyTasksByIdController = async (req, res, next) => {
  try {
    const newTask = req.body;
    const taskExist = await TaskByIdService(newTask.id);
    if (!taskExist.status) return response(taskExist.msg, res, 200, {});
    const taskModifyed = await ModifyTasksByIdService(newTask);
    return response(taskModifyed.msg, res, 200, taskModifyed.content);
  } catch (err) {
    return next(newError(`Couldn't update task`, 500));
  }
}
