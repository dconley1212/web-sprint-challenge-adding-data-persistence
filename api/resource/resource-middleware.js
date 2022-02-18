const { findByName } = require("./model");

const checkNameUnique = async (req, res, next) => {
  const { resource_name } = req.body;
  try {
    const resourceByName = await findByName(resource_name);
    if (resourceByName) {
      next({ status: 400, message: "resource name already exists" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { checkNameUnique };
