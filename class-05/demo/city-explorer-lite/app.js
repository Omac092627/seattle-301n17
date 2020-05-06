'use strict';

function setupEventListeners() {
  $('#search-form').on('submit', fetchCityData);
}

function fetchCityData(event) {
  event.preventDefault();
  let searchQuery = $('#input-search').val().toLowerCase();
  getLocation(searchQuery);
}

function getLocation() {

  $.ajax('/fake-data/location.json')
    .then( location => {
      showTitle(location);
      showMap(location);
      getRestaurants(location);
    });

}

function showTitle(location) {
  // container = #title
  // template = #title-template
  // data == location

  let $template = $('#title-template').html();
  let $target = $('#title');
  let html = Mustache.render( $template, location );
  $target.html(html);

}

function showMap(location) {
  // container = #title
  // template = #title-template
  // data == location

  let $template = $('#map-template').html();
  let $target = $('#map');
  let html = Mustache.render($template, location);
  $target.html(html);
}

function getRestaurants(location) {
  // container = #restaurants-results
  // template = #restaurants-results-template
  // data == come from an ajax call

  let $template = $('#restaurants-results-template').html();
  let $target = $('#restaurants-results');

  $.ajax('/fake-data/restaurants.json')
    .then( list => {
      list.forEach( restaurant => {
        let html = Mustache.render($template, restaurant);
        $target.append(html);
      });
    });

}

$(document).ready(function() {
  setupEventListeners();
});
