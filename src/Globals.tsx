// The Names of the algorithms
import NeedlemanWunschSimilarity from "./algorithms/NeedlemanWunschSimilarity";
import SimpleTextProducer from "./text/SimpleTextProducer";
import NeedlemanWunschDistance from "./algorithms/NeedlemanWunschDistance";
import SmithWaterman from "./algorithms/SmithWaterman";

const needlemanWunschDistance = "Needleman-Wunsch Distance";
const needlemanWunschSimilarity = "Needleman-Wunsch Similarity";
const smithWaterman = "Smith-Waterman";
export const algorithmNames = [needlemanWunschSimilarity, needlemanWunschDistance, smithWaterman];

const setupNeedleManWunschDistance = (seqA: string, seqB: string, matchScore: number, mismatchScore: number, gapScore: number) => {
    const needlemanWunschDistance = new NeedlemanWunschDistance(seqA, seqB, matchScore, mismatchScore, gapScore);
    const distanceTextProducer = new SimpleTextProducer(needlemanWunschDistance);
    return {algorithmMatrix: needlemanWunschDistance, textProducer: distanceTextProducer};
}
const setupNeedleManWunschSimilarity = (seqA: string, seqB: string, matchScore: number, mismatchScore: number, gapScore: number) => {
    const needlemanWunschSimilarity = new NeedlemanWunschSimilarity(seqA, seqB, matchScore, mismatchScore, gapScore);
    const similarityTextProducer = new SimpleTextProducer(needlemanWunschSimilarity);
    return {algorithmMatrix: needlemanWunschSimilarity, textProducer: similarityTextProducer};
}
const setupSmithWaterman = (seqA: string, seqB: string, matchScore: number, mismatchScore: number, gapScore: number) => {
    const smithWaterman = new SmithWaterman(seqA, seqB, matchScore, mismatchScore, gapScore);
    const smithWatermanTextProducer = new SimpleTextProducer(smithWaterman);
    return {algorithmMatrix: smithWaterman, textProducer: smithWatermanTextProducer};
}
const algorithmFunctions = [setupNeedleManWunschSimilarity, setupNeedleManWunschDistance, setupSmithWaterman];

export const setupFunction = new Map();
for(let i = 0; i < algorithmNames.length; i++){
    setupFunction.set(algorithmNames[i], algorithmFunctions[i]);
}

const needlemanWunschSimilarityScores = {match: 1, mismatch: -1, gap: -2};
const needlemanWunschDistanceScores = {match: -1, mismatch: 1, gap: 2};
const smithWatermanScores = {match: 1, mismatch: -1, gap: -2};

const scores = [needlemanWunschSimilarityScores, needlemanWunschDistanceScores, smithWatermanScores];
export const defaultScores = new Map();
for(let i = 0; i < algorithmNames.length; i++){
    defaultScores.set(algorithmNames[i], scores[i]);
}
