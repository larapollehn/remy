import Cell from "./Cell";
import {findLowestValue} from "../Utils";
import NeedlemanWunschSimilarity from "./NeedlemanWunschSimilarity";


/**
 * Needleman-Wunsch similarity algorithm. Looking for maximal score of top, left or top left previous nodes.
 */
export default class NeedlemanWunschDistance extends NeedlemanWunschSimilarity {
    sequence_a: string;
    sequence_b: string;
    match: number;
    mismatch: number;
    gap: number;
    matrix: Cell[][];
    minmax: string

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
        this.minmax = "min";

        // initialize the value-empty matrix with cells
        // this.sequence[...-1] because at 0/0 the matrix has null as x/y-values
        for (let y = 0; y <= this.sequence_a.length; y++) {
            const row = [];
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
                this.matrix[0][i].final_score = this.gap * i;
                this.matrix[0][i].left_ascender = this.matrix[0][i-1];
            }
        }

        //fill each first Cell of the rows based on linear growing gap value
        for (let i = 0; i < this.matrix.length; i++) {
            if (i !== 0) {
                this.matrix[i][0].final_score = this.gap * i;
                this.matrix[i][0].top_ascender = this.matrix[i-1][0];
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
                const topLeftValue = this.matrix[y - 1][x - 1].final_score;
                const topValue = this.matrix[y - 1][x].final_score;
                const leftValue = this.matrix[y][x - 1].final_score;

                //find out if current field is match or mismatch and assign value based on cost
                const matchMismatchScore = this.matrix[y][x].x_value === this.matrix[y][x].y_value ? this.match : this.mismatch;

                // get diagonal score, based on ascending finalValue and match/mismatch cost
                const topLeftScore = topLeftValue + matchMismatchScore;

                //get top score, based on ascending finalValue and gap cost
                const topScore = topValue + this.gap;

                //get left score, based on ascending finalValue and gap cost
                const leftScore = leftValue + this.gap;

                // set the finalValue of the current field as the best final Score
                const bestValue = findLowestValue(topLeftScore, topScore, leftScore);
                this.matrix[y][x].final_score = bestValue;

                // set the missing values of current field
                if (topScore === bestValue) {
                    this.matrix[y][x].top_ascender = this.matrix[y - 1][x];
                }
                if (topLeftScore === bestValue) {
                    this.matrix[y][x].top_left_ascender = this.matrix[y - 1][x - 1];
                }
                if (leftScore === bestValue) {
                    this.matrix[y][x].left_ascender = this.matrix[y][x - 1];
                }

                this.matrix[y][x].top_score = topScore;
                this.matrix[y][x].top_left_score = topLeftScore;
                this.matrix[y][x].left_score = leftScore;
            }
        }
    }

    tex(): string {
        return `D_{i,j}=\\${this.minmax}\\begin{cases}D_{i-1,j-1}& + &\\phantom{-}${this.match}&a_i = b_j\\\\D_{i-1,j-1}& + &${this.mismatch}&a_i \\neq b_j\\\\
D_{i-1,j}& + &${this.gap}&b_j = -\\\\D_{i,j-1}& + &${this.gap}&a_i = -\\end{cases}`;
    }
}
