const { Router } = require('express');

const userController = require('../controllers/user.js');

const userRouter = Router();

userRouter.get("/", userController.index);
userRouter.post("/", userController.create);
userRouter.get("/:id", userController.show);
// userRouter.patch("/:id", userController.update);
// userRouter.delete("/:id", userController.destroy);

module.exports = userRouter;