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

        // markers that repr. indices
        let a_marker = 0;
        let b_marker = 0;

        let result = ['', '', '']; // result shows both sequences and the visual rep of their match/mismatch/gap
        for (let i = 0; i < chain.length - 1; i++) {
            if (chain[i].x_position + 1 === chain[i + 1].x_position && chain[i].y_position + 1 === chain[i + 1].y_position) {
                if (this.aligningAlgorithm.sequence_a[a_marker] === this.aligningAlgorithm.sequence_b[b_marker]) {
                    result[1] += match;
                } else {
                    result[1] += mismatch;
                }
                result[0] += this.aligningAlgorithm.sequence_a[a_marker];
                result[2] += this.aligningAlgorithm.sequence_b[b_marker];
            } else if (chain[i].x_position === chain[i + 1].x_position) {
                result[0] += this.aligningAlgorithm.sequence_a[a_marker];
                result[1] += ' ';
                result[2] += gap;
                b_marker--; //decrement index, because current seq value is skipped and marker is incremented after that
            } else if (chain[i].y_position === chain[i].y_position) {
                result[0] += gap;
                a_marker--; //decrement index, because current seq value is skipped and marker is incremented after that
                result[1] += ' ';
                result[2] += this.aligningAlgorithm.sequence_b[b_marker];
            }
            a_marker++;
            b_marker++;
        }
        return result;
    }
}
