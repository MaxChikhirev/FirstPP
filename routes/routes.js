const { Router } = require("express");
const { app } = require('../constants/constants');

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
   const { id } = req.body;
   // Assuming 'mycollection' is the name of your collection where tasks are stored
   app.locals.mongo_db.collection('mycollection').updateOne(
       { _id: mongoose.Types.ObjectId(id) }, // Convert string ID to ObjectId
       { $set: { completed: true } }, // Set the 'completed' field to true
       (err, result) => {
           if (err) {
               console.error(err);
               return res.status(500).send('Error updating task');
           }
           if (result.matchedCount === 0) {
               return res.status(404).send('Task not found');
           }
           res.redirect('/planner');
       }
   );
});

/* router.post('/planner/delete', async (req, res, next) => {
   const { id } = req.body;

   const newTask = await tasksService.delete(id);
   res.redirect('/planner');

}); */


module.exports = {
   router
}; 