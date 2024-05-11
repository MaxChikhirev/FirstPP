const { TasksModel } = require("./tasks.model");


class TasksService {

tasksModel;

constructor() {
    this.tasksModel = TasksModel;
}


addTask(name) {
return this.tasksModel.create({
    name
});
}


}


module.exports = {
    TasksService
}