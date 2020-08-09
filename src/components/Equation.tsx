import React from "react";
import MathJax from "react-mathjax";

import {defaultScores} from "../Globals";

interface Props {
    algorithm: string;
    matchScore: number;
    mismatchScore: number;
    gapScore: number;
}

const Equation = (props: Props) => {
    const {algorithm, matchScore, mismatchScore, gapScore} = props;
    const defaultScore = defaultScores.get(algorithm);

    const tex = `D_{i,j}=\\${defaultScore.minmax}\\begin{cases}D_{i-1,j-1}& + &${matchScore}&a_i = b_j\\\\D_{i-1,j-1}& + &${mismatchScore}&a_i \\neq b_j\\\\
D_{i-1,j}& + &${gapScore}&b_j = -\\\\D_{i,j-1}& + &${gapScore}&a_i = -\\end{cases}`;

    return (
        <div>
            <MathJax.Provider>
                <div>
                    <MathJax.Node formula={tex}/>
                </div>
            </MathJax.Provider>
        </div>
    );
};

export default Equation;
