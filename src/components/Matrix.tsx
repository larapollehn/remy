import React, {useEffect, useState} from "react";
import NeedlemanWunschSimilarity from "../algorithms/NeedlemanWunschSimilarity";
import NeedlemanWunschDistance from "../algorithms/NeedlemanWunschDistance";
import SmithWaterman from "../algorithms/SmithWaterman";
import Cell from "../algorithms/Cell";
import SimpleTextProducer from "../text/SimpleTextProducer";
import "../Matrix.css";

interface Props {
    algorithm: string,
    seqA: string,
    seqB: string,
    matchScore: number,
    mismatchScore: number,
    gapScore: number,
}

const Matrix = (props: Props) => {
    const {algorithm, seqA, seqB, matchScore, mismatchScore, gapScore} = props;
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
        decolorCells();
        //color the cells belonging to the clicked path
        for (let i = 0; i < chosenPath.length; i++) {
            await sleep(0);
            const cell: HTMLElement = document.getElementById(`C${chosenPath[i].x_position}${chosenPath[i].y_position}`);
            cell.classList.add("chosenPath");
        }
    }

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    /*
    finds all Cells that are colored, to show path and remove specific css class from them
     */
    const decolorCells = () => {
        const coloredCells = document.getElementsByClassName("chosenPath");
        while (coloredCells.length > 0) {
            coloredCells[0].classList.remove("chosenPath");
        }
    }

    // every time a change happens to one of the parameters, the matrix and texts should be generated again
    useEffect(() => {
        decolorCells();
        setupMatrix();
    }, [algorithm, seqA, seqB, matchScore, mismatchScore, gapScore])

    return (
        <div>
            <h2>{algorithm}</h2>
            <table>
                <tbody>
                <tr>
                    {printSeqB.map((char, i) => (
                        <th key={i}>{char}</th>
                    ))}
                </tr>
                {matrix.map((elem, j) => (
                    <tr key={j}>
                        <th>{printSeqA[j]}</th>
                        {elem.map((cell: Cell, i: number) => (
                            <th key={i} style={{minWidth: "30px"}}
                                id={`C${cell.x_position}${cell.y_position}`}>{cell.final_score}</th>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            <ul>
                {texts.map((path, i) => (
                    <li key={i} onClick={visualizePath(i)}>{`${path[0]} ${path[1]} ${path[2]}`}</li>
                ))}
            </ul>
        </div>
    )
}

export default Matrix;
