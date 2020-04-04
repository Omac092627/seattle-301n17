'use strict';

// function render(person) {
//   let $container = $('#family');
//   let $personItem = $('.person-template').clone();
//   $personItem.removeClass('person-template');
//   $personItem.text(person.name);
//   $container.append($personItem);
//   // $container.append(`<li>${person.name}</li>`);
// }


function renderPerson(person) {
  // 1. data <- person
  // 2. target <- #family (<ul></ul>)
  let $target = $('#family');

  // 3. template <- #person-template (<script></script> in the head)
  let templateMarkup = $('#person-template').html();

  // Merge data with template (was the param)
  let newMarkup = Mustache.render(templateMarkup, person);

  // Put the newMarkup into the page
  $target.append(newMarkup);
}

function renderPet(pet) {
  let $target = $('#pets');
  let templateMarkup = $('#pet-template').html();
  let newMarkup = Mustache.render(templateMarkup, pet);
  $target.append(newMarkup);
}

function render(obj, sourceID, target) {
  let template = $(`#${sourceID}`).html();
  let markup = Mustache.render(template, obj);
  $(`#${target}`).append(markup);
}


function loadData() {
  $.ajax('/family.json')
    .then(family => {
      family.forEach((person) => {
        // render(person, 'person-template', 'family');
        renderPerson(person);
      });
    });

  $.ajax('/pets.json')
    .then(pets => {
      pets.forEach((pet) => {
        // render(pet, 'pet-template', 'pets');
        renderPet(pet);
      });
    });
}

$(document).ready(function () {
  loadData();
});
