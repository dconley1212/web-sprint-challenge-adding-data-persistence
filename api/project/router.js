// build your `/api/projects` router here
const router = require("express").Router();
const Projects = require("./model");

router.get("/", async (req, res, next) => {
  try {
    const projectsArray = await Projects.find();
    res.status(200).json(projectsArray);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (req.body) {
      const newProject = await Projects.create(req.body);
      res.status(201).json(newProject);
    } else {
      next({ status: 400, message: "missing a something ing your request" });
    }
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
