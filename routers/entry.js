const { Router } = require('express');

const entryController = require('../controllers/entry.js');

const entryRouter = Router();

entryRouter.get("/", entryController.index);
entryRouter.post("/", entryController.create);
entryRouter.get("/:id", entryController.show);
// entryRouter.patch("/:id", entryController.update);
// entryRouter.delete("/:id", entryController.destroy);

module.exports = entryRouter;