# Introduction

A flexible implementation of a trie (prefix tree) to let you efficiently find partial and complete matches of stored values. A trie is a tree-like data structure, also referred to as a prefix tree, that enables optimized searching for specific keys from a set.

## Why use a trie?

If you are unfamiliar with tries, this implementation can seem excessive considering there are other options for searching or filtering strings. So here I'll attempt to analyze the efficiency of using a trie.

### String-to-String

Consider two strings of length n, str1 and str2. To determine whether these two strings are equal, typically one would iterate each index and compare the characters at each index until a mismatch is found or until all characters are proven equal. Therefore, iteratively comparing the equality of two strings is linear O(n).

### String-to-Array

Now consider an array of length m, arr, containing strings of length n, and we want to determine if a string, str, exists in arr. In other words, for each element in arr, one might perform a string-to-string comparison with str until a match is found or until all elements of arr have been checked. Therefore, comparing the equality of a string to an array of strings has a time complexity of O(m * n).

### Trie

Now instead of using the string-to-array approach, which can be costly with frequent searching, we can perform the same search in linear time by using a trie.

- So let's say we have the following array:

> let arr = ["team", "tree", "trie"];

- The trie for arr would look something like the following tree:

![trie-example](https://ibb.co/30scXrS)

- Now say we perform a search to see if "tree" exists in the trie. We simply traverse the nodes of the tree for each character in "tree". The result is either we reach the end of a path and the word exists

For more information on tries, I'd recommend checking out:

> https://brilliant.org/wiki/tries/


# Installation

```
npm i @tkg808/trie-search
```

# Usage

Importing Trie-Search gives you a class implementation

> const Dictionary = require("@tkg808/trie-search");

# Methods
- getOptions: array -- get all keys stored in the trie
- hasWord: boolean -- check if a key exists in the trie
- hasPrefix: boolean -- check if a key that matches a prefix exists in the trie
- findMatches: array -- get all keys that match a given prefix

## Array of Strings

```
const Dictionary = require("../src/index");
const states = ["Colorado", "Texas", "California", "Florida"];

const statesDictionary = new Dictionary(states);

statesDictionary.hasWord("California"); // returns true
statesDictionary.hasWord("california"); // returns false
statesDictionary.hasPrefix("Cal"); // returns true
statesDictionary.findMatches(""); // returns ["California, "Colorado", "Florida", "Texas"]
statesDictionary.findMatches("", 3) // returns ["California, "Colorado", "Florida"]
statesDictionary.findMatches("C"); // returns ["California, "Colorado"]
statesDictionary.findMatches("Co"); // returns ["Colorado"]
statesDictionary.findMatches("Coa"); // returns []
```

## Array of Objects

For an array of objects, you can abstract an identifying key and store them in the trie
'''
const Dictionary = require("../src/index");
const states = [
  {name: "Colorado", capital: "Denver", ...},
  {name: "Texas", capital: "Austin", ...},
  {name: "California", capital: "Sacramento", ...},
  {name: "Florida", capital: "Tallahassee", ...},
];
const names = states.map(state => state.name);

const statesDictionary = new Dictionary(names);
'''

# Contribution Guidelines

## How to Contribute

Feel free to contribute to this package with code or suggestions. If you would like to contribute code - install the package, checkout to a new branch from dev, play with the code, then submit a pull request. Otherwise, you can submit an issue on the repo detailing your suggestion.

## How to Identify Bugs

You can submit an issue on the git repo. You can also checkout to a new branch from dev, implement a solution, and then submit a pull request. Please include detailed description of the bug and your proposed solution as best as possible.