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
}

const Matrix = (props: Props) => {
    const {algorithm, seqA, seqB, matchScore, mismatchScore, gapScore} = props;
    const [matrix, setMatrix] = useState([]);
    const [paths, setPaths] = useState([]);

    const createMatrix = () => {
        console.log(seqA, seqB, matchScore, mismatchScore, gapScore);
        if (algorithm === "NeedelemanWunschSimilarity") {
            const needlemanWunschSimilarity = new NeedlemanWunschSimilarity(seqA, seqB, matchScore, mismatchScore, gapScore);
            const similarityTextProducer = new SimpleTextProducer(needlemanWunschSimilarity);
            setMatrix(needlemanWunschSimilarity.matrix);
            setPaths(similarityTextProducer.produceText());
        } else if (algorithm === "NeedlemanWunschDistance") {
            const needlemanWunschDistance = new NeedlemanWunschDistance(seqA, seqB, matchScore, mismatchScore, gapScore);
            const distanceTextProducer = new SimpleTextProducer(needlemanWunschDistance);
            setMatrix(needlemanWunschDistance.matrix);
            setPaths(distanceTextProducer.produceText());
        } else if (algorithm === "SmithWaterman") {
            const smithWaterman = new SmithWaterman(seqA, seqB, matchScore, mismatchScore, gapScore);
            const smithWatermanTextProducer = new SimpleTextProducer(smithWaterman);
            setMatrix(smithWaterman.matrix);
            setPaths(smithWatermanTextProducer.produceText());
        }
    }

    useEffect(() => {
        createMatrix()
    }, [algorithm, seqA, seqB, matchScore, mismatchScore, gapScore])

    return (
        <div>
            <h2>{algorithm}</h2>
            <table>
                <tbody>
                {matrix.map((elem, j) => (
                    <tr key={j}>
                        {elem.map((cell: Cell, i: number) => (
                            <th key={i} style={{minWidth: "30px"}}>{cell.final_score}</th>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            {paths.map((path: string[], i: number) => (
                <ul key={i}>
                    {path.map((text: string, j: number) => (
                        <li key={j}>{text}</li>
                    ))}
                </ul>
            ))}
        </div>
    )
}

export default Matrix;
