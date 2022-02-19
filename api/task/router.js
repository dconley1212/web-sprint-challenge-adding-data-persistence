const router = require("express").Router();
const {
  checkAllRequiredFields,
  checkValidProjectId,
} = require("./tasks-middleware");
const TasksModel = require("./model");

router.get("/", async (req, res, next) => {
  try {
    const tasksAndProjects = await TasksModel.find();
    res.status(200).json(tasksAndProjects);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  checkAllRequiredFields,
  checkValidProjectId,
  async (req, res, next) => {
    try {
      const newTask = await TasksModel.create(req.body);
      res.status(201).json(newTask);
    } catch (err) {
      next(err);
    }
  }
);

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
