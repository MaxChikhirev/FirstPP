const { Router } = require("express");
const { TasksService } = require("../my_online_shop/Planner/Tasks/tasks.service");

const router = Router();

const tasksService = new TasksService();

router.get('/', (req, res) => {
    res.render('home', { title: 'Главная страница' });
 });
 
 router.get('/about', (req, res) => {
    res.render('about', { title: 'О нас' });
 });

 // Далее planner app расписан
 router.get('/planner', (req, res) => {
   res.render('planner', {});
});

router.get('/planner/new', (req, res) => {
   res.render('planner_new', {});
});

router.post('/planner/new', async (req, res, next) => {
const {text} = req.body;
console.log(text);

//const newTask = await tasksService.addTask(text);
//res.redirect('/planner');
});

router.post('/complete', (req, res, next) => {
   res.send({
      ok: 'complete task'
   });
});


 module.exports = {
    router
 }; 