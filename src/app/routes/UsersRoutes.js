const express = require("express");
const router = express.Router();
const {
    AllUsersController,
    NewUsersController,
    UsersControllerById,
    ModifyUserController,
    UserDeleteByIdController
} = require('../controllers/UsersController');
const { isTokenValid, isIdAndTokenValid } = require("../../utils/isIdAndTokenValid");
const { isNewUserValid } = require("../helpers/newItemsValidator");

router.post("", isNewUserValid, NewUsersController);

router.get("", isTokenValid, AllUsersController);

router.get("/:id", isIdAndTokenValid, UsersControllerById);

router.put("", isTokenValid, ModifyUserController);

router.delete("/:id", isIdAndTokenValid, UserDeleteByIdController);

module.exports = router;
