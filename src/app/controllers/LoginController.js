const { LoginService } = require('../services/LoginService');
const { response, logInResponse } = require('../../utils/response');
const { newError } = require('../../utils/errorModeling');

exports.LoginController = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (username.length < 4) return response('Incorrect username length', 401, res);
    if (password.length < 4) return response('Incorrect password length', 401, res);

    const user = {
      username,
      password
    }

    const logedIn = await LoginService(user);
    return logInResponse(logedIn.msg, res, 200, logedIn.content.token, logedIn.content.user);
  } catch (err) {
    return next(newError(`Couldn't login${err}`, 500));
  }
}
