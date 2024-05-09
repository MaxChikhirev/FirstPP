const { PORT, path, app, bodyParser, express } = require('./constants/constants');
const db = require('./dbConfig');
const { router } = require('./routes/routes');


app.set('view engine', 'ejs');

// Указываем, где Express должен искать шаблоны
app.set('views', path.join(__dirname, 'my_online_shop', 'src', 'pages'));

app.use(router);
app.use(express.static(path.join(__dirname, 'my_online_shop', 'src', 'pages', 'views')));

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
