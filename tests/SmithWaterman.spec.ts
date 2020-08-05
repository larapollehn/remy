import SmithWaterman from "../src/algorithms/SmithWaterman";

test("filled Matrix is correct for NeedelmanWunschSimilarity", () => {
    const smithWaterman = new SmithWaterman("AATCG", "AACG", 1, -1, -2);
    expect(smithWaterman.topScore).toEqual(2);
})
