class TrieNode
{
  nodes: { [key: string]: TrieNode };
  matches: string[];
  isEnd: boolean;

  constructor()
  {
    this.nodes = {};
    this.matches = [];
    this.isEnd = false;
  }
}

module.exports = class Trie
{
  // private
  #root: TrieNode;
  #options: string[];

  constructor(arr: string[])
  {
    this.#root = new TrieNode();
    this.#options = [];

    // Sort the given input so that matches are returned in sorted order
    // Time O(m*nlogn) => n is arr length, m is longest element's length
    for (let val of arr.sort())
    {
      this.#insert(val);
    }
  }

  // Time O(n) => n is the length of key
  #insert(key: string): void
  {
    if (key.length === 0) return;

    // Add to options
    this.#options.push(key);

    // Search Trie
    let curr = this.#root;

    for (let char of key)
    {
      if (!curr.nodes[char])
      {
        // No existing path => Add new node to path
        curr.nodes[char] = new TrieNode();
      }

      // Add key to all sets of matches along the path
      curr.matches.push(key);
      curr = curr.nodes[char];
    }

    // Add key to the set of matches at the end of the path
    curr.matches.push(key);
    // Mark this node as the end of a key for searching purposes
    curr.isEnd = true;
  }

  // Time O(n) => n is the number keys in the trie
  getAll(): string[]
  {
    return [...this.#options];
  }

  // Time O(n) => n is the length of key
  hasKey(key: string): boolean
  {
    // Check input is valid
    if (key.length === 0) return false;

    // Search Trie
    let curr = this.#root;

    for (let char of key)
    {
      // No paths for this char => key does not exist
      if (!curr.nodes[char]) return false;

      curr = curr.nodes[char];
    }

    // If this node marks the end of a key => Returns true
    return curr.isEnd;
  }

  // Time O(n) => n is the length of prefix
  hasPrefix(prefix: string): boolean
  {
    // Search Trie
    let curr = this.#root;

    for (let char of prefix)
    {
      // No paths for this char => No matches for the given prefix
      if (!curr.nodes[char]) return false;

      curr = curr.nodes[char];
    }

    // If matches exist on this path => Returns true
    return curr.matches.length > 0;
  }

  // Time O(n + m) => n is the length of prefix, m is the limit
  getMatches(prefix: string, limit?: number): string[]
  {
    // Check limit is valid
    if (limit && limit <= 0) return [];

    // Search Trie
    let curr = this.#root;

    for (let char of prefix)
    {
      // No paths for this char => No matches for the given prefix
      if (!curr.nodes[char]) return [];

      curr = curr.nodes[char];
    }

    // If prefix is empty => Finds all options
    // If no limit => Returns all matches found
    return curr.matches.slice(0, limit);
  }
}