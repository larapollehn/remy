import Cell from "./Cell";

/**
 * Abstract base class for any algning algorithm
 */
export default abstract class AligningAlgorithm {
    sequence_a: string;
    sequence_b: string;
    match: number;
    mismatch: number;
    gap: number;
    matrix: Cell[][]

    /**
     * Minimal constructor for an aligning algorithm
     *
     * @param sequence_a axis y
     * @param sequence_b axis x
     * @param match match score
     * @param mismatch mismatch score
     * @param gap gap score
     */
    constructor(sequence_a: string, sequence_b: string, match: number, mismatch: number, gap: number){
        this.sequence_a = sequence_a;
        this.sequence_b = sequence_b;
        this.match = match;
        this.mismatch = mismatch;
        this.gap = gap;
    }

    /**
     * Result of the aligning algorithm.
     * A 2D list, in which each list is a best result.
     */
    abstract align() : Cell[][];
}
