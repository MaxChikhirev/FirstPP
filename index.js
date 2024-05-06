const db = require('./dbConfig');

db.query('SELECT NOW()', (err, res) => {
 if (err) {
    console.error(err);
    return;
 }
 console.log('Current time:', res.rows[0].now);
});
