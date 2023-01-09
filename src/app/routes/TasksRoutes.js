const express = require("express");
const {
    AllTasksController,
    NewTasksController,
    TasksControllerById,
    TasksDeleteByIdController,
    ModifyTasksByIdController
} = require('../controllers/TasksController');
const router = express.Router();
const { isTokenValid, isIdAndTokenValid } = require("../../utils/isIdAndTokenValid");
const { isNewTaskValid } = require("../helpers/newItemsValidator");

router.get("", isTokenValid, AllTasksController);

router.post("", isTokenValid, isNewTaskValid, NewTasksController);

router.get("/:id", isIdAndTokenValid, TasksControllerById);

router.delete("/:id", isIdAndTokenValid, TasksDeleteByIdController);

router.put("", isIdAndTokenValid, isNewTaskValid, ModifyTasksByIdController);

module.exports = router;
