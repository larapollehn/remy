import React, {useEffect, useState} from "react";
import NeedlemanWunschSimilarity from "../algorithms/NeedlemanWunschSimilarity";
import NeedlemanWunschDistance from "../algorithms/NeedlemanWunschDistance";
import SmithWaterman from "../algorithms/SmithWaterman";
import Cell from "../algorithms/Cell";
import SimpleTextProducer from "../text/SimpleTextProducer";

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
        if (algorithm === "NeedelemanWunschSimilarity") {
            const needlemanWunschSimilarity = new NeedlemanWunschSimilarity(seqA, seqB, matchScore, mismatchScore, gapScore);
            const similarityTextProducer = new SimpleTextProducer(needlemanWunschSimilarity);
            setMatrix(needlemanWunschSimilarity.matrix);
            setTexts(similarityTextProducer.produceText());
            setPaths(needlemanWunschSimilarity.align());
        } else if (algorithm === "NeedlemanWunschDistance") {
            const needlemanWunschDistance = new NeedlemanWunschDistance(seqA, seqB, matchScore, mismatchScore, gapScore);
            const distanceTextProducer = new SimpleTextProducer(needlemanWunschDistance);
            setMatrix(needlemanWunschDistance.matrix);
            setTexts(distanceTextProducer.produceText());
            setPaths(needlemanWunschDistance.align());
        } else if (algorithm === "SmithWaterman") {
            const smithWaterman = new SmithWaterman(seqA, seqB, matchScore, mismatchScore, gapScore);
            const smithWatermanTextProducer = new SimpleTextProducer(smithWaterman);
            setMatrix(smithWaterman.matrix);
            setTexts(smithWatermanTextProducer.produceText());
            setPaths(smithWaterman.align());
        }
    }

    const visualizePath = (index: number) => async (event: any) => {
        const chosenPath: Cell[] = paths[index];
        const colorSpeed = 1000 - speed;
        decolorCells(["chosenPath"]);
        //color the cells belonging to the clicked path
        for (let i = 0; i < chosenPath.length; i++) {
            await sleep(colorSpeed);
            const cell: HTMLElement = document.getElementById(`C${chosenPath[i].x_position}${chosenPath[i].y_position}`);
            cell.classList.add("chosenPath");
        }
    }

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    /*
    takes an array with class names and removes it from all elements
     */
    const decolorCells = (name: string[]) => {
        for (let i = 0; i < name.length; i++) {
            const coloredCells = document.getElementsByClassName(name[i]);
            while (coloredCells.length > 0) {
                coloredCells[0].classList.remove(name[i]);
            }
        }
    }

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
    }

    // every time a change happens to one of the parameters, the matrix and texts should be generated again
    useEffect(() => {
        decolorCells(["chosenPath", "ascenderNode", "selectedNode"]);
        setupMatrix();
    }, [algorithm, seqA, seqB, matchScore, mismatchScore, gapScore])

    return (
        <div id="createdMatrixComponent">
            <div id="algorithmComponent">
                <h2>{algorithm}</h2>
            </div>
            <div id="alignedSequenceComponent">
                <table className="matrixTable">
                    <tbody>
                    <tr>
                        {printSeqB.map((char, i) => (
                            <th key={i} className="tableCells">{char}</th>
                        ))}
                    </tr>
                    {matrix.map((elem, j) => (
                        <tr key={j}>
                            <th className="tableCells">{printSeqA[j]}</th>
                            {elem.map((cell: Cell, i: number) => (
                                <th key={i}
                                    className="tableCells"
                                    id={`C${cell.x_position}${cell.y_position}`}
                                    onClick={showAscenders(cell)}>{cell.final_score}</th>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div id="alignmentPathComponent">
                <ul className="pathList">
                    {texts.map((path, i) => (
                        <li key={i} onClick={visualizePath(i)} className="path">
                            <div>
                                <p>{path[0]}</p>
                                <p>{path[1]}</p>
                                <p>{path[2]}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Matrix;
