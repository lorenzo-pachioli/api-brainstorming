const {
  NewEpicsService,
  AllEpicsService,
  EpicsServiceById,
  EpicsServiceByIdAllStories,
  EpicDeleteByIdService
} = require('../services/EpicsService');
const { newError } = require('../../utils/errorModeling');
const { ProjectServiceById, ProjectServiceByObjectId } = require('../services/ProjectsService');
const { response } = require('../../utils/response');

exports.AllEpicsController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const epicList = await AllEpicsService(userId);
    return response(epicList.msg, res, 200, epicList.content);
  } catch (err) {
    next(newError(`Couldn't get epic list`, 500));
  }
}

exports.NewEpicsController = async (req, res, next) => {
  try {
    const newEpic = req.body;
    const projectExist = await ProjectServiceByObjectId(newEpic.project);
    if (!projectExist.status) return response(projectExist.msg, res, 200, {});

    const epicSaved = await NewEpicsService(newEpic);
    return response(epicSaved.msg, res, 200, epicSaved.content);
  } catch (err) {
    next(newError(`Couldn't create epic`, 500))
  }
}

exports.EpicsControllerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const epic = await EpicsServiceById(id);
    return response(epic.msg, res, 200, epic.content);
  } catch (err) {
    next(newError(`Couldn't get epic`, 500))
  }
}

exports.EpicsControllerByIdAllStories = async (req, res, next) => {
  try {
    const { id } = req.params;
    const epicExist = await EpicsServiceById(id);
    if (!epicExist.status) return response(epicExist.msg, res, 200, {});

    const storiesList = await EpicsServiceByIdAllStories(id);
    return response(storiesList.msg, res, 200, storiesList.content);
  } catch (err) {
    next(newError(`Couldn't get story list for epic ${id}`, 500))
  }
}

exports.EpicDeleteByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const epicExist = await EpicsServiceById(id);
    if (!epicExist.status) return response(epicExist.msg, res, 200, {});

    const epicDelete = await EpicDeleteByIdService(id);
    return response(epicDelete.msg, res, 200, epicDelete.content);
  } catch (err) {
    next(newError(`Couldn't get task`, 500))
  }
}
