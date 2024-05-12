const { TasksModel } = require("./tasks.model");


class TasksService {

tasksModel;

constructor() {
    this.tasksModel = TasksModel;
}


addTask(name) {
return this.tasksModel.create({ name });
}

getList() {
    return this.tasksModel.find().sort({
        'createdAt': -1
    }).exec();
}
}


module.exports = {
    TasksService
}