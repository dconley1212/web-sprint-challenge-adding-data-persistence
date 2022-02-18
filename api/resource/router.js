// build your `/api/resources` router here
const router = require("express").Router();
const { checkNameUnique } = require("./resource-middleware");
const Resources = require("./model");

router.post("/", checkNameUnique, async (req, res, next) => {
  try {
    const newResource = await Resources.create(req.body);
    res.status(201).json(newResource);
  } catch (err) {
    next(err);
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
