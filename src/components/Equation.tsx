import React from "react";

interface Props {
    algorithm: string;
    matchScore: number;
    mismatchScore: number;
    gapScore: number;
}

const Equation = (props: Props) => {
    const {algorithm, matchScore, mismatchScore, gapScore} = props;

    return(
        <div id={"recursionEquation"}>
            <h3>Recursion Equation</h3>
            1 + 1 = 3
        </div>
    )
};

export default Equation;
