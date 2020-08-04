import SimpleTextProducer from "../src/text/SimpleTextProducer";
import NeedlemanWunschSimilarity from "../src/algorithms/NeedlemanWunschSimilarity";

test("SimpleTextProducer returns three valid strings for each path", () => {
    const path1 = [ 'ATCCTC', '*|*|  ', 'AACG__' ];
    const path2 = [ 'ATCCTC', '*|* | ', 'AAC_G_' ];
    const path3 = [ 'ATCCTC', '*| *| ', 'AA_CG_' ];
    const path4 = [ 'ATCCTC', '* |*| ', 'A_ACG_' ];
    const path5 = [ 'ATCCTC', '*|*  |', 'AAC__G' ];
    const path6 = [ 'ATCCTC', '*| * |', 'AA_C_G' ];
    const path7 = [ 'ATCCTC', '* |* |', 'A_AC_G' ];
    const paths = [path1, path2, path3, path4, path5, path6, path7];

    const simpleTextProducer = new SimpleTextProducer(new NeedlemanWunschSimilarity("ATCCTC", "AACG", 1, -1, -2));

    const pathTexts = simpleTextProducer.produceText();
    for (let i = 0; i < pathTexts.length; i++){
        for (let j = 0; j < pathTexts[0].length; j++){
            expect(pathTexts[i][j]).toEqual(paths[i][j]);
        }
    }

})

