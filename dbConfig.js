const { Pool } = require('pg');
const { pgsql_port } = require('./constants/constants');


const pool = new Pool({
 user: 'postgres',
 host: 'localhost',
 database: 'postgres',
 password: 'q1w2e3R$FaSiL',
 port: pgsql_port,
});

module.exports = {
 query: (text, params, callback) => {
    return pool.query(text, params, callback);
 },
};