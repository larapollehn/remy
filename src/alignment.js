class Cell {
    constructor(x_position, y_position, x_value, y_value) {
        this.x_position = x_position;
        this.y_position = y_position;
        this.x_value = x_value;
        this.y_value = y_value;
        this.top_score = null;
        this.top_left_score = null;
        this.left_score = null;
        this.top_ascender = null;
        this.top_left_ascender = null;
        this.left_ascender = null;
        this.final_score = null;
    }
}

class NeedlemanWunschSimilarity {
    constructor(sequence_a, sequence_b, match, mismatch, gap) {
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
                if (y === 0 && x === 0){
                    row.push(new Cell(x, y, null ,null));
                }else if (x === 0){
                    row.push(new Cell(x, y, null, this.sequence_a[y-1]));
                } else if (y === 0){
                    row.push(new Cell(x, y, this.sequence_b[x-1], null));
                } else {
                    row.push(new Cell(x, y, this.sequence_b[x-1], this.sequence_a[y-1]));
                }
            }
            this.matrix.push(row);
        }

        //fill the first row based on linear growing gap value
        for (let i = 0; i < this.matrix[0].length; i++){
            if (i === 0){
                this.matrix[0][i].final_score = 0;
            } else {
                this.matrix[0][i].final_score = this.gap * i;
            }
        }

        //fill each first Cell of the rows based on linear growing gap value
        for (let i = 0; i < this.matrix.length; i++){
            if (i !== 0){
                this.matrix[i][0].final_score = this.gap * i;
            }
        }
    }
}

let test_matrix = new NeedlemanWunschSimilarity("AATCG", "AACG", 1, -1, -2);
console.log(test_matrix.matrix);
