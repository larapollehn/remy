import {findBestValue} from "../src/Utils";

test("The Function findBestValue returns best/max value", () => {
    expect(findBestValue(1,2,3)).toBe(3);
    expect(findBestValue(1,1,1)).toBe(1);
    expect(findBestValue(12,384,2929)).toBe(2929);
    expect(findBestValue(0.3,0.2,0.25)).toBe(0.3);
})

