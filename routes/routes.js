const { Router } = require("express");

const router = Router();


router.get('/', (req, res) => {
    res.render('home', { title: 'Главная страница' });
 });
 
 router.get('/about', (req, res) => {
    res.render('about', { title: 'О нас' });
 });
 
 
 // Ниже ссылки на Веб сайт с заметками
 router.get('/planner', (req, res, next) => {
   res.render('planner_main', {});
});

router.get('/planner/new', (req, res, next) => {
   res.render('planner_new', {});
});



 module.exports = {
    router
 }; 