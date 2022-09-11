"use strict";
const states = require("./data");
const { Dictionary } = require("./src/dictionary/dictionary");
const statesDictionary = new Dictionary(states);
/* === Properties ===  */
// console.log(statesDictionary.root);
// console.log(statesDictionary.options);
/* === Methods ===  */
/* = Test - search =  */
// console.log(statesDictionary.search("Ohio"));
// console.log(statesDictionary.search("Ohi"));
/* = Test - prefixSearch = */
// console.log(statesDictionary.search("Ohi"));
// console.log(statesDictionary.search("Ohio"));
// console.log(statesDictionary.search("Ohis"));
/* = Test - findMatches =  */
// console.log(statesDictionary.findMatches("A"));
// console.log(statesDictionary.findMatches("A", -1));
// console.log(statesDictionary.findMatches("A", 0));
// console.log(statesDictionary.findMatches("A", 3));
// console.log(statesDictionary.findMatches("Al"));
// console.log(statesDictionary.findMatches("Alabama"));
