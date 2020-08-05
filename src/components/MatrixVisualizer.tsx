import React, {useState} from "react";

const MatrixVisualizer = () => {
    const algorithms = ["NeedelemanWunschSimilarity", "NeedlemanWunschDistance", "SmithWaterman"];
    const [values, setValues] = useState({
            seqA: 'GATACA',
            seqB: "TACAGA",
            matchScore: 1,
            mismatchScore: -1,
            gapScore: 2
    });

    const {seqA, seqB, matchScore, mismatchScore, gapScore} = values;

    const handleInputChange = (target: string) => (event: any) => {
        setValues({...values, [target]: event.target.value})
    }

    return (
        <div>
            <h3>Settings</h3>
            <select>
                {
                    algorithms.map((algorithm, i) => (
                        <option key={i} value={algorithm}>{algorithm}</option>
                    ))
                }
            </select>
            <br/>
            <input id="seqA" type="text" value={seqA} onChange={handleInputChange("seqA")}/>
            <label>Sequence A</label>
            <br/>

            <input id="seqB" type="text" value={seqB} onChange={handleInputChange("seqB")}/>
            <label>Sequence B</label>
            <br/>
            <input id="matchScore" type="number" value={matchScore} onChange={handleInputChange('matchScore')}/>
            <label>Match</label>
            <br/>
            <input id="mismatchScore" type="number" value={mismatchScore} onChange={handleInputChange("mismatchScore")}/>
            <label>Mismatch</label>
            <br/>
            <input id="gapScore" type="number" value={gapScore} onChange={handleInputChange("gapScore")}/>
            <label>Gap</label>

            <br/>
            {seqA}
            <br/>
            {seqB}
            <br/>
            {matchScore}
            <br/>
            {mismatchScore}
            <br/>
            {gapScore}
        </div>
    )
}

export default MatrixVisualizer;
