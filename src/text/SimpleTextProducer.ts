import TextProducer from "./TextProducer";
import Cell from "../algorithms/Cell";

export default class SimpleTextProducer extends TextProducer {
    produceText(): string[][] {
        const alignments: Cell[][] = this.aligningAlgorithm.align();
        const ret = [];
        for (let i = 0; i < alignments.length; i++) {
            ret.push(this.matchSequences(alignments[i]));
        }
        return ret;
    }

    private matchSequences(path: Cell[]): string[] {
        const gap = '_';
        const match = '*';
        const mismatch = '|';
        const chain = path.reverse();

        const result = ['', '', '']; // result shows both sequences and the visual rep of their match/mismatch/gap
        for (let i = 0; i < chain.length - 1; i++) {
            if (chain[i].x_position + 1 === chain[i + 1].x_position && chain[i].y_position + 1 === chain[i + 1].y_position) {
                if (chain[i+1].y_value === chain[i+1].x_value) {
                    result[1] += match;
                } else {
                    result[1] += mismatch;
                }
                result[0] += chain[i+1].y_value;
                result[2] += chain[i+1].x_value;
            } else if (chain[i].x_position === chain[i + 1].x_position) {
                result[0] += chain[i+1].y_value;
                result[1] += ' ';
                result[2] += gap;
            } else if (chain[i].y_position === chain[i].y_position) {
                result[0] += gap;
                result[1] += ' ';
                result[2] += chain[i+1].x_value;
            }
        }
        return result;
    }
}
