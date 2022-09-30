const Dictionary = require("../src/index");
const states = require("./data");

let statesDictionary: typeof Dictionary;

beforeEach(() =>
{
  statesDictionary = new Dictionary(states);
});

describe("Dictionary class", () =>
{
  it("should not give direct access to root field", async () => 
  {
    const root = statesDictionary.root;

    expect(root).toBeUndefined();
  })

  it("should not give direct access to options field", async () => 
  {
    const options = statesDictionary.options;

    expect(options).toBeUndefined();
  })

  it("should give access to options field via getter", async () => 
  {
    const options = statesDictionary.getOptions();

    expect(options).toHaveLength(states.length);
  })

  it("should store options in a sorted order", async () => 
  {
    const options: string[] = statesDictionary.getOptions();
    const ordered: string[] = [...states].sort();

    expect(options.toString()).toBe(ordered.toString());
  })

  it("should not give access to insert method", async () => 
  {
    const result = statesDictionary.insert;
    expect(result).toBeUndefined();
  })

  it("should return true for hasWord when the input is a word that exists in Dictionary", async () => 
  {
    const result = statesDictionary.hasWord("Ohio");

    expect(result).toBe(true);
  })

  it("should return false for hasWord when the input is a word doesn't exist in Dictionary", async () => 
  {
    const result = statesDictionary.hasWord("Ohi");

    expect(result).toBe(false);
  })

  it("should return false for hasWord when the input is an empty string", async () => 
  {
    const result = statesDictionary.hasWord("");

    expect(result).toBe(false);
  })

  it("should return true for hasPrefix when the input is a prefix to a word that exists in Dictionary", async () => 
  {
    const result = statesDictionary.hasPrefix("Ohi");

    expect(result).toBe(true);
  })

  it("should return false for hasPrefix when the input is a prefix to a word that doesn't exist in Dictionary", async () => 
  {
    const result = statesDictionary.hasPrefix("Ohis");

    expect(result).toBe(false);
  })

  it("should return true for hasPrefix when the input is an empty string/input", async () => 
  {
    const result = statesDictionary.hasPrefix("");

    expect(result).toBe(true);
  })

  it("should return all matches that start with the given input/prefix when findMatches is called", async () => 
  {
    const result = statesDictionary.findMatches("A");

    expect(result.toString()).toBe(['Alabama', 'Alaska', 'Arizona', 'Arkansas'].toString());
  })

  it("should return the first x lexicographical matches that start with the given input/prefix when a limit (x) is provided to a findMatches call", async () => 
  {
    const limitedMatches = statesDictionary.findMatches("A", 3);
    const allMatches = statesDictionary.findMatches("A").sort();

    expect(limitedMatches.toString()).toBe(allMatches.slice(0, 3).toString());
  })

  it("should return no matches when findMatches is given an input that doesn't exist in Dictionary ", async () => 
  {
    const result = statesDictionary.findMatches("As");

    expect(result).toHaveLength(0);
  })

  it("should return no matches when findMatches is given a negative integer limit", async () => 
  {
    const result = statesDictionary.findMatches("A", -1);

    expect(result).toHaveLength(0);
  })

  it("should return no matches when findMatches given is given a limit of 0", async () => 
  {
    const result = statesDictionary.findMatches("A", 0);

    expect(result).toHaveLength(0);
  })

  it("should return matches that includes the input if it exists in the dictionary when findMatches is called", async () => 
  {
    const result = statesDictionary.findMatches("Alabama");

    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result.indexOf("Alaabma")).toBeTruthy();
  })
});