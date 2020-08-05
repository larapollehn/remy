import AligningAlgorithm from "./AligningAlgorithm";
import Cell from "./Cell";
import {copyArray, findBestOverZero, findHighestValue} from "../Utils";

export default class SmithWaterman extends AligningAlgorithm {
    sequence_a: string;
    sequence_b: string;
    match: number;
    mismatch: number;
    gap: number;
    topScore: number = 0;
    matrix: Cell[][]

    /**
     * Constructor
     * @param sequence_a axis y
     * @param sequence_b axis x
     * @param match match score
     * @param mismatch mismatch score
     * @param gap gap score
     */
    constructor(sequence_a: string, sequence_b: string, match: number, mismatch: number, gap: number) {
        super(sequence_a, sequence_b, match, mismatch, gap);
        this.sequence_a = sequence_a;
        this.sequence_b = sequence_b;
        this.match = match;
        this.mismatch = mismatch;
        this.gap = gap;
        this.matrix = [];

        // initialize the value-empty matrix with cells
        // this.sequence[...-1] because at 0/0 the matrix has null as x/y-values
        for (let y = 0; y <= this.sequence_a.length; y++) {
            let row = [];
            for (let x = 0; x <= this.sequence_b.length; x++) {
                if (y === 0 && x === 0) {
                    row.push(new Cell(x, y, null, null));
                } else if (x === 0) {
                    row.push(new Cell(x, y, null, this.sequence_a[y - 1]));
                } else if (y === 0) {
                    row.push(new Cell(x, y, this.sequence_b[x - 1], null));
                } else {
                    row.push(new Cell(x, y, this.sequence_b[x - 1], this.sequence_a[y - 1]));
                }
            }
            this.matrix.push(row);
        }

        //fill the first row based on linear growing gap value
        for (let i = 0; i < this.matrix[0].length; i++) {
            if (i === 0) {
                this.matrix[0][i].final_score = 0;
            } else {
                this.matrix[0][i].final_score = (this.gap * i) < 0 ? 0 : (this.gap * i);
            }
        }

        //fill each first Cell of the rows based on linear growing gap value
        for (let i = 0; i < this.matrix.length; i++) {
            if (i !== 0) {
                this.matrix[i][0].final_score = (this.gap * i) < 0 ? 0 : (this.gap * i);
            }
        }

        /*
         * assign each empty field a final value decided by the value calculated by adding the match/mismatch/gap value
         * of top, top-left and left ascended
         *
         * Skip first row, because it is already fully filled with gap values
         * skip first field of each row as well
         */
        for (let y = 1; y < this.matrix.length; y++) {
            for (let x = 1; x < this.matrix[0].length; x++) {
                //get values of all three ascended, needed to compute the possible values for current field
                let topLeftValue = this.matrix[y - 1][x - 1].final_score;
                let topValue = this.matrix[y - 1][x].final_score;
                let leftValue = this.matrix[y][x - 1].final_score;

                //find out if current field is match or mismatch and assign value based on cost
                let matchMismatchScore = this.matrix[y][x].x_value === this.matrix[y][x].y_value ? this.match : this.mismatch;

                // get diagonal score, based on ascending finalValue and match/mismatch cost
                let topLeftScore = topLeftValue + matchMismatchScore;

                //get top score, based on ascending finalValue and gap cost
                let topScore = topValue + this.gap;

                //get left score, based on ascending finalValue and gap cost
                let leftScore = leftValue + this.gap;

                // set the finalValue of the current field as the best final Score
                const bestValue = findBestOverZero(topLeftScore, topScore, leftScore);
                this.matrix[y][x].final_score = bestValue;

                // set the global topScore value
                if (bestValue > this.topScore) {
                    this.topScore = bestValue;
                }

                // set the missing values of current field
                if (bestValue > 0){
                    if (topScore === bestValue) {
                        this.matrix[y][x].top_ascender = this.matrix[y - 1][x];
                    }
                    if (topLeftScore === bestValue) {
                        this.matrix[y][x].top_left_ascender = this.matrix[y - 1][x - 1];
                    }
                    if (leftScore === bestValue) {
                        this.matrix[y][x].left_ascender = this.matrix[y][x - 1];
                    }
                } else if (bestValue <= 0){
                    this.matrix[y][x].top_ascender = this.matrix[y - 1][x];
                    this.matrix[y][x].top_left_ascender = this.matrix[y - 1][x - 1];
                    this.matrix[y][x].left_ascender = this.matrix[y][x - 1];
                }

                this.matrix[y][x].top_score = topScore;
                this.matrix[y][x].top_left_score = topLeftScore;
                this.matrix[y][x].left_score = leftScore;
            }
        }
    }


    align(): Cell[][] {

        //find all the start nodes, which have the topScore as a finalValue
        const aligningQueue: Cell[][] = [];
        for (let i = 0; i <= this.sequence_a.length; i++) {
            for (let j = 0; j <= this.sequence_b.length; j++) {
                if (this.matrix[i][j].final_score === this.topScore) {
                    aligningQueue.push([this.matrix[i][j]]);
                }
            }
        }

        const result = [];
        while (aligningQueue.length !== 0) {
            const currentChain = aligningQueue[0];

            const lastCellOfChain = currentChain[currentChain.length - 1];
            const lastElementAscenders = lastCellOfChain.getAllAscenders();

            if (lastElementAscenders.length > 0) {
                for (let i = 0; i < lastElementAscenders.length; i++) {
                    if (lastElementAscenders[i].final_score !== 0) {
                        const newUnfinishedChain = copyArray<Cell>(currentChain);
                        newUnfinishedChain.push(lastElementAscenders[i]);
                        aligningQueue.push(newUnfinishedChain);
                    } else {
                        currentChain.push(lastElementAscenders[i]);
                        result.push(currentChain);
                    }
                }
            }
            aligningQueue.shift();
        }
        return result;
    }
}
