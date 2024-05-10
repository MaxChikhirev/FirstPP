const { Router } = require("express");

const router = Router();


router.get('/', (req, res) => {
    res.render('home', { title: 'Главная страница' });
 });
 
 router.get('/about', (req, res) => {
    res.render('about', { title: 'О нас' });
 });
 
 
 // Ниже ссылки на Веб сайт с заметками
 router.get('/planner', (req, res) => {
   res.render('index', { title: '' });
});
router.post('/planner/new', (req, res) => {
   res.render('new', { title: '' });
});

 module.exports = {
    router
 }; 