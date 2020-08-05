import {findHighestValue, copyArray, findLowestValue, findBestOverZero} from "../src/Utils";

test("The Function findHighestValue returns best/max value", () => {
    expect(findHighestValue(1, 2, 3)).toBe(3);
    expect(findHighestValue(1, 1, 1)).toBe(1);
    expect(findHighestValue(12, 384, 2929)).toBe(2929);
    expect(findHighestValue(0.3, 0.2, 0.25)).toBe(0.3);
})

test("The Function findLowestValue returns best/min value", () => {
    expect(findLowestValue(1, 2, 3)).toBe(1);
    expect(findLowestValue(1, 1, 1)).toBe(1);
    expect(findLowestValue(12, 384, 2929)).toBe(12);
    expect(findLowestValue(0.3, 0.2, 0.25)).toBe(0.2);
})

test("The Function findBestOverZero returns best/min value", () => {
    expect(findBestOverZero(1, 2, 3)).toBe(3);
    expect(findBestOverZero(1, 1, 1)).toBe(1);
    expect(findBestOverZero(-9, -2, -12)).toBe(0);
    expect(findBestOverZero(0.3, -5, -10)).toBe(0.3);
})

test("Copying an array with own function works", () => {
    const original = [1, 2, 3, 4];
    const copy = copyArray(original);
    original[0] = 8;
    expect(original[0]).toBe(8);
    expect(copy[0]).toBe(1);
})
