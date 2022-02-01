const  userController = require('../controllers/UserController')

const userRouter = require('express').Router()

userRouter.post("/create", userController.createUser);

userRouter.get("/getAll", userController.getAllUsers);

userRouter.get("/:id", userController.getUserById);

userRouter.delete("/delete/:id", userController.deleteUser);

userRouter.put("/update/:id", userController.updateUser);

module.exports = userRouter;