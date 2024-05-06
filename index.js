const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use('/src/pages', express.static(path.join(__dirname, 'public/src/pages')));
app.use('/styles', express.static(path.join(__dirname, 'public/styles')));
app.use('/scripts', express.static(path.join(__dirname, 'public/scripts')));
app.use(bodyParser.json());

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

app.get('/', (req, res) => {
   res.send('Hello World!');
});
app.get('/products', (req,res) => res.json(products));
app.post('/products', (req,res) => {
   products.push(req.body);
   res.json(req.body);
});



app.get('/', (req, res) => res.send('Привет мир123!'));

app.listen (3000, () => console.log ('Listening on port 3000...'));

const db = require('./dbConfig');

db.query('SELECT NOW()', (err, res) => {
 if (err) {
    console.error(err);
    return;
 }
 console.log('Current time:', res.rows[0].now);
});
