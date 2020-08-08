import React, {useState} from "react";

import Matrix from "./Matrix";
import mouse from "../mouse.png";

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
        if (target === "seqA" || target === "seqB" || target === "algorithm") {
            setValues({...values, [target]: event.target.value})
        } else {
            setValues({...values, [target]: Number(event.target.value)})
        }

    }

    return (
        <div id="parentComponent">
            <div id="logoComponent">
                <img className={"logo"} src={mouse} alt="mouse-logo"/>
            </div>
            <div id="settingsComponent">
                <div className="settingsContainer">
                    <select className={"algorithmSelect"} onChange={handleInputChange("algorithm")}>
                        {
                            algorithms.map((algorithm, i) => (
                                <option key={i} value={algorithm}>{algorithm}</option>
                            ))
                        }
                    </select>
                    <div className={"formInput"}>
                        <label className={"userInput inputLabel"}>Sequence A</label>
                        <input className={"userInput inputField"} id="seqA" type="text" value={seqA}
                               onChange={handleInputChange("seqA")}/>
                    </div>

                    <div className={"formInput"}>
                        <label className={"userInput inputLabel"}>Sequence B</label>
                        <input className={"userInput inputField"} id="seqB" type="text" value={seqB}
                               onChange={handleInputChange("seqB")}/>
                    </div>

                    <div className={"formInput"}>
                        <label className={"userInput inputLabel"}>Match</label>
                        <input className={"userInput inputField"} id="matchScore" type="number" value={matchScore}
                               onChange={handleInputChange('matchScore')}/>
                    </div>

                    <div className={"formInput"}>
                        <label className={"userInput inputLabel"}>Mismatch</label>
                        <input className={"userInput inputField"} id="mismatchScore" type="number" value={mismatchScore}
                               onChange={handleInputChange("mismatchScore")}/>
                    </div>

                    <div className={"formInput"}>
                        <label className={"userInput inputLabel"}>Gap</label>
                        <input className={"userInput inputField"} id="gapScore" type="number" value={gapScore}
                               onChange={handleInputChange("gapScore")}/>
                    </div>
                </div>

            </div>
            <div id="speedRangeComponent">
                <div className={"speedRangeContainer"}>
                    <label>Visualization Speed</label>
                    <div>
                        <label>SLOW</label><input name="speed" type="range" min="0" max="1000" id="speedPicker"
                                                  onChange={handleSpeedChange} defaultValue={"1000"}/><label>FAST</label>
                    </div>
                </div>

            </div>
            <div id="matrixComponent">
                <Matrix algorithm={algorithm} seqA={seqA} seqB={seqB} matchScore={matchScore}
                        mismatchScore={mismatchScore}
                        gapScore={gapScore} speed={speed}/>
            </div>
        </div>
    )
}

export default Settings;
