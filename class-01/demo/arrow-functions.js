'use strict';


function greeting(name) {
  return `Hello, ${name}`;
}

let greet = function (name) {
  return `Hi, ${name}`;
}

let greeter = (name) => {
  return `Hey, ${name}`;
}

let howdy = name => {
  return `Howdy, ${name}`;
}

let yo = name => `Yo, ${name}`;

let yell = name => console.log(name.toUpperCase());

let Person = function (name) {
  this.name = name;
  this.walk = function () { console.log(`${this.name}, walking`) }
  this.talk = () => console.log(`${this.name}, talking`);
}
Person.prototype.yell = function () {
  console.log(this);
  console.log(this.name.toUpperCase());
}

// Anit-Pattern
Person.prototype.whisper = () => {
  // console.log(this);
  // console.log( this.name.toLowerCase() );
}

let john = new Person('John');
john.walk();
john.talk();
john.yell();
john.whisper();

console.log(greeting("John"));
console.log(greet('Cathy'));
console.log(greeter('Zach'));
console.log(howdy('Allie'));
console.log(yo('Rosie'));
console.log(yell('ouch'));


let objectLit = () => [1, 2, 3, 4]

// TODO: Uncomment the following line of code to see the output in the browser console
console.log(objectLit());
