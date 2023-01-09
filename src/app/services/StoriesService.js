const Stories = require('../models/StoriesModel');
const Tasks = require('../models/TasksModel');
const { createStories } = require('../helpers/modelCreators');
const { AllEpicsService } = require('./EpicsService');
const { serviceReturn } = require('../../utils/response');

exports.NewStoriesService = async (newStory) => {

  const lastStory = await Stories.findOne().sort({ _id: -1 }).limit(1);
  const newMaxId = lastStory ? lastStory.id + 1 : 1;
  const story = createStories(newMaxId, newStory);
  const saved = await story.save();
  if (saved) return serviceReturn(`Story created succesfully`, saved, true);
  return serviceReturn(`The story ${newStory.id} failed to save`, {}, false);
}

exports.AllStoriesService = async (userId) => {

  const epicList = await AllEpicsService(userId);
  if (!epicList.status) return epicList;
  const epicsIds = epicList.content.map(e => `${e._id}`);
  const storiesList = await Stories.find({ epic: { $in: epicsIds } });
  return serviceReturn(`Stories list`, storiesList, true);
}

exports.StoriesServiceById = async (id) => {

  const storyById = await Stories.findOne({ id: id });
  if (storyById) return serviceReturn(`Story ${id}`, storyById, true);
  return serviceReturn(`Story ${id} doesn't exist`, {}, false);
}

exports.StoriesServiceByIdAllTasks = async (id) => {

  const taskList = await Tasks.find({ story: id });
  if (taskList.length > 0) return serviceReturn(`Tasks for story ${id}`, taskList, true);
  return serviceReturn(`There're no tasks for story ${id}`, [], false);
}

exports.StoryDeleteByIdService = async (id) => {

  await Tasks.deleteMany({ story: `${id}` });
  const storyById = await Stories.deleteOne({ id: id });
  if (storyById.deletedCount > 0) return serviceReturn(`Story ${id} deleted`, {}, true);
  return serviceReturn(`Story ${id} doesn't exist`, {}, false);
}
