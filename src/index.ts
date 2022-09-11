class DictionaryNode
{
  public nodes: { [key: string]: DictionaryNode };
  public matches: string[];
  public isEnd: boolean;

  constructor()
  {
    this.nodes = {};
    this.matches = [];
    this.isEnd = false;
  }
}

export class Dictionary
{
  private root: DictionaryNode;
  public options: string[];

  constructor(arr: string[])
  {
    this.root = new DictionaryNode();
    this.options = [];

    // Sort the given input so that matches are returned in sorted order
    for (let val of arr.sort())
    {
      this.insert(val);
    }
  }

  insert(word: string): void
  {
    if (word.length === 0) return;
    this.options.push(word);

    // Search dictionary
    let curr = this.root;

    for (let char of word)
    {
      if (!curr.nodes[char])
      {
        // No existing path => Add new path
        curr.nodes[char] = new DictionaryNode();
      }

      curr.matches.push(word);
      curr = curr.nodes[char];
    }

    curr.matches.push(word);
    // Mark this node as the end of a word for searching purposes
    curr.isEnd = true;
  }

  hasWord(word: string): boolean
  {
    // Check input is valid
    if (word.length === 0) return false;

    // Search dictionary
    let curr = this.root;

    for (let char of word)
    {
      // No paths for this char => No matches
      if (!curr.nodes[char]) return false;

      curr = curr.nodes[char];
    }

    // If this node marks the end of a word => Returns true
    return curr.isEnd;
  }

  hasPrefix(prefix: string): boolean
  {
    // Search dictionary
    let curr = this.root;

    for (let char of prefix)
    {
      // No paths for this char => No matches
      if (!curr.nodes[char]) return false;

      curr = curr.nodes[char];
    }

    // If matches exist on this path => Returns true
    return curr.matches.length > 0;
  }

  findMatches(prefix: string, limit?: number): string[]
  {
    // Check limit is valid
    if (limit && limit <= 0) return [];

    // Search dictionary
    let curr = this.root;

    for (let char of prefix)
    {
      // No paths for this char => No matches
      if (!curr.nodes[char]) return []

      curr = curr.nodes[char];
    }

    // If prefix is empty => Finds all options
    // If no limit => Returns all matches found
    return curr.matches.slice(0, limit);
  }
}

