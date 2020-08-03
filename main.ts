import NeedlemanWunschSimilarity from "./src/algorithms/NeedlemanWunschSimilarity";
import AligningAlgorithm from "./src/algorithms/AligningAlgorithm";
import TextProducer from "./src/text/TextProducer";
import SimpleTextProducer from "./src/text/SimpleTextProducer";


let needleManWunsch : AligningAlgorithm = new NeedlemanWunschSimilarity("ATCCTC", "AACG", 1, -1, -2);
let textProducer: TextProducer = new SimpleTextProducer(needleManWunsch);
const texts = textProducer.produceText();

for(let i = 0; i < texts.length; i++){
    console.log(texts[i]);
}
