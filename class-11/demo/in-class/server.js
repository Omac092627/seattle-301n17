'use strict';

require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
const PORT = process.env.PORT || 3000;

const app = express();

// Bring in EJS as the "view" (templating) engine
app.set('view engine', 'ejs');

app.use( express.urlencoded({extended:true }));

app.use( express.static('./www') );

// This is a good one
app.get('/', (request, response) => {
  response.status(200).render('pages/index');
});

// .render() to show a view, and merge in an object
app.get('/person', (request, response) => {
  let data = {
    name: request.query.name,
    hairStyle: request.query.hair,
    kids: ['Zach', 'Allie'],
  };

  console.log(data);

  response.status(200).render('pages/person.ejs', {person:data});
});

app.post('/article', (request, response) => {
  response.status(200).render('pages/article', {article: request.body.content});
});

// This will force an error
app.get('/badthing', (request,response) => {
  throw new Error('WTF???');
});

// ------------ IT's ABOUT TO GET REAL ---------------- //

app.get('/searchForm', (request, response) => {
  response.status(200).render('pages/search-form');
});

app.post('/search', (request, response) => {

  // https://developers.google.com/books/docs/v1/using
  // request.body (came form POST) { search: 'hockey', searchby: 'intitle' }
  // ?q=intitle:hockey
  // request.body (came form POST) { search: 'kronika', searchby: 'inauthor' }
  // ?q=inauthor:kronika

  let url = 'https://www.googleapis.com/books/v1/volumes';
  let queryObject = {
    q: `${request.body.searchby}:${request.body.search}`,
  };

  superagent.get(url)
    .query( queryObject )
    .then( results => {
      // our books are in results.body ...
      let books = results.body.items.map( book => new Book(book) );
      response.status(200).render('pages/search-results', {books: books});
    });

});

function Book(data) {
  this.title = data.volumeInfo.title;
  this.amount = data.saleInfo.listPrice ? data.saleInfo.listPrice.amount : 'Unknown';
}

// ------------ /IT's ABOUT TO GET REAL ---------------- //

// 404 Handler
app.use('*', (request, response) => {
  console.log(request);
  response.status(404).send(`Can't Find ${request.path}`);
});

// Error Handler
app.use( (err,request,response,next) => {
  console.error(err);
  response.status(500).send(err.message);
});

// Startup

function startServer() {
  app.listen( PORT, () => console.log(`Server running on ${PORT}`));
}

startServer();
