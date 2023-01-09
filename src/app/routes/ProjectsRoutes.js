const express = require("express");
const { isTokenValid, isIdAndTokenValid } = require("../../utils/isIdAndTokenValid");
const {
    AllProjectController,
    NewProjectController,
    ProjectControllerById,
    ProjectControllerByIdAllEpics,
    ProjectDeleteByIdController
} = require('../controllers/ProjectController');
const { isNewProjectValid } = require("../helpers/newItemsValidator");
const router = express.Router();

router.post("", isTokenValid, isNewProjectValid, NewProjectController);

router.get("", isTokenValid, AllProjectController);

router.get("/:id", isIdAndTokenValid, ProjectControllerById);

router.get("/:id/epics", isIdAndTokenValid, ProjectControllerByIdAllEpics);

router.delete("/:id", isIdAndTokenValid, ProjectDeleteByIdController);

module.exports = router;
