import React, {useEffect, useState} from "react";
import NeedlemanWunschSimilarity from "../algorithms/NeedlemanWunschSimilarity";
import NeedlemanWunschDistance from "../algorithms/NeedlemanWunschDistance";
import SmithWaterman from "../algorithms/SmithWaterman";
import Cell from "../algorithms/Cell";

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

    const createMatrix = () => {
        console.log(seqA, seqB, matchScore, mismatchScore, gapScore);
        if (algorithm === "NeedelemanWunschSimilarity") {
            const needlemanWunschSimilarity = new NeedlemanWunschSimilarity(seqA, seqB, matchScore, mismatchScore, gapScore);
            setMatrix(needlemanWunschSimilarity.matrix);
        } else if (algorithm === "NeedlemanWunschDistance") {
            const needlemanWunschDistance = new NeedlemanWunschDistance(seqA, seqB, matchScore, mismatchScore, gapScore);
            setMatrix(needlemanWunschDistance.matrix);
        } else if (algorithm === "SmithWaterman") {
            const smithWaterman = new SmithWaterman(seqA, seqB, matchScore, mismatchScore, gapScore);
            setMatrix(smithWaterman.matrix);
        }
        console.log(matrix);
    }

    useEffect(() => {
        createMatrix()
    }, [algorithm, matchScore, mismatchScore, gapScore])

    return (
        <div>
            <h2>{algorithm}</h2>
            <table>
                {matrix.map((elem) => (
                    <tr>
                        {elem.map((cell: Cell, i: number) => (
                            <th key={i}>{cell.final_score}</th>
                        ))}
                    </tr>
                ))}
            </table>

        </div>
    )
}

export default Matrix;
