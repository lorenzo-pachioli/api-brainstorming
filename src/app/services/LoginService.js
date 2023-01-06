const jwt = require('jsonwebtoken');
const UsersBrainstorming = require('../models/UsersModel');
const { remover } = require('../../utils/remover');

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
    return {
      token,
      userWithoutPass
    }
  }
  return;
}
