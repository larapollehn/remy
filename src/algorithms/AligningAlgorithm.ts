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

    print(): void{
        let result = '';
        for(let i = 0; i <= this.sequence_b.length +1; i++){
            if(i === 0 || i === 1){
                result += "  ";
            } else {
                result += ` ${this.sequence_b[i-2]} `
            }
        }
        result += "\n";
        for (let i = 0; i <= this.sequence_a.length; i++){
            if(i === 0){
                result += " ";
            } else {
                result += `${this.sequence_a[i-1]}`
            }
            for(let j = 0; j <= this.sequence_b.length; j++){
                result += ` ${this.matrix[i][j].final_score} `;
            }
            result += '\n';
        }
        console.log(result);
    }
}
