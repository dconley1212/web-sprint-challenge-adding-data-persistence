const db = require("../../data/dbConfig");

const find = async () => {
  const projects = await db("projects");
  const projectStructure = projects.map((project) => {
    return {
      project_id: project.project_id,
      project_name: project.project_name,
      project_description: project.project_description,
      project_completed: Boolean(project.project_completed),
    };
  });
  return projectStructure;
};

const findById = async (project_id) => {
  const project = await db("projects").where("project_id", project_id).first();
  return project;
};

const create = async (project) => {
  const [id] = await db("projects").insert(project);
  const newProject = await findById(id);
  return {
    project_id: newProject.project_id,
    project_name: newProject.project_name,
    project_description: newProject.project_description,
    project_completed: Boolean(newProject.project_completed),
  };
};

module.exports = { find, findById, create };
