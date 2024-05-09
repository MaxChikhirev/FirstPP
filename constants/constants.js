const PORT = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const pgsql_port = 5432

module.exports = {
    PORT, express, bodyParser, app, path, pgsql_port
}