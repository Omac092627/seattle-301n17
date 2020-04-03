'use strict';

// Const = constant
// The variable cannot be CHANGED
const pi = 3.14;

// SCALARS: boolean, int, str
let name = "John";

// Compex Vars (array,obj,fn);
const family = ['John'];

function hoisting(arr) {

  // for( var i = 1; i<arr.length; i++) {
  for (let i = 1; i < arr.length; i++) {
    // console.log(i);
  }

  // console.log(i); // how does this work with let vs var?

  let name = "john";
  console.log(name);


}

console.log(name);

var list = ['a', 'b', 'c']
hoisting(list);

family.push('Cathy');

console.log(family);
