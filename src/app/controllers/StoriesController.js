const {
  AllStoriesService,
  NewStoriesService,
  StoriesServiceById,
  StoriesServiceByIdAllTasks,
  StoryDeleteByIdService
} = require('../services/StoriesService');
const { newError } = require('../../utils/errorModeling');
const { response } = require('../../utils/response');

exports.NewStoriesController = async (req, res, next) => {
  try {
    const newStory = req.body;
    const storySaved = await NewStoriesService(newStory);
    return response(storySaved.msg, res, 200, storySaved.content);
  } catch (err) {
    return next(newError(`Couldn't save story`, 500));
  }
}

exports.AllStoriesController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const storiesList = await AllStoriesService(userId);
    return response(storiesList.msg, res, 200, storiesList.content);
  } catch (err) {
    return next(newError(`Couldn't get stories list`, 500));
  }
}

exports.StoriesControllerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const storyById = await StoriesServiceById(id);
    return response(storyById.msg, res, 200, storyById.content);
  } catch (err) {
    return next(newError(`Couldn't get story`, 500));
  }
}

exports.StoriesControllerByIdAllTasks = async (req, res, next) => {
  try {
    const { id } = req.params;
    const storyExist = await StoriesServiceById(id);
    if (!storyExist.status) return response(storyExist.msg, res, 200, {});
    const taskList = await StoriesServiceByIdAllTasks(id);
    return response(taskList.msg, res, 200, taskList.content);
  } catch (err) {
    return next(newError(`Couldn't get tasks list for story ${id}`, 500));
  }
}

exports.StoryDeleteByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const storyExist = await StoriesServiceById(id);
    if (!storyExist.status) return response(storyExist.msg, res, 200, {});
    const storyDelted = await StoryDeleteByIdService(id);
    if (!storyDelted.status) return response(storyDelted.msg, res, 200, {});
    return response(storyDelted.msg, res, 200, storyExist.content);
  } catch (err) {
    return next(newError(`Couldn't get task`, 500));
  }
}
