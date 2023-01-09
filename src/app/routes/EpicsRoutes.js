const express = require("express");
const {
    AllEpicsController,
    NewEpicsController,
    EpicsControllerById,
    EpicsControllerByIdAllStories,
    EpicDeleteByIdController
} = require('../controllers/EpicsController');
const router = express.Router();
const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const { isNewEpicValid } = require("../helpers/newItemsValidator");

router.get("", isTokenValid, AllEpicsController);

router.post("", isTokenValid, isNewEpicValid, NewEpicsController);

router.get("/:id", isIdAndTokenValid, EpicsControllerById);

router.get("/:id/stories", isIdAndTokenValid, EpicsControllerByIdAllStories);

router.delete("/:id", isIdAndTokenValid, EpicDeleteByIdController);

module.exports = router;
