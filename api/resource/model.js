// build your `Resource` model here
const db = require("../../data/dbConfig");

const find = async () => {
  const resources = await db("resources");
  const resourcesStructure = resources.map((resource) => {
    return {
      resource_id: resource.resource_id,
      resource_name: resource.resource_name,
      resource_description: resource.resource_description,
    };
  });
  return resourcesStructure;
};

// const findById = async (resource_id) => {
//   const resource = await db("resources")
//     .where("resource_id", resource_id)
//     .first();
//   return resource;
// };

const create = async (resource) => {
  const [id] = await db("resources").insert(resource);
  const newPost = await find().where({ id }).first();
  return {
    resource_id: newPost.resource_id,
    resource_name: newPost.resource_name,
    resource_description: newPost.resource_description,
  };
};

module.exports = {
  find,
  create,
};
