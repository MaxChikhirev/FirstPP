const { PORT, path, app, bodyParser, express } = require('./constants/constants');
const db = require('./dbConfig');
const { router } = require('./routes/routes');
// const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', 'my_online_shop/views');
app.use(router);
app.use(express.static('public'));


// Planner app
 
/* app.use(bodyParser.urlencoded({ extended: false }));

 app.use(bodyParser.json()); */


 /* async function init() {

   try {
     await mongoose.connect(`mongodb://0.0.0.0:27017/${DB_NAME}`);
     console.log(`[mongo] Connected to database success: ${DB_NAME}`);
   } catch (e) {
     console.log('[error] Cannot connect to database', e);
   } */


/* app.use(bodyParser.json());

const products = [
   {
      id: 1,
      name: 'phone',
      price: 300
   },
   {
      id: 2,
      name: 'tablet',
      price: 700
   }
];
app.get('/products', (req,res) => res.json(products));
app.post('/products', (req,res) => {
   products.push(req.body);
   res.json(req.body);
}); */



app.listen(PORT, () => console.log('Listening on port 3000...'));



db.query('SELECT NOW()', (err, res) => {
   if (err) {
      console.error(err);
      return;
   }
   console.log('Current time:', res.rows[0].now);
});
