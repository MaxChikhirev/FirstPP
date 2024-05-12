const { PORT, path, app, express, MongoDB_NAME, MongoDB_port } = require('./constants/constants');
const db = require('./dbConfig');
const { router } = require('./routes/routes');
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'my_online_shop', 'views'));
app.use(router);
app.use(express.static(path.join(__dirname, 'my_online_shop', 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Подключение к MongoDB
async function init() {

   try {
     await mongoose.connect(`mongodb://0.0.0.0:27017/${MongoDB_NAME}`);
     console.log(`[mongo] Connected to database success: ${MongoDB_NAME}`);
   } catch (e) {
     console.log('[error] Cannot connect to database', e);
   }
 
   const server = app.listen(MongoDB_port, () => {
     console.log(`[express] Server started at http://localhost:${MongoDB_port}/`);
   });
 
 }
 
 init();



app.listen(PORT, () => console.log('Listening on port 3000...'));



db.query('SELECT NOW()', (err, res) => {
   if (err) {
      console.error(err);
      return;
   }
   console.log('Current time:', res.rows[0].now);
});
