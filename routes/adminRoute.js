const AdminController = require("../controllers/AdminController");

const adminRouter = require("express").Router();

//adminRouter.get("/", AdminController.getAll);

adminRouter.post("/create", AdminController.createAdmin);

adminRouter.post("/login", AdminController.login);

module.exports = adminRouter;