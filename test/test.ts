const Trie = require("../src/index");
const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

let statesTrie: typeof Trie;

beforeEach(() =>
{
  statesTrie = new Trie(states);
});

describe("Trie class", () =>
{
  it("should not give direct access to root field", async () => 
  {
    const root = statesTrie.root;

    expect(root).toBeUndefined();
  })

  it("should not give direct access to keys field", async () => 
  {
    const keys = statesTrie.keys;

    expect(keys).toBeUndefined();
  })

  it("should give access to keys field via getter", async () => 
  {
    const keys = statesTrie.getAll();

    expect(keys).toHaveLength(states.length);
  })

  it("should store keys in a sorted order", async () => 
  {
    const keys: string[] = statesTrie.getAll();
    const ordered: string[] = [...states].sort();

    expect(keys.toString()).toBe(ordered.toString());
  })

  it("should return true for hasKey when the input is a key that exists in the Trie", async () => 
  {
    const result = statesTrie.hasKey("Ohio");

    expect(result).toBe(true);
  })

  it("should return false for hasKey when the input is a key that doesn't exist in the Trie", async () => 
  {
    const result = statesTrie.hasKey("Ohi");

    expect(result).toBe(false);
  })

  it("should return false for hasKey when the input is an empty string", async () => 
  {
    const result = statesTrie.hasKey("");

    expect(result).toBe(false);
  })

  it("should return true for hasPrefix when the input is a prefix to a key that exists in the Trie", async () => 
  {
    const result = statesTrie.hasPrefix("Ohi");

    expect(result).toBe(true);
  })

  it("should return false for hasPrefix when the input is a prefix to a key that doesn't exist in the Trie", async () => 
  {
    const result = statesTrie.hasPrefix("Ohis");

    expect(result).toBe(false);
  })

  it("should return true for hasPrefix when the input is an empty string", async () => 
  {
    const result = statesTrie.hasPrefix("");

    expect(result).toBe(true);
  })

  it("should return all matches that start with the given input when getMatches is called", async () => 
  {
    const result = statesTrie.getMatches("A");

    expect(result.toString()).toBe(['Alabama', 'Alaska', 'Arizona', 'Arkansas'].toString());
  })

  it("should return the first x lexicographical matches that start with the given input when getMatches is called with and a limit is provided", async () => 
  {
    const limitedMatches = statesTrie.getMatches("A", 3);
    const allMatches = statesTrie.getMatches("A").sort();

    expect(limitedMatches.toString()).toBe(allMatches.slice(0, 3).toString());
  })

  it("should return no matches when getMatches is given an input that doesn't exist in the Trie ", async () => 
  {
    const result = statesTrie.getMatches("As");

    expect(result).toHaveLength(0);
  })

  it("should return no matches when getMatches is given a negative integer limit", async () => 
  {
    const result = statesTrie.getMatches("A", -1);

    expect(result).toHaveLength(0);
  })

  it("should return no matches when getMatches is given a limit of 0", async () => 
  {
    const result = statesTrie.getMatches("A", 0);

    expect(result).toHaveLength(0);
  })

  it("should return matches that includes the input when getMatches is called", async () => 
  {
    const result = statesTrie.getMatches("Alabama");

    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result.indexOf("Alaabma")).toBeTruthy();
  })
});