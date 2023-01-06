const jwt = require('jsonwebtoken');
const UsersBrainstorming = require('../models/UsersModel');
const { remover } = require('../../utils/remover');
const { serviceReturn } = require('../../utils/response');

exports.LoginService = async (user) => {

  const userExist = await UsersBrainstorming.findOne({ username: user.username });

  if (userExist) {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const data = {
      time: Date(),
      userId: userExist._id,
    };
    const token = jwt.sign(data, jwtSecretKey);
    const userWithoutPass = remover(userExist, 'password');
    const response = {
      token,
      user: userWithoutPass
    };
    return serviceReturn(`Correct login user ${user.username}`, response, true);
  }
  return serviceReturn(`User ${user.username} doesn't exist`, {}, false);
}
