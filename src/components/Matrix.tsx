import React from "react";

interface Props {
    algorithm: string,
    seqA: string,
    seqB: string,
    matchScore: number,
    mismatchScore: number,
    gapScore: number,
}

const Matrix = (props: Props) => {


    return (
        <div>
            <h2>{props.algorithm}</h2>
        </div>
    )
}

export default Matrix;
