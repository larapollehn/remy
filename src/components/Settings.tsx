import React, {useState} from "react";

import Matrix from "./Matrix";

const Settings = () => {
    const algorithms = ["NeedelemanWunschSimilarity", "NeedlemanWunschDistance", "SmithWaterman"];
    const [values, setValues] = useState({
            algorithm: "NeedelemanWunschSimilarity",
            seqA: 'GATACA',
            seqB: "TACAGA",
            matchScore: 1,
            mismatchScore: -1,
            gapScore: -2,
            speed: 1000,
    });
    const [speed, setSpeed] = useState(1000);
    const {algorithm, seqA, seqB, matchScore, mismatchScore, gapScore} = values;

    const handleSpeedChange = () => {
        const speedPicker = document.getElementById("speedPicker") as HTMLInputElement;
        setSpeed(Number(speedPicker.value));
    }

    const handleInputChange = (target: string) => (event: any) => {
        if (target === "seqA" || target === "seqB" || target === "algorithm"){
            setValues({...values, [target]: event.target.value})
        } else {
            setValues({...values, [target]: Number(event.target.value)})
        }

    }

    return (
        <div id="parentComponent">
            <div id="logoComponent">
                <h1>Remy</h1>
            </div>
            <div id="settingsComponent">
                <select onChange={handleInputChange("algorithm")}>
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
            </div>
            <div id="speedRangeComponent">
                <label>Visualization Speed</label>
                <div>
                    <label>SLOW</label><input name="speed" type="range" min="0" max="1000" id="speedPicker"
                                              onChange={handleSpeedChange} defaultValue={"1000"}/><label>FAST</label>
                </div>
            </div>
            <div id="matrixComponent">
                <Matrix algorithm={algorithm} seqA={seqA} seqB={seqB} matchScore={matchScore} mismatchScore={mismatchScore} gapScore={gapScore} speed={speed}/>
            </div>
        </div>
    )
}

export default Settings;
