'use strict';

/*
  The .env file has this in it:
  PORT=3000
*/
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const superagent = require('superagent');

const PORT = process.env.PORT;

let locationCache = {};
/*
  {
    "cape may": "{...}",
    "lynnwood,wa": "{...}"
  }
*/

const app = express();
app.use(cors());

app.get('/location', handleLocation);
app.get('/restaurants', handleRestaurants);

function handleLocation( request, response ) {

  console.log('Current Cache');
  console.log(locationCache);
  console.log('--------------------------');

  // Should "normalize" the requested city name
  let city = request.query.city.toLowerCase();

  // is this city in our cache?
  // is this in our DATABASE??? (select statement)
  if( locationCache[city] ) {
    console.log(city, 'Came from Memory');
    response.json( locationCache[city] );
    return;
  }

  console.log('fetching', city, 'from location IQ');

  const url = 'https://us1.locationiq.com/v1/search.php';
  const queryStringParams = {
    key: process.env.LOCATION_TOKEN,
    q: city,
    format: 'json',
    limit: 1,
  };
  // $.ajax(url)
  superagent.get(url)
    .query(queryStringParams)
    .then( data => {
      let locationData = data.body[0];
      let location = new Location(city, locationData);
      // put this 'location' object into the cache
      // Actually ... insert it into the database
      locationCache[city] = location;
      response.json(location);
    });
}

function Location(city, data) {
  this.search_query = city;
  this.formatted_query = data.display_name;
  this.latitude = data.lat;
  this.longitude = data.lon;
}

/* Restaurants

  {
    "restaurant": "Serious Pie",
    "cuisines": "Pizza, Italian",
    "locality": "Belltown"
  },
*/


function handleRestaurants(request, response) {

  // let restaurantData = require('./data/restaurants.json');
  let listOfRestaurants = [];

  let url = 'https://developers.zomato.com/api/v2.1/geocode';
  let queryStringParams = {
    lat: request.query.latitude,
    lon: request.query.longitude,
  };

  // user-key
  superagent.get(url)
    .query(queryStringParams)
    .set('user-key', process.env.ZOMATO_TOKEN)
    .then( data => {
      let restaurantData = data.body;
      restaurantData.nearby_restaurants.forEach(r => {
        let restaurant = new Restaurant(r);
        listOfRestaurants.push(restaurant);
      });

      response.json(listOfRestaurants);
    });

}

function Restaurant(data) {
  this.name = data.restaurant.name;
  this.cuisines = data.restaurant.cuisines;
  this.locality = data.restaurant.location.locality;
}

app.listen( PORT, () => console.log('Server up on', PORT));

