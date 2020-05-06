'use strict';

require('dotenv').config();
const express = require('express');
const pg = require('pg');

const app = express();
app.set('view engine', 'ejs');
const client = new pg.Client(process.env.DATABASE_URL);

app.get('/', showPeople);
app.get('/types', showTypes);

function showPeople( req, res ) {
  res.status(200).send('Make this print a list of people from the database, using index.ejs');
}

function showTypes(req, res) {
  res.status(200).send('Make this print a list of unique people types from the database, using types.ejs');
}

function startServer() {
  app.listen( process.env.PORT, () => console.log('Server listening on', process.env.PORT));
}
client.connect()
  .then( startServer );
