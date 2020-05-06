'use strict';

const superagent = require('superagent');

function shout(words) {
  let uc = words.toUpperCase();
  return uc;
}

let person = 'John';
let loudyMcLouderson = shout(person);
console.log(loudyMcLouderson);

function getPokemon() {

  console.log('in the get function');

  return superagent.get('https://pokeapi.co/api/v2/pokemon/')
    .then( response => {
      console.log('got the response');
      return response.body;
    });

  console.log('done with the get function');
}



function render() {

  console.log('render was called');

  getPokemon()
    .then( creatures => {
      // console.log(creatures.results);
      // iterate the list ...
      // creatures.results.forEach() -- Always runs for every entry in array. DOES NOT RETURN
      // for() -- Runs as many times as you want
      // creatures.results.filter() -- Always runs for every entry. RETURNS an array of sized based on the filter
      // creatures.results.map() -- Always runs for every entry. RETURNS an array of same size as the original
      // creatures.results.reduce() -- Always runs for every entry. RETURNS accumulator (any damn thing you want)

      let bees = creatures.results.filter( entry => { return entry.name.startsWith('b'); });
      console.log('BEES', bees);

      let names = creatures.results.map( entry => entry.name.toUpperCase() );
      console.log(names);

      let nums = [2,4,6,8];
      console.log( nums.map( n => n*n ) );

      let links = creatures.results.reduce( (acc, value, idx) => {
        acc[value.name] = value.url;
        return acc;
      }, {} );

      console.log(links);


      let numBees = creatures.results.reduce( (acc,value,idx) => {
        if ( value.name.startsWith('b') ) { acc++; }
        return acc;
      }, 0);

      console.log(`There are ${numBees} that start with B`);

    });

  console.log('done with render');
}

render();
