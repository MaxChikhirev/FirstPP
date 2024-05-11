const { Schema} = require ('mongoose');

const TasksSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = {
    TasksSchema
}
