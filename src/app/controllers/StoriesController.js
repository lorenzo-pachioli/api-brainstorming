const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const {
  AllStoriesService,
  NewStoriesService,
  StoriesServiceById,
  StoriesServiceByIdAllTasks
} = require('../services/StoriesService');
const { isNewStoryValid } = require('../helpers/newItemsValidator');
const { next } = require('../../utils/response');
const { newError } = require('../../utils/errorModeling');

exports.NewStoriesController = (token, newStory, res) => {

  if (isTokenValid(token, res) && isNewStoryValid(newStory, res)) {
    NewStoriesService(newStory, res).catch(() => next(newError(`Couldn't save story`, 500)));
  }
}

exports.AllStoriesController = (token, res) => {

  isTokenValid(token, res) && AllStoriesService(res).catch(() => next(newError(`Couldn't get stories list`, 500)));
}

exports.StoriesControllerById = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && StoriesServiceById(id, res).catch(() => next(newError(`Couldn't get story`, 500)));
}

exports.StoriesControllerByIdAllTasks = (token, id, res) => {

  isIdAndTokenValid(id, token, res) && StoriesServiceByIdAllTasks(id, res).catch(() => next(newError(`Couldn't get tasks list for story ${id}`, 500)));
}
