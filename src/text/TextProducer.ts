import AligningAlgorithm from "../algorithms/AligningAlgorithm";

export default abstract class TextProducer {
    aligningAlgorithm: AligningAlgorithm

    constructor(aligningAlgorithm: AligningAlgorithm) {
        this.aligningAlgorithm = aligningAlgorithm;
    }

    abstract produceText() : string[][];
}
