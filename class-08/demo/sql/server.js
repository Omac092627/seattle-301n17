'use strict';

require('dotenv').config();
const cors = require('cors');
const express = require('express');

// 1. Bring in PG Client
const pg = require('pg');

// 2. Connect to our DB
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

// 3. (later) RUN commands

const app = express();

app.use(cors());

app.get('/family', (req,res) => {
  // Get family from the db and show it.
  // select * from family;

  const SQL = 'SELECT * FROM family';

  client.query(SQL)
    .then( results => {
      if( results.rowCount >= 1 ) {
        res.status(200).json(results.rows);
      }
      else {
        res.status(400).send('No Results Found');
      }
    })
    .catch(err => res.status(500).send(err));
});

app.get('/new', (req,res) => {
  // Insert a new family member
  // req.query.first_name;
  // req.query.last_name

  let SQL = `
    INSERT INTO family (first_name, last_name)
    VALUES($1, $2)
  `;

  let VALUES = [req.query.first_name, req.query.last_name];

  client.query(SQL, VALUES)
    .then( results => {
      if ( results.rowCount >= 1 ) {
        res.status(301).redirect('http://www.google.com');
      }
      else {
        res.status(200).send('Not Added');
      }
    })
    .catch(err => res.status(500).send(err));

});

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server listening on ${PORT}`));
