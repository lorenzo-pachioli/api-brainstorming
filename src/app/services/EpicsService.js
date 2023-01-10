const Epics = require('../models/EpicsModel');
const Stories = require('../models/StoriesModel');
const Projects = require('../models/ProjectsModel');
const { serviceReturn } = require('../../utils/response');

exports.AllEpicsService = async (userId) => {

  const projects = await Projects.find({ members: { $in: [userId] } });
  const ids = projects.map(p => `${p._id}`);
  const epicList = await Epics.find({ project: { $in: ids } });

  return serviceReturn(`Epic list`, epicList, true);
}

exports.NewEpicsService = async (newEpic) => {

  const lastEpic = await Epics.findOne().sort({ _id: -1 }).limit(1);
  const newMaxId = lastEpic ? lastEpic.id + 1 : 1;
  newEpic.id = newMaxId;
  const saved = await Epics.create(newEpic);

  if (saved) return serviceReturn(`Epic created succesfully`, saved, true);
  return serviceReturn(`The epic ${newEpic.id} failed to save`, {}, false);
}

exports.EpicsServiceById = async (id) => {

  const epicById = await Epics.findOne({ id: id });

  if (epicById) return serviceReturn(`Epic ${id}`, epicById, true);
  return serviceReturn(`Epic ${id} doesn't exist`, {}, false);
}

exports.EpicsServiceByIdAllStories = async (id) => {

  const storiesList = await Stories.find({ epic: id });

  if (storiesList.length > 0) return serviceReturn(`Stories for epic ${id}`, storiesList, true);
  return serviceReturn(`There're no stories for epic ${id}`, [], false);
}

exports.EpicDeleteByIdService = async (id) => {

  const epic = await Epics.findOne({ id: id });
  const epicById = await Epics.deleteOne({ id: id });

  if (epicById.deletedCount > 0) return serviceReturn(`Epic ${id} deleted`, epic, true);
  return serviceReturn(`Epic ${id} doesn't exist`, {}, false);
}