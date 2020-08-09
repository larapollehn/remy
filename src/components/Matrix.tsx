import React, {useEffect, useState} from "react";
import Cell from "../algorithms/Cell";
import {decolorCells, sequenceColor} from "../Utils";
import Paths from "./Paths";
import {setupFunction} from "../Globals";

interface Props {
    algorithm: string,
    seqA: string,
    seqB: string,
    matchScore: number,
    mismatchScore: number,
    gapScore: number,
    speed: number
}

const Matrix = (props: Props) => {
    const {algorithm, seqA, seqB, matchScore, mismatchScore, gapScore, speed} = props;
    const [matrix, setMatrix] = useState([]);
    const [texts, setTexts] = useState([]);
    const [paths, setPaths] = useState([]);

    const printSeqA: string[] = [' ', ...Array.from(seqA)];
    const printSeqB: string[] = [' ', ' ', ...Array.from(seqB)];

    /*
    create a matrix based on parameters and align the path(s)
    set matrix and path(s) as state
     */
    const setupMatrix = () => {
        const setup = setupFunction.get(algorithm);
        const workers = setup(seqA, seqB, matchScore, mismatchScore, gapScore);

        setMatrix(workers.algorithmMatrix.matrix);
        setTexts(workers.textProducer.produceText());
        setPaths(workers.algorithmMatrix.align());
    };

    const showAscenders = (cell: Cell) => (event: any) => {
        decolorCells(["ascenderNode", "selectedNode"]);
        const clickedCell = document.getElementById(`C${cell.x_position}${cell.y_position}`);
        const ascenders = [cell.top_ascender, cell.left_ascender, cell.top_left_ascender]
        for (let i = 0; i < ascenders.length; i++) {
            if (ascenders[i] !== null) {
                const ascenderCell = document.getElementById(`C${ascenders[i].x_position}${ascenders[i].y_position}`);
                ascenderCell.classList.add("ascenderNode");
                clickedCell.classList.add("selectedNode");
            }
        }
    };

    const cellGradient = (score: number) => {
        if (score <= -20) {
            return "#d2eeed";
        } else if (score <= -15) {
            return "#bce6e4";
        } else if (score <= -10) {
            return "#a5dddc";
        } else if (score <= -5) {
            return "#8fd5d3";
        } else if (score <= 0) {
            return "#79cdca";
        } else if (score <= 5) {
            return "#62c4c2";
        } else if (score <= 10) {
            return "#4cbcb9";
        } else if (score <= 15) {
            return "#36b4b0";
        } else if (score <= 20) {
            return "#20aca8";
        }
    };

    // every time a change happens to one of the parameters, the matrix and texts should be generated again
    useEffect(() => {
        decolorCells(["chosenPath", "ascenderNode", "selectedNode"]);
        setupMatrix();
    }, [algorithm, seqA, seqB, matchScore, mismatchScore, gapScore])

    return (
        <div id="createdMatrixComponent">
            <div id="alignedSequenceComponent">
                <table className="matrixTable">
                    <tbody>
                    <tr>
                        {printSeqB.map((char, i) => (
                            <th key={i} className="tableCells"
                                style={{backgroundColor: sequenceColor(char)}}
                            >{char}</th>
                        ))}
                    </tr>
                    {matrix.map((elem, j) => (
                        <tr key={j}>
                            <th className="tableCells" id={`TCinner${j}`}
                                style={{backgroundColor: sequenceColor(printSeqA[j])}}>{printSeqA[j]}</th>
                            {elem.map((cell: Cell, i: number) => (
                                <th key={i}
                                    className="tableCells innerCell"
                                    id={`C${cell.x_position}${cell.y_position}`}
                                    onClick={showAscenders(cell)}
                                    style={{backgroundColor: cellGradient(cell.final_score)}}>{cell.final_score}</th>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div id="alignmentPathComponent">
                <Paths texts={texts} paths={paths} speed={speed}/>
            </div>
        </div>
    )
}

export default Matrix;
