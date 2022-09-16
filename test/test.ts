const Dictionary = require("../src/index");
const states = require("./data");

let statesDictionary: typeof Dictionary;

beforeEach(() =>
{
  statesDictionary = new Dictionary(states);
});

describe("Dictionary class", () =>
{
  it("root should be a private property", async () => 
  {
    const root = statesDictionary.root;

    expect(root).toBeUndefined();
  })

  it("options should be a private property", async () => 
  {
    const options = statesDictionary.options;

    expect(options).toBeUndefined();
  })

  it("getOptions should return the values stored in options", async () => 
  {
    const options = statesDictionary.getOptions();

    expect(options).toHaveLength(states.length);
  })

  it("options should store values in a sorted order", async () => 
  {
    const options: string[] = statesDictionary.getOptions();
    const ordered: string[] = [...states].sort();

    expect(options.toString()).toBe(ordered.toString());
  })

  it("insert should be a private method", async () => 
  {
    const result = statesDictionary.insert;
    expect(result).toBeUndefined();
  })

  it("hasWord should return true for a word that exists in Dictionary", async () => 
  {
    const result = statesDictionary.hasWord("Ohio");

    expect(result).toBe(true);
  })

  it("hasWord should return false for a word that doesn't exist in Dictionary", async () => 
  {
    const result = statesDictionary.hasWord("Ohi");

    expect(result).toBe(false);
  })

  it("hasWord should return false for an empty string/input", async () => 
  {
    const result = statesDictionary.hasWord("");

    expect(result).toBe(false);
  })

  it("hasPrefix should return true for a prefix to a word that exists in Dictionary", async () => 
  {
    const result = statesDictionary.hasPrefix("Ohi");

    expect(result).toBe(true);
  })

  it("hasPrefix should return false for a prefix to a word that doesn't exist in Dictionary", async () => 
  {
    const result = statesDictionary.hasPrefix("Ohis");

    expect(result).toBe(false);
  })

  it("hasPrefix should return true for an empty string/input", async () => 
  {
    const result = statesDictionary.hasPrefix("");

    expect(result).toBe(true);
  })

  it("findMatches should return all matches that start with the given input/prefix", async () => 
  {
    const result = statesDictionary.findMatches("A");

    expect(result.toString()).toBe(['Alabama', 'Alaska', 'Arizona', 'Arkansas'].toString());
  })

  it("findMatches should return the first X lexicographical words that start with the given input/prefix when a limit (X) is given", async () => 
  {
    const limitedMatches = statesDictionary.findMatches("A", 3);
    const allMatches = statesDictionary.findMatches("A").sort();

    expect(limitedMatches.toString()).toBe(allMatches.slice(0, 3).toString());
  })

  it("findMatches should return no matches when the given input/prefix doesn't exist in Dictionary", async () => 
  {
    const result = statesDictionary.findMatches("As");

    expect(result).toHaveLength(0);
  })

  it("findMatches should return no matches when the limit given is a negative integer", async () => 
  {
    const result = statesDictionary.findMatches("A", -1);

    expect(result).toHaveLength(0);
  })

  it("findMatches should return no matches when the limit given is 0", async () => 
  {
    const result = statesDictionary.findMatches("A", 0);

    expect(result).toHaveLength(0);
  })

  it("findMatches should return matches that includes the input/prefix when the input/prefix completely matches a word in Dictionary", async () => 
  {
    const result = statesDictionary.findMatches("Alabama");

    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result.indexOf("Alaabma")).toBeTruthy();
  })
});