class DictionaryNode
{
  nodes: { [key: string]: DictionaryNode };
  matches: string[];
  isEnd: boolean;

  constructor()
  {
    this.nodes = {};
    this.matches = [];
    this.isEnd = false;
  }
}

module.exports = class Dictionary
{
  // private
  #root: DictionaryNode;
  #options: string[];

  constructor(arr: string[])
  {
    this.#root = new DictionaryNode();
    this.#options = [];

    // Sort the given input so that matches are returned in sorted order
    // Time O(m*nlogn) => n is arr length, m is longest element's length
    for (let val of arr.sort())
    {
      this.#insert(val);
    }
  }

  // Time O(n) => n is the length of prefix
  #insert(word: string): void
  {
    if (word.length === 0) return;

    // Add to options
    this.#options.push(word);

    // Search dictionary
    let curr = this.#root;

    for (let char of word)
    {
      if (!curr.nodes[char])
      {
        // No existing path => Add new path
        curr.nodes[char] = new DictionaryNode();
      }

      // Add word to all sets of matches along the path
      curr.matches.push(word);
      curr = curr.nodes[char];
    }

    // Add word to the set of matches at the end of the path
    curr.matches.push(word);
    // Mark this node as the end of a word for searching purposes
    curr.isEnd = true;
  }

  // Time O(1)
  getOptions(): string[]
  {
    return [...this.#options];
  }

  // Time O(n) => n is the length of prefix
  hasWord(word: string): boolean
  {
    // Check input is valid
    if (word.length === 0) return false;

    // Search dictionary
    let curr = this.#root;

    for (let char of word)
    {
      // No paths for this char => No matches
      if (!curr.nodes[char]) return false;

      curr = curr.nodes[char];
    }

    // If this node marks the end of a word => Returns true
    return curr.isEnd;
  }

  // Time O(n) => n is the length of prefix
  hasPrefix(prefix: string): boolean
  {
    // Search dictionary
    let curr = this.#root;

    for (let char of prefix)
    {
      // No paths for this char => No matches
      if (!curr.nodes[char]) return false;

      curr = curr.nodes[char];
    }

    // If matches exist on this path => Returns true
    return curr.matches.length > 0;
  }

  // Time O(n + m) => n is the length of prefix, m is the limit
  findMatches(prefix: string, limit?: number): string[]
  {
    // Check limit is valid
    if (limit && limit <= 0) return [];

    // Search dictionary
    let curr = this.#root;

    for (let char of prefix)
    {
      // No paths for this char => No matches
      if (!curr.nodes[char]) return [];

      curr = curr.nodes[char];
    }

    // If prefix is empty => Finds all options
    // If no limit => Returns all matches found
    return curr.matches.slice(0, limit);
  }
}