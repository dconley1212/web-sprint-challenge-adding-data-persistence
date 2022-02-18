// build your `/api/resources` router here
const router = require("express").Router();
const Resources = require("./model");

router.post("/", async (req, res, next) => {
  try {
    if (req.body) {
      const newResource = await Resources.create(req.body);
      res.status(201).json(newResource);
    } else {
      next({ status: 400, message: "missing something in your request" });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const theResourcesArray = await Resources.find();
    res.status(200).json(theResourcesArray);
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
