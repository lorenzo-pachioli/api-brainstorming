const {
  AllProjectService,
  NewProjectService,
  ProjectServiceById,
  ProjectServiceByIdAllEpics,
  ProjectDeleteByIdService
} = require('../services/ProjectsService');
const { newError } = require('../../utils/errorModeling');
const { response } = require('../../utils/response');

exports.NewProjectController = async (req, res, next) => {
  try {
    const newProject = req.body;
    const projectSaved = await NewProjectService(newProject);
    return response(projectSaved.msg, res, 200, projectSaved.content);
  } catch (err) {
    return next(newError(`Couldn't save project`, 500));
  }
}

exports.AllProjectController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const projectList = await AllProjectService(userId);
    return response(projectList.msg, res, 200, projectList.content);
  } catch (err) {
    return next(newError(`Couldn't get project list`, 500));
  }
}

exports.ProjectControllerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const projectById = await ProjectServiceById(id);
    return response(projectById.msg, res, 200, projectById.content);
  } catch (err) {
    return next(newError(`Couldn't get project list`, 500));
  }
}

exports.ProjectControllerByIdAllEpics = async (req, res, next) => {
  try {
    const { id } = req.params;
    const projectExist = await ProjectServiceById(id);
    if (!projectExist.status) return response(projectExist.msg, res, 200, {});
    const epicList = await ProjectServiceByIdAllEpics(id);
    return response(epicList.msg, res, 200, epicList.content);
  } catch (err) {
    return next(newError(`Couldn't get epic list for project ${id}`, 500));
  }
}

exports.ProjectDeleteByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const projectExist = await ProjectServiceById(id);
    if (!projectExist.status) return response(projectExist.msg, res, 200, {});
    const projectDelted = await ProjectDeleteByIdService(id);
    if (!projectDelted.status) return response(projectDelted.msg, res, 200, {});
    return response(projectDelted.msg, res, 200, projectExist.content);
  } catch (err) {
    return next(newError(`Couldn't delete project`, 500));
  }
}
