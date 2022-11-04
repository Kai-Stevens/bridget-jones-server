const { Router } = require('express');

const entryController = require('../controllers/entry.js');
const authenticator = require('../middleware/authenticator.js');

const entryRouter = Router();

entryRouter.get("/", authenticator, entryController.index);
entryRouter.get("/everything", entryController.testGetAll);
entryRouter.post("/", authenticator, entryController.create);
entryRouter.get("/:id", authenticator, entryController.show);
entryRouter.patch("/:id", authenticator, entryController.update);
entryRouter.delete("/:id", authenticator, entryController.destroy);

module.exports = entryRouter;