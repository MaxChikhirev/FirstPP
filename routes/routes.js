const { Router } = require("express");
const { TodosService } = require("../Черновик/todos/todos.service");

const router = Router();

const todosService = new TodosService();

router.get('/', (req, res) => {
   res.render('home', { title: 'Главная страница' });
});

router.get('/about', (req, res) => {
   res.render('about', { title: 'О нас' });
});

// Далее planner app расписан
router.get('/planner', async (req, res, next) => {

   const rawList = await todosService.getList();
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
   const { texto } = req.body;
   const newTask = await todosService.addTask(texto);  
   res.redirect('/planner');
});

// дальше пока просто добавил

router.post('/planner/complete', async (req, res, next) => {

   const { id } = req.body;

   await todosService.toggleComplete(id);

   res.redirect('/planner');

});

router.post('/planner/delete', async (req, res, next) => {
   const { id } = req.body;

   const newTask = await todosService.delete(id);
   res.redirect('/planner');

});


module.exports = {
   router
}; 