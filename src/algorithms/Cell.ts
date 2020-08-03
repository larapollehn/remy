export default class Cell {
    x_position: number;
    y_position: number;
    x_value: string;
    y_value: string;
    top_score: number = null;
    top_left_score: number = null;
    left_score: number = null;
    top_ascender: Cell = null;
    left_ascender: Cell = null;
    top_left_ascender: Cell = null;
    final_score = null;

    /**
     * Constructor
     * @param x_position x position in the matrix
     * @param y_position y position in the matrix
     * @param x_value character of the sequence b
     * @param y_value character of the sequence a
     */
    constructor(x_position: number, y_position: number, x_value: string, y_value: string) {
        this.x_position = x_position;
        this.y_position = y_position;
        this.x_value = x_value;
        this.y_value = y_value;
    }

    getAllAscenders() : Cell[] {
        const ret = [];
        if(this.top_ascender){
            ret.push(this.top_ascender)
        }
        if(this.top_left_ascender){
            ret.push(this.top_left_ascender)
        }
        if(this.left_ascender){
            ret.push(this.left_ascender)
        }
        return ret;
    }
}

