const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');


app.use(bodyParser.json());

/* const products = [
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

app.set('view engine', 'ejs');

// Указываем, где Express должен искать шаблоны
app.set('views', path.join(__dirname, 'my_online_shop', 'src', 'pages'));

app.use(express.static('public'))


// БЛОК Страничек
app.get('/', (req, res) => {
   res.render('home', { title: 'Главная страница' });
});

app.get('/about', (req, res) => {
   res.render('about', { title: 'О нас' });
});

// КОНЕЦ Блока страничек


app.listen (3000, () => console.log ('Listening on port 3000...'));

const db = require('./dbConfig');

db.query('SELECT NOW()', (err, res) => {
 if (err) {
    console.error(err);
    return;
 }
 console.log('Current time:', res.rows[0].now);
});
