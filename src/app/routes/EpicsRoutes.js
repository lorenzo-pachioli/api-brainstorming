const express = require("express");
const {
    AllEpicsController,
    NewEpicsController,
    EpicsControllerById,
    EpicsControllerByIdAllStories,
    EpicDeleteByIdController
} = require('../controllers/EpicsController');
const router = express.Router();
const { setNext } = require('../../utils/response');
const { isIdAndTokenValid, isTokenValid } = require('../../utils/isIdAndTokenValid');
const { isNewEpicValid } = require("../helpers/newItemsValidator");

router.get("", isTokenValid, AllEpicsController);

router.post("", isTokenValid, isNewEpicValid, NewEpicsController);

router.get("/:id", isIdAndTokenValid, EpicsControllerById, (req, res, next) => {

    const id = req.params.id;
    const token = req.header('token');
    setNext(next);

    EpicsControllerById(token, id, res);
});

router.get("/:id/stories", isIdAndTokenValid, EpicsControllerByIdAllStories, (req, res, next) => {

    const id = req.params.id;
    const token = req.header('token');
    setNext(next);

    EpicsControllerByIdAllStories(token, id, res);
});

router.delete("/:id", isIdAndTokenValid, EpicDeleteByIdController, (req, res, next) => {

    const id = req.params.id;
    const token = req.header('token');
    setNext(next);

    EpicDeleteByIdController(token, id, res);
});

module.exports = router;
