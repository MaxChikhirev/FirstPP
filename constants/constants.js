const PORT = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const pgsql_port = 5432
const MongoDB_NAME = 'First_PP_MongoDB'
const MongoDB_port = 27017

module.exports = {
    PORT, express, bodyParser, app, path, pgsql_port, MongoDB_NAME, MongoDB_port
}