import React, {useEffect, useState} from "react";
import Cell from "../algorithms/Cell";
import {decolor, sequenceColor} from "../Utils";
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
    const [cellScores, setCellScores] = useState(new Map());

    const printSeqA: string[] = [' ', ...Array.from(seqA)];
    const printSeqB: string[] = ['D/S', ' ', ...Array.from(seqB)];

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

        gradientScores(workers.algorithmMatrix.matrix);
    };

    /*
    * finds highest and lowest score in matrix to later create a good gradient with background colors
     */
    const gradientScores = (cells: Cell[][]) => {
        const scores = new Set();
        for (let i = 0; i < cells.length; i++){
            for (let j = 0; j < cells[i].length; j++){
                scores.add(Number(cells[i][j].final_score));
            }
        }
        // @ts-ignore
        const sortedScores = Array.from(scores).sort((a,b) => a-b).reverse();
        const stepSize = 190 / sortedScores.length; // 190 is the difference between the highest and lowest color score 200 and 10
        const colorsScore = new Map();
        for (let i = 0; i < sortedScores.length; i++){
            colorsScore.set(sortedScores[i], ((stepSize*(i+1))))
        }
        setCellScores(colorsScore);
    }

    const showAscenders = (cell: Cell) => (event: any) => {
        decolor(["ascenderNode", "selectedNode"]);
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
        const color = cellScores.get(score);
        return `rgb(${color},${color},${color})`;
    };

    // every time a change happens to one of the parameters, the matrix and texts should be generated again
    useEffect(() => {
        decolor(["chosenPath", "ascenderNode", "selectedNode"]);
        setupMatrix();
    }, [algorithm, seqA, seqB, matchScore, mismatchScore, gapScore])

    return (
        <div id="createdMatrixComponent">
            <div id="alignedSequenceComponent">
                <table className="matrixTable">
                    <tbody>
                    <tr>
                        {printSeqB.map((char, i) => (
                            <th key={i} className="tableCells sequenceCell"
                                style={{backgroundColor: sequenceColor(char)}}
                            >{char}</th>
                        ))}
                    </tr>
                    {matrix.map((elem, j) => (
                        <tr key={j}>
                            <th className="tableCells sequenceCell" id={`TCinner${j}`}
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
