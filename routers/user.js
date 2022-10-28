const { Router } = require('express');

const userController = require('../controllers/user.js');

const userRouter = Router();

userRouter.get("/", userController.index); // gets all
userRouter.post("/register", userController.register); // register a new user
userRouter.get("/:id", userController.show); // get a specific user
userRouter.post("/login", userController.login);
// userRouter.delete("/:id", userController.destroy);

module.exports = userRouter;