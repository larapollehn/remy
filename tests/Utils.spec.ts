import {findHighestValue, copyArray} from "../src/Utils";

test("The Function findBestValue returns best/max value", () => {
    expect(findHighestValue(1, 2, 3)).toBe(3);
    expect(findHighestValue(1, 1, 1)).toBe(1);
    expect(findHighestValue(12, 384, 2929)).toBe(2929);
    expect(findHighestValue(0.3, 0.2, 0.25)).toBe(0.3);
})

test("Copying an array with own function works", () => {
    const original = [1, 2, 3, 4];
    const copy = copyArray(original);
    original[0] = 8;
    expect(original[0]).toBe(8);
    expect(copy[0]).toBe(1);
})
