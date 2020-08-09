import React from "react";
import MathJax from "react-mathjax";

import {defaultScores, setupFunction} from "../Globals";

interface Props {
    algorithm: string;
    matchScore: number;
    mismatchScore: number;
    gapScore: number;
    seqA: string;
    seqB: string;
}

const Equation = (props: Props) => {
    const {algorithm, matchScore, mismatchScore, gapScore, seqB, seqA} = props;

    const setup = setupFunction.get(algorithm);
    const workers = setup(seqA, seqB, matchScore, mismatchScore, gapScore);
    const tex = workers.algorithmMatrix.tex();

    return (
        <div className={"equationContainer"}>
            <h2 className={"settingHead"}>Recursion Equation</h2>
            <MathJax.Provider>
                <div>
                    <MathJax.Node formula={tex}/>
                </div>
            </MathJax.Provider>
        </div>
    );
};

export default Equation;
