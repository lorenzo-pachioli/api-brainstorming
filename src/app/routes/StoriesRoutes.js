const express = require("express");
const {
    AllStoriesController,
    NewStoriesController,
    StoriesControllerById,
    StoriesControllerByIdAllTasks,
    StoryDeleteByIdController
} = require('../controllers/StoriesController');
const router = express.Router();
const { isNewStoryValid } = require("../helpers/newItemsValidator");
const { isTokenValid, isIdAndTokenValid } = require("../../utils/isIdAndTokenValid");

router.get("", isTokenValid, AllStoriesController);

router.post("", isTokenValid, isNewStoryValid, NewStoriesController);

router.get("/:id", isIdAndTokenValid, StoriesControllerById);

router.get("/:id/tasks", isIdAndTokenValid, StoriesControllerByIdAllTasks);

router.delete("/:id", isIdAndTokenValid, StoryDeleteByIdController);

module.exports = router;
