const { Schema, model } = require('mongoose');
const Projects = require('./ProjectsModel');

const epicsSchema = new Schema({
  id: {
    type: Number,
    required: true,
    min: 1,
    unique: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: Projects,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  icon: {
    type: String,
    required: false
  }
});
const Epics = model('Epics', epicsSchema);
module.exports = Epics;