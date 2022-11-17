const Projects = require('../models/ProjectsModel');
const Epics = require('../models/EpicsModel');
const { createProjects } = require('../helpers/modelCreators');
const { response } = require('../../utils/response');

exports.NewProjectService = async (newProject, res) => {

  try {
    const projectAlreadyExist = await Projects.findOne({ name: newProject.name });
    if (projectAlreadyExist) return response(`Project with name '${newProject.name}' already exist`, 200, res, {});

    const projectsList = await Projects.find();
    const newMaxId = projectsList.length + 1;
    const project = createProjects(newMaxId, newProject);
    project.save();

    return response(`Project created succesfully`, 200, res, project);

  } catch (err) {
    console.log(err);
    return response(`Couldn't save project`, 503, res);
  }
}

exports.AllProjectService = async (res) => {

  try {
    const projectsList = await Projects.find();

    return response(`Project list`, 200, res, projectsList);

  } catch (err) {
    console.log(err);
    return response(`Couldn't get project list`, 503, res);
  }
}

exports.ProjectServiceById = async (id, res) => {

  try {
    const projectById = await Projects.findOne({ id: id });
    if (projectById) return response(`Project ${id} doesn't exist`, 200, res, projectById);

    return response(`Project list`, 200, res, {});

  } catch (err) {
    console.log(err);
    return response(`Couldn't get project`, 503, res);
  }
}

exports.ProjectServiceByIdAllEpics = async (id, res) => {

  try {
    const projectById = await Projects.findOne({ id: id });
    if (!projectById) return response(`Project ${id} doesn't exist`, 200, res);

    const epicsList = await Epics.find({ project: projectById._id });
    if (epicsList.length > 0) return response(`Epics for project ${id}`, 200, res, epicsList);

    return response(`There're no epics for project ${id}`, 200, res);

  } catch (err) {
    console.log(err);
    return response(`Couldn't get epic list for project ${id}`, 503, res);
  }
}
