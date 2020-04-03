'use strict';

// Vanilla JS - Event Listener on a Button

// let button = document.getElementsByTagName('button');

// for (let i = 0; i < button.length; i++) {
//   button[i].addEventListener('click', clickMe);
// }

// with jQuery

// $(findstuffinthedom).doSomething(withIt);
// $(CSS SELECTOR)
//   #person
//   .list
//   li:last-child
//   ul:after

// "on" is an event handler
// first param is the event
// Optional 2nd parm is delegate
// Last param is the callback function
$('button').on('click', clickMe);


$('ul').on('click', 'li', clickPerson);


function clickMe() {
  // let div = document.getElementById('container');
  // let p = document.createElement('p');
  // p.textContent = "Button Was Clicked";
  // div.appendChild(p);

  $('li').fadeIn();

}

function clickPerson() {
  // this
  // jQuery's this is $(this)
  // $(this) is the active thing ...


  // let content = $(this).text(); // getter
  // content = content.toUpperCase();
  // $(this).text(content); // with (stuff) -- setter

  // $(this).text($(this).text().toUpperCase());
  $(this).fadeOut();
}


$(document).ready(function () {

  // AJAX
  // Asynchronous Javascipt And XML (JSON)
  $.ajax('people.json')
    .then(grass => {
      grass.forEach((person, idx) => {
        $('ul').append(`<li>${person}</li>`)
      })
    });

});
