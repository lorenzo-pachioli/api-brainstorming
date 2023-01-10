const Projects = require('../models/ProjectsModel');
const Epics = require('../models/EpicsModel');
const { createProjects } = require('../helpers/modelCreators');
const { serviceReturn } = require('../../utils/response');

exports.NewProjectService = async (newProject) => {

  const projectsList = await Projects.findOne().sort({ _id: -1 }).limit(1);
  const newMaxId = projectsList ? projectsList.id + 1 : 1;
  const project = createProjects(newMaxId, newProject);
  const saved = await project.save();
  if (saved) return serviceReturn(`Project created succesfully`, saved, true);
  return serviceReturn(`The project ${newProject.id} failed to save`, {}, false);
}

exports.AllProjectService = async (userId) => {

  const projectsList = await Projects.find({ members: { $in: [userId] } });
  return serviceReturn(`Project list`, projectsList, true);
}

exports.ProjectServiceById = async (id) => {

  const projectById = await Projects.findOne({ id: id });
  if (projectById) return serviceReturn(`Project list`, projectById, true);
  return serviceReturn(`Project ${id} doesn't exist`, {}, false);
}

exports.ProjectServiceByObjectId = async (_id) => {

  const projectById = await Projects.findOne({ _id });
  if (projectById) return serviceReturn(`Project`, projectById, true);
  return serviceReturn(`Project ${_id} doesn't exist`, {}, false);
}

exports.ProjectServiceByIdAllEpics = async (id) => {

  const epicsList = await Epics.find({ project: id });
  if (epicsList.length > 0) return serviceReturn(`Epics for project ${id}`, epicsList, true);
  return serviceReturn(`There're no epics for project ${id}`, [], false);
}

exports.ProjectDeleteByIdService = async (id) => {

  const projectById = await Projects.deleteOne({ id: id });
  if (projectById.deletedCount > 0) return serviceReturn(`Project ${id} deleted`, {}, true);

  return serviceReturn(`Project ${id} doesn't exist`, {}, false);
}
