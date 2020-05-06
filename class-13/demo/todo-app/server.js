'use strict';

require('dotenv').config();
const express = require('express');
const pg = require('pg');
const methodOverride = require('method-override');

const app = express();

const PORT = process.env.PORT;

// Application Setup
const client = new pg.Client(process.env.POTATOES);

app.use( express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

// Route Definitions
app.use( express.static('./www'));

// When someone does a get request for '/', run handleHomePage
app.get('/', handleHomePage); // "READ/GET"
app.get('/task/:coolstuff', handleGetOneTask); // "READ/GET" only one
app.get('/addform', handleAddForm); //
app.post('/add', handleNewItem); // "CREATE POST"
app.delete('/delete-task/:id', handleDelete);
app.put('/mark-complete/:id', handleComplete);
app.put('/update-task/:id', handleUpdate);
app.get('/bad', causeError);
app.use('*', notFoundHandler);
app.use(errorHandler);

// Route Handlers

// Users' intent is to "READ" a list of to do items from the DB
function handleHomePage( request, response ) {
  // Query our Database for all To Do Items
  const SQL = 'SELECT * FROM tasks';

  client.query(SQL)
    // The query worked ... send the results to the template
    .then( results => {
      // Send a response to the browser with a code of 200
      // Render the contents of './views/pages/index.ejs'
      // Send the results from the query
      response.status(200).render('pages/index', {tasks:results.rows });
    })
    .catch( error => {
      console.error('ERROR', error.message);
    });

}

// 6

// Users Intent: Get one task from the database by ID
function handleGetOneTask(request, response) {
  // request.query == Query String (?this=that&what=how)
  // request.body == Form POST
  // request.params == /x/y/z
  const SQL = `SELECT * FROM tasks WHERE id = $1`;
  const VALUES = [request.params.coolstuff];

  console.log('getting', request.params.coolstuff);

  client.query(SQL, VALUES)
    .then( results => {
      response.status(200).render('pages/task', {task:results.rows[0]});
    })
    .catch(error => {
      console.error(error.message);
    });
}

function handleAddForm( request, response ) {
  response.status(200).render('pages/add');
}

function handleNewItem( request, response ) {
  console.log('Item to be added: ', request.body);
  let SQL = `
    INSERT INTO tasks (task, assignee, category, complete)
    VALUES ( $1, $2, $3, $4 )
  `;
  let VALUES = [
    request.body.task,
    request.body.assignee,
    request.body.category,
    request.body.complete,
  ];

  if ( ! (request.body.task || request.body.assignee || request.body.cateogry || request.body.complete) ) {
    throw new Error('invalid input');
  }

  client.query(SQL, VALUES)
    .then( results => {
      // result.rows will have the number of rows that were affected by the SQL
      // .render()
      // .send()
      // .json()
      response.status(200).redirect('/');
    })
    .catch( error => {
      console.error( error.message );
    });

}

function handleDelete( request, response) {

  // let id = request.body.id; // 4
  // app.post('/delete/:id') ... the :id is request.params.id

  let id = request.params.id; // 77

  let SQL = 'DELETE FROM tasks WHERE id = $1';
  let VALUES = [id];

  client.query( SQL, VALUES )
    .then( (resposne) => {
      response.status(200).redirect('/');
    });


}

function handleComplete(request,response) {

  let id = request.params.id;
  let SQL = 'UPDATE tasks SET complete = \'complete\' WHERE id = $1';
  let VALUES = [id];
  client.query(SQL,VALUES)
    .then( results => {
      response.status(200).redirect('/');
    });
}

function handleUpdate(request, response) {
  let SQL = 'UPDATE tasks set task = $1, assignee=$2 WHERE id = $3';
  let VALUES = [request.body.task, request.body.assignee, request.params.id];

  client.query(SQL, VALUES)
    .then( results => {
      response.status(200).redirect(`/task/${request.params.id}`);
    });
}

function causeError( request, response ) {
  throw new Error('This just happened');
}

function notFoundHandler( request, response ) {
  response.status(404).render('pages/404');
}

function errorHandler( error, request, response, next ) {
  // JS Shorthand Trick: {error} is the same thing as {error:error}
  response.status(500).render('pages/500', {error});
}

function startServer(PORT) {
  app.listen(PORT, () => console.log(`Up on port ${PORT}`));
}

client.connect()
  .then( () => {
    startServer(PORT);
  })
  .catch( error => console.error(error.message));
