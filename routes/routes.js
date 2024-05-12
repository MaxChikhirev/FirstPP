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
router.get('/planner', async (req, res, next) => {

   const rawList = await tasksService.getList();
   const list = rawList.map((el) => {
      return {
         name: el.name,
         id: el.id.toString(),
         completed: el.completed,
         createdAt: new Date(el.createdAt).toLocaleString('ru-RU'),
         completedClass: el.completed ? 'todos_item_complited' : ''
      }
   })
   res.render('planner', { list });
});

router.get('/planner/new', async (req, res, next) => {
   res.render('planner_new', {
      title: 'Создать новое дело',
      description: 'Создать новое дело в приложении Список дел',
      h1: 'Создать новое дело',
      text: 'Привет! Давай создадим новое дело, <br>чтобы не забыть его!',
   });

});

router.post('/planner/add', async (req, res, next) => {
   console.log(req.body)
   const { text } = req.body;
   const newTask = await tasksService.addTask(text);
   res.redirect('/planner');

});

// дальше пока просто добавил

router.post('/planner/complete', async (req, res, next) => {

   const { id } = req.body;

   await tasksService.toggleComplete(id);

   res.redirect('/planner');

});

router.post('/planner/delete', async (req, res, next) => {
   const { id } = req.body;

   const newTask = await tasksService.delete(id);
   res.redirect('/planner');

});


module.exports = {
   router
}; 