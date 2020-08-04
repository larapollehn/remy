import NeedlemanWunschSimilarity from "../src/algorithms/NeedlemanWunschSimilarity";

test("filled Matrix is correct", () => {
    const needlemanWunsch = new NeedlemanWunschSimilarity("AATCG", "AACG", 1, -1, -2);

    expect(needlemanWunsch.matrix[0][0].final_score).toBe(0); // check start-node

    //check first row
    for (let i = 1; i < needlemanWunsch.sequence_b.length; i++){
        expect(needlemanWunsch.matrix[0][i].final_score).toBe(needlemanWunsch.gap * i);
    }

    //check first node of each row
    for (let i = 1; i < needlemanWunsch.sequence_a.length; i++){
        expect(needlemanWunsch.matrix[i][0].final_score).toBe(needlemanWunsch.gap * i);
    }

    // prior checked and confirmed matrix that should be the result of the constructed needelManWunsch matrix
    const row1 = [0, -2, -4, -6, -8];
    const row2 = [-2, 1, -1, -3, -5];
    const row3 = [-4, -1, 2, 0, -2];
    const row4 = [-6, -3, 0, 1, -1];
    const row5 = [-8,-5, -2, 1, 0];
    const row6 = [-10, -7, -4, -1, 2];
    const rows = [row1, row2, row3, row4, row5, row6];

    for (let i = 0; i < needlemanWunsch.sequence_a.length; i++){
        for (let j = 0; j < needlemanWunsch.sequence_b.length; j++){
            expect(needlemanWunsch.matrix[i][j].final_score).toBe(rows[i][j]);
        }
    }
})
