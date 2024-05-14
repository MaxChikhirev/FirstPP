const { Router } = require("express");
const { app, mongoose } = require('../constants/constants');

const router = Router();

router.get('/', (req, res) => {
   res.render('home', { title: 'Главная страница' });
});

router.get('/about', (req, res) => {
   res.render('about', { title: 'О нас' });
});

// Далее planner app расписан
router.get('/planner', async (req, res) => {
   try {
       const tasks = await app.locals.mongo_db.collection('mycollection').find({}).toArray();
       if (!tasks || tasks.length === 0) {
           console.log('No tasks found in the database.');
           return res.status(200).send('No tasks found.');
       }
       const list = tasks.map(task => ({
           name: task.text,
           id: task._id.toString(),
           completed: task.completed,
           createdAt: new Date(task.createdAt).toLocaleString('ru-RU'),
           completedClass: task.completed? 'todos_item_complited' : ''
       }));
       console.log('Tasks fetched:', list);
       res.render('planner', { list });
   } catch (err) {
       console.error('Error fetching tasks:', err);
       res.status(500).send('Error fetching tasks');
   }
});

router.get('/planner/new', async (req, res, next) => {
   res.render('planner_new', {
      title: 'Создать новое дело',
      description: 'Создать новое дело в приложении Список дел',
      h1: 'Создать новое дело',
      text: 'Привет! Давай создадим новое дело, <br>чтобы не забыть его!',
   });

});

router.post('/planner/add', (req, res) => {
   const data = req.body;
   // Access mongo_db directly from app.locals
   app.locals.mongo_db.collection('mycollection').insertOne(data, (err, result) => {
       if (err) throw err;
       res.redirect('/planner');
   });
});

router.post('/planner/complete', (req, res) => {
   console.log(req.body); 
   const { id } = req.body.id;
   console.log('Updating task with ID:', id); // Логирование ID задачи
   app.locals.mongo_db.collection('mycollection').updateOne(
       { _id: new mongoose.Types.ObjectId(id) },
       { $set: { completed: true } },
       (err, result) => {
           if (err) {
               console.error(err);
               return res.status(500).send('Error updating task');
           }
           if (result.matchedCount === 0) {
               console.log('No task found with ID:', id); // Логирование, если задача не найдена
               return res.status(404).send('Task not found');
           }
           res.redirect('/planner');
       }
   );
});

router.delete('/planner/delete/:id', async (req, res, next) => {
   const { id } = req.params;

   try {
       await app.locals.mongo_db.collection('mycollection').deleteOne({ _id: new mongoose.Types.ObjectId(id) });
       console.log(`Task with ID ${id} deleted successfully.`);
       res.redirect('/planner');
   } catch (err) {
       console.error('Error deleting task:', err);
       res.status(500).send('Error deleting task');
   }
});

module.exports = {
   router
}; 