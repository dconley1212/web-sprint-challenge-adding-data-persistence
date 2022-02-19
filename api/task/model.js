const db = require("../../data/dbConfig");

const find = async () => {
  const newTasksProjectsData = await db("tasks as t")
    .leftJoin("projects as p", "p.project_id", "t.task_id")
    .select(
      "t.task_id",
      "t.task_description",
      "t.task_notes",
      "t.task_completed",
      "p.project_name",
      "p.project_description"
    );

  const taskProjectStructure = newTasksProjectsData.map((data) => {
    return {
      task_id: data.task_id,
      task_description: data.task_description,
      task_notes: data.task_notes,
      task_completed: Boolean(data.task_completed),
      project_name: data.project_name,
      project_description: data.project_description,
    };
  });
  return taskProjectStructure;
};

const findTaskById = async (task_id) => {
  const task = await db("tasks").where("task_id", task_id).first();
  return task;
};

// const findProjectById = async (project_id) => {
//   const project = await db("projects").where("project_id", project_id).first();
//   return project;
// };

const create = async (task) => {
  const [id] = await db("tasks").insert(task);
  const newTask = await findTaskById(id);

  return {
    task_id: newTask.task_id,
    task_description: newTask.task_description,
    task_notes: newTask.task_notes,
    task_completed: Boolean(newTask.task_completed),
    project_id: newTask.project_id,
  };
};

module.exports = { find, findTaskById, create };
