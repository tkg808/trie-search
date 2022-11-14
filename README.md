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

So let's say we have the following array:

> let arr = ["team", "tree", "trie"];

The trie for arr would look something like the following tree:

&emsp;![trie-example](https://i.imgur.com/nNFJNdZ.png)

Now we can perform a search for a key by traversing the nodes of the tree for each character of the key. The result is either we are able to find a path that contains all characters in the key, or the key does not exist in the trie. Therefore, we have a search with a linear time complexity O(n).

# Installation

```
npm i @tkg808/trie-search
```

# Usage

Importing Trie-Search gives you the Trie class:

> const Trie = require("@tkg808/trie-search");

## Methods
  
### *getAll()*
- Get all keys stored in the trie
- No parameters
- Returns an array of strings

### *hasKey(key)*
- Check if a given string completely matches any keys in the trie
- *key* -- required string parameter
- Returns a boolean
  
### *hasPrefix(prefix)*
- Check if a given string partially matches any keys in the trie
- *prefix* -- required string parameter
- Returns a boolean

### *getMatches(prefix, limit)*
- Get all keys that partially match a given string with ability to limit the number of matches returned
- *prefix* -- required string parameter
- *limit* -- optional integer parameter
- Returns an array of strings

## Example

```
const Trie = require("@tkg808/trie-search");
const states = ["Colorado", "Texas", "California", "Florida"];
const statesTrie = new Trie(states);

statesTrie.getAll(); // returns ["Colorado", "Texas", "California", "Florida"]

statesTrie.hasKey("California"); // complete match -> returns true
statesTrie.hasKey("Cal"); // only a partial match -> returns false
statesTrie.hasKey("california"); // case-sensitive -> returns false
statesTrie.hasKey(""); // empty string -> returns false

statesTrie.hasPrefix("California"); // partial and complete match -> returns true
statesTrie.hasPrefix("Cal"); // partial match -> returns true
statesTrie.hasPrefix("cal"); // case-sensitive -> returns false
statesTrie.hasPrefix(""); // empty string -> returns true

statesTrie.getMatches(""); // no limit -> returns ["California, "Colorado", "Florida", "Texas"]
statesTrie.getMatches("", 3) // limit included -> returns ["California, "Colorado", "Florida"]
statesTrie.getMatches("C"); // returns ["California, "Colorado"]
statesTrie.getMatches("Co"); // returns ["Colorado"]
statesTrie.getMatches("Coa"); // returns []
```

# Contribution Guidelines

## How to Contribute

Feel free to contribute to this package with code or suggestions. If you would like to contribute code - install the package, checkout to a new branch from dev, play with the code, then submit a pull request. Otherwise, you can submit an issue on the repo detailing your suggestion.

## How to Submit Bugs

You can submit an issue on the git repo. You can also checkout to a new branch from dev, implement a solution, and then submit a pull request. Please include detailed description of the bug and your proposed solution as best as possible.

# Future Features

- Support for optional case-sensitivity
- Update parameter structure to allow multiple options