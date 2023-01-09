const UsersBrainstorming = require('../models/UsersModel');
const { createUsers } = require('../helpers/modelCreators');
const { remover } = require('../../utils/remover');
const { serviceReturn } = require('../../utils/response');

exports.NewUsersService = async (newUser) => {

  const userAlreadyExist = await UsersBrainstorming.findOne({ username: newUser.username });
  if (userAlreadyExist) return serviceReturn(`Username '${newUser.username}' already exist`, {}, false);
  const userList = await UsersBrainstorming.findOne().sort({ _id: -1 }).limit(1);
  const newMaxId = userList.id + 1;
  const user = createUsers(newMaxId, newUser);
  const saved = await user.save();
  if (saved) return serviceReturn(`User created succesfully`, saved, true);
  return serviceReturn(`The user ${newStory.id} failed to save`, {}, false);
}

exports.AllUsersService = async () => {

  const userList = await UsersBrainstorming.find();
  if (userList.length > 0) {
    const userListWithoutPass = remover(userList, 'password');
    return serviceReturn(`User list`, userListWithoutPass, true);
  }
  return serviceReturn(`User list is empty`, [], true);
}

exports.UsersServiceById = async (_id) => {

  const user = await UsersBrainstorming.findOne({ _id });
  if (user) {
    const userWithoutPassword = remover(user, 'password');
    return serviceReturn(`User ${_id}`, userWithoutPassword, true);
  }
  return serviceReturn(`User ${_id} doesn't exist`, {}, false);
}

exports.ModifyUsersService = async (newUser) => {

  const userUpdated = await UsersBrainstorming.findOneAndUpdate({ _id: newUser._id }, newUser, { new: true });
  if (userUpdated) {
    const userUpdatedNoPass = remover(userUpdated);
    return serviceReturn(`User ${newUser.id} updated`, userUpdatedNoPass, true);
  }
  return serviceReturn(`Couldn't update user`, {}, false);
}

exports.UserDeleteByIdService = async (_id) => {

  const userById = await UsersBrainstorming.deleteOne({ _id });
  if (userById.deletedCount > 0) return serviceReturn(`user ${_id}`, {}, true);
  return serviceReturn(`user ${_id} doesn't exist`, {}, false);
}
