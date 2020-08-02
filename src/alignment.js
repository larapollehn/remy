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
        this.next = null;
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
        this.linkedFields = [];
        this.overall_score = null;
        this.initializeMatrix();
    }

    /**
     * fills matrix with cells, grouped in nested arrays to represent matrix
     * sets the value of first row/cells based on gap value
     * sets the x/y value
     */
    initializeMatrix() {
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
                this.matrix[0][i].final_score = this.gap * i;
            }
        }

        //fill each first Cell of the rows based on linear growing gap value
        for (let i = 0; i < this.matrix.length; i++) {
            if (i !== 0) {
                this.matrix[i][0].final_score = this.gap * i;
            }
        }
    }

    /**
     * assign each empty field a final value decided by the
     * value calculated by adding the match/mismatch/gap value
     * of top, top-left and left ascended
     * skip first row, because it is already fully filled with gap values
     * skip first field of each row as well
     */
    assignValue() {
        for (let i = 1; i < this.matrix.length; i++) {
            for (let j = 1; j < this.matrix[0].length; j++) {
                //get values of all three ascended, needed to compute the possible values for current field
                let topLeftValue = this.matrix[i - 1][j - 1].final_score;
                let topValue = this.matrix[i - 1][j].final_score;
                let leftValue = this.matrix[i][j - 1].final_score;

                //find out if current field is match or mismatch and assign value based on cost
                let matchMismatch = this.matrix[i][j].x_value === this.matrix[i][j].y_value ? this.match : this.mismatch;

                // get diagonal score, based on ascending finalValue and match/mismatch cost
                let topLeftScore = topLeftValue + matchMismatch;

                //get top score, based on ascending finalValue and gap cost
                let topScore = topValue + this.gap;

                //get left score, based on ascending finalValue and gap cost
                let leftScore = leftValue + this.gap;

                // set the finalValue of the current field as the best final Score
                this.matrix[i][j].final_score = this.findBestValue(topLeftScore, topScore, leftScore);

                // set the missing values of current field
                this.matrix[i][j].top_ascender = topValue;
                this.matrix[i][j].top_left_ascender = topLeftValue;
                this.matrix[i][j].left_ascender = leftValue;
                this.matrix[i][j].top_score = topScore;
                this.matrix[i][j].top_left_score = topLeftScore;
                this.matrix[i][j].left_score = leftScore;
            }
        }
        this.overall_score = this.matrix[this.matrix.length-1][this.matrix[0].length-1].final_score;
    }

    /**
     * find chain beginning with last field and set the field before as next value
     */
    linkChain() {
        // get last field of matrix, down right
        let start = this.matrix[this.sequence_a.length][this.sequence_b.length];

        let currentField = start;
        this.linkedFields.push({x: currentField.x_position, y: currentField.y_position});
        let links = this.sequence_a.length;
        while (links > 0) {
            let x_coord;
            let y_coord;
            if (currentField.x_value === currentField.y_value) {
                // in case of a match go up diagonal-left
                x_coord = currentField.x_position - 1;
                y_coord = currentField.y_position - 1;
            } else {
                // in case of a mismatch find biggest ascending value and go there
                if (currentField.top_ascender >= currentField.top_left_ascender && currentField.top_ascender >= currentField.left_ascender) {
                    x_coord = currentField.x_position;
                    y_coord = currentField.y_position - 1;
                } else if (currentField.top_left_ascender >= currentField.left_ascender && currentField.top_left_ascender >= currentField.top_ascender) {
                    x_coord = currentField.x_position - 1;
                    y_coord = currentField.y_position - 1;
                } else if (currentField.left_ascender >= currentField.top_ascender && currentField.left_ascender >= currentField.top_left_ascender) {
                    x_coord = currentField.x_position - 1;
                    y_coord = currentField.y_position;
                }
            }
            // set next of currentField and let it be the next currentField
            currentField.next = this.matrix[y_coord][x_coord];
            currentField = this.matrix[y_coord][x_coord];
            this.linkedFields.push({x: currentField.x_position, y: currentField.y_position});
            links--;
        }
    }

    /**
     * given the three possible scores, the finalValue of the current field is chosen
     */
    findBestValue(topLeft, top, left) {
        if (topLeft >= top && topLeft >= left) {
            return topLeft;
        } else if (top >= left && top >= topLeft) {
            return top;
        } else if (left >= topLeft && left >= top) {
            return left;
        }
    }

    /**
     * shows best alignment of the two sequences in text-form
     */
    matchResult() {
        const gap = '_';
        const match = '*';
        const mismatch = '|';
        const chain = this.linkedFields.reverse();

        // markers that repr. indices
        let a_marker = 0;
        let b_marker = 0;

        let result = ['', '', '']; // result shows both sequences and the visual rep of their match/mismatch/gap
        for (let i = 0; i < this.linkedFields.length - 1; i++) {
            if (chain[i].x + 1 === chain[i + 1].x && chain[i].y + 1 === chain[i + 1].y) {
                if (this.sequence_a[a_marker] === this.sequence_b[b_marker]) {
                    result[1] += match;
                } else {
                    result[1] += mismatch;
                }
                result[0] += this.sequence_a[a_marker];
                result[2] += this.sequence_b[b_marker];
            } else if (chain[i].x === chain[i + 1].x) {
                result[0] += this.sequence_a[a_marker];
                result[1] += ' ';
                result[2] += gap;
                b_marker--; //decrement index, because current seq value is skipped and marker is incremented after that
            } else if (chain[i].y === chain[i].y) {
                result[0] += gap;
                a_marker--; //decrement index, because current seq value is skipped and marker is incremented after that
                result[1] += ' ';
                result[2] += this.sequence_b[b_marker];
            }
            a_marker++;
            b_marker++;
        }
        return result;
    }
}

let test_matrix = new NeedlemanWunschSimilarity("ATCCTC", "AACG", 1, -1, -2);
test_matrix.assignValue();
test_matrix.linkChain();
console.log(test_matrix.linkedFields);
console.log(test_matrix.matchResult());
//console.log(test_matrix.matrix);
