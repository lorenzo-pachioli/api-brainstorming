const ObjectId = require('mongoose').Types.ObjectId;

exports.isIdInteger = (id) => {
  const idToNumber = Number(id);

  if (idToNumber <= 0 || !Number.isInteger(idToNumber)) {
    return false;
  }

  return true;
}

exports.isNameValid = (name) => {

  if (!name || name.length < 4) {
    return false;
  }
  return true;
}

exports.isDescriptionValid = (description) => {

  if (description && description.length < 10) {
    return false;
  }
  return true;
}

exports.isObjectIdValid = (id) => {

  if (ObjectId.isValid(id)) {
    if ((String)(new ObjectId(id)) === id) {
      return true;
    }
    return false;
  }
  return false;
}

exports.isArrayOfObjIdValid = (array) => {

  if (array.length === 0) {
    return false;
  }

  return !array.some(objectId => {
    return !this.isObjectIdValid(objectId);
  });
}

exports.isDateValid = (date) => {
  const toDate = new Date(date);
  return toDate.getTime() === toDate.getTime();
}
