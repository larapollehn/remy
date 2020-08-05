import NeedlemanWunschSimilarity from "./src/algorithms/NeedlemanWunschSimilarity";
import AligningAlgorithm from "./src/algorithms/AligningAlgorithm";
import TextProducer from "./src/text/TextProducer";
import SimpleTextProducer from "./src/text/SimpleTextProducer";
import NeedlemanWunschDistance from "./src/algorithms/NeedlemanWunschDistance";
import SmithWaterman from "./src/algorithms/SmithWaterman";


const similarity : AligningAlgorithm = new NeedlemanWunschSimilarity("ATCCTC", "AACG", 1, -1, -2);
const distance: AligningAlgorithm = new NeedlemanWunschDistance("ATCCTC", "AACG", -1, 1, 2)

const similarityTextProducer: TextProducer = new SimpleTextProducer(similarity);
const similarityTexts = similarityTextProducer.produceText();
const distanceTextProducer: TextProducer = new SimpleTextProducer(distance);
const distanceTexts = distanceTextProducer.produceText();

/**
for(let i = 0; i < similarityTexts.length; i++){
    console.log(similarityTexts[i]);
}

console.log("###########################");

for(let i = 0; i < distanceTexts.length; i++){
    console.log(distanceTexts[i]);
}
 **/

const smithWaterman: AligningAlgorithm = new SmithWaterman("AATAC", "AACG",1, -1, -2)
smithWaterman.print();
