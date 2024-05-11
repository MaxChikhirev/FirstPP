const { model } = require("mongoose");
const { TasksSchema } = require("./tasks.schema");

const TasksModel = model ('Task', TasksSchema);

module.exports = { TasksModel };