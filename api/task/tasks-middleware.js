const db = require("../../data/dbConfig");

const checkAllRequiredFields = (req, res, next) => {
  if (!req.body.task_description || !req.body.project_id) {
    next({ status: 400, message: "missing required field" });
  } else {
    next();
  }
};

const checkValidProjectId = async (req, res, next) => {
  try {
    const project = await db("projects")
      .where("project_id", req.body.project_id)
      .first();
    if (project) {
      next();
    } else {
      next({ status: 400, message: "project_id does not exist" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkAllRequiredFields,
  checkValidProjectId,
};
