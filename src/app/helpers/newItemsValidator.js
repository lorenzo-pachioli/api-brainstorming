const {
  isNameValid,
  isDescriptionValid,
  isObjectIdValid,
  isArrayOfObjIdValid,
  isDateValid,
  isIdInteger
} = require('../../utils/inputsValidator');
const { response } = require('../../utils/response');

exports.isNewUserValid = (req, res, next) => {

  const { email, password, username, name } = req.body;
  const regExEmail = /^[-\w.%+]{1,30}@(?:[A-Z0-9-]{4,30}\.)[A-Z]{2,20}$/i;
  const onlyNumbers = /^(.*\d){6,15}$/;

  //Validate required info
  if (!email || !password || !username) return response('Incorrect new user', res, 400);

  //Validate email
  if (!regExEmail.test(email)) return response('Incorrect email', res, 400);

  //Validate password
  if (!onlyNumbers.test(password) || typeof password !== 'string') return response('Incorrect password', res, 400);

  //Validate username
  if (username.length < 4) return response('Incorrect username', res, 400);

  //Validate name.first
  if (name.first.length < 4) return response('Incorrect name first', res, 400);

  //Validate name.last
  if (name.last.length < 4) return response('Incorrect name last', res, 400);

  next();
}

exports.isNewProjectValid = (req, res, next) => {
  const { name, members, description } = req.body;

  //Validate required info
  if (!name || !members) return response('Incorrect new project', res, 400);

  //Validate name
  if (!isNameValid(name)) return response('Project name is invalid', res, 400);

  //Validate description
  if (description && !isDescriptionValid(description)) return response('Project description is invalid', res, 400);

  //Validate project members id
  if (!isArrayOfObjIdValid(members)) return response('Project members id invalid', res, 400);

  next();
}

exports.isNewEpicValid = (req, res, next) => {
  const { project, name, description } = req.body;

  //Validate required info
  if (!name || !project) return response('Incorrect new project', res, 400);

  //Validate name
  if (!isNameValid(name)) return response('Epic name is invalid', res, 400);

  //Validate description
  if (description && !isDescriptionValid(description)) return response('Epic description is invalid', res, 400);

  //Validate project id
  if (!isObjectIdValid(project)) return response('Project id invalid', res, 400);

  next();
}

exports.isNewStoryValid = (req, res, next) => {
  const {
    name,
    epic,
    description,
    owner,
    assignedTo,
    points,
    created,
    due,
    started,
    finished,
    status
  } = req.body;

  //Validate required info
  if (!name || !epic) return response('Incorrect new story', res, 400);

  //Validate name
  if (!isNameValid(name)) return response('Story name is invalid', res, 400);

  //Validate description
  if (description && !isDescriptionValid(description)) return response('Story description is invalid', res, 400);

  //Validate epic id
  if (!isObjectIdValid(epic)) return response('Epic id invalid', res, 400);

  //Validate owner
  if (owner && !isObjectIdValid(owner)) return response('Story owner id invalid', res, 400);

  //Validate assignedTo
  if (assignedTo && !isArrayOfObjIdValid(assignedTo)) return response('Story assignedTo id invalid', res, 400);

  //Validate points
  if (points && points < 0 && points > 5 && !Number.isInteger(points)) return response('Story points is invalid', res, 400);

  //Validate status
  if (status && status !== 'todo' && status !== 'running' && status !== 'done') return response('Story status is invalid', res, 400);

  //Validate created
  if (created && !isDateValid(created)) return response('Story created date is invalid', res, 400);

  //Validate started
  if (started && !isDateValid(started)) return response('Story started date is invalid', res, 400);

  //Validate due
  if (due && !isDateValid(due)) return response('Story due date is invalid', res, 400);

  //Validate finished
  if (finished && !isDateValid(finished)) return response('Story finished date is invalid', res, 400);

  next();
}

exports.idValidation = (req, res, next) => {
  const { id } = req.body;

  //Validate id
  if (!isIdInteger(id)) return response('id invalid', res, 400);
  next();
}

exports.objectIdValidation = (req, res, next) => {
  const { _id } = req.body;

  //Validate _id
  if (!isObjectIdValid(_id)) return response('_id invalid', res, 400);
  next();
}

exports.isNewTaskValid = (req, res, next) => {
  const {
    name,
    description,
    story,
    created,
    dueDate,
    done
  } = req.body;

  //Validate required info
  if (!name || !story) return response('Incorrect new task', res, 400);

  //Validate name
  if (!isNameValid(name)) return response('Task name is invalid', res, 400);

  //Validate description
  if (description && !isDescriptionValid(description)) return response('Task description is invalid', res, 400);

  //Validate story id
  if (!isObjectIdValid(story)) return response('Story id invalid', res, 400);

  //Validate created
  if (created && !isDateValid(created)) return response('Task created date is invalid', res, 400);

  //Validate dueDate
  if (dueDate && !isDateValid(dueDate)) return response('Task dueDate is invalid', res, 400);

  //Validate done
  if (done && done !== true && done !== false) return response('Task done is invalid', res, 400);

  next();
}
