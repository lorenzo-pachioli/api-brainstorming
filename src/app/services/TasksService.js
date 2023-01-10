const Tasks = require("../models/TasksModel");
const { createTask } = require('../helpers/modelCreators');
const { AllStoriesService } = require("./StoriesService");
const { serviceReturn } = require("../../utils/response");

exports.AllTasksService = async (userId) => {

  const storiesList = await AllStoriesService(userId);
  if (!storiesList.status) return storiesList;
  const storiesIds = storiesList.content.map(e => `${e._id}`);
  const tasksList = await Tasks.find({ story: { $in: storiesIds } });
  return serviceReturn(`Tasks list`, tasksList, true);
}

exports.NewTasksService = async (newTask) => {

  const lastTask = await Tasks.findOne().sort({ _id: -1 }).limit(1);
  const newMaxId = lastTask ? lastTask.id + 1 : 1;
  const task = createTask(newMaxId, newTask);
  const saved = await task.save();
  if (saved) return serviceReturn(`Task created succesfully`, saved, true);
  return serviceReturn(`The task ${newStory.id} failed to save`, {}, false);
}

exports.TaskByIdService = async (id) => {

  const taskById = await Tasks.findOne({ id: id });
  if (taskById) return serviceReturn(`Task ${id}`, taskById, true);
  return serviceReturn(`Task ${id} doesn't exist`, {}, false);
}

exports.TasksDeleteByIdService = async (id) => {

  const taskById = await Tasks.deleteOne({ id: id });
  if (taskById.deletedCount > 0) return serviceReturn(`Task ${id} deleted`, {}, true);
  return serviceReturn(`Task ${id} doesn't exist`, {}, false);
}

exports.ModifyTasksByIdService = async (newTask) => {

  const taskUpdated = await Tasks.findOneAndUpdate({ _id: newTask._id }, newTask, { new: true });
  if (taskUpdated) return serviceReturn(`Task ${newTask.id} updated`, taskUpdated, true)
  return serviceReturn(`Couldn't update task`, {}, false);
}
