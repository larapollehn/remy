import React, {useState} from "react";

import Matrix from "./Matrix";
import mouse from "../mouse.png";
import Infos from "./Infos";
import Equation from "./Equation";

const Settings = () => {
    const algorithms = ["Needleman-Wunsch Similarity", "Needleman-Wunsch Distance", "Smith-Waterman"];
    const [values, setValues] = useState({
        algorithm: "Needleman-Wunsch Similarity",
        seqA: 'GATACAAAT',
        seqB: "TACAGAATC",
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

    const dnaInput = (seq: string, char: string) => (event: any) => {
        let current;
        if (seq === "seqA") {
            current = seqA;
        } else if (seq === "seqB") {
            current = seqB;
        }
        setValues({...values, [seq]: current += char})
    }

    return (
        <div id="parentComponent">
            <div id={"logoComponent"}>
                <div className={"brand"}>
                    <h1 className={"logoName"}>Remy <span className={"logoSub"}>- DNA Alignment</span></h1>
                    <img className={"mouseLogo"} src={mouse} alt="cute little mouse"/>
                </div>
            </div>
            <div id="settingsComponent">
                <div className="settingsContainer">
                    <h2 className={"settingHead"}>Choose Parameters</h2>
                    <label className={"userInput"}>Algorithm</label>
                    <select className={"algorithmSelect"} onChange={handleInputChange("algorithm")}>
                        {
                            algorithms.map((algorithm, i) => (
                                <option key={i} value={algorithm}>{algorithm}</option>
                            ))
                        }
                    </select>
                    <div className={"formInput"}>
                        <label className={"userInput sequenceLabel"}>First Sequence</label>
                        <div className={"dnaInputContainer"}>
                            <input className={"sequenceInput"} id="seqA" type="text" value={seqA}
                                   onChange={handleInputChange("seqA")}/>
                            <button className={"sequenceBtn adenin"} onClick={dnaInput("seqA", "A")}>A</button>
                            <button className={"sequenceBtn thymin"} onClick={dnaInput("seqA", "T")}>T</button>
                            <button className={"sequenceBtn cytosin"} onClick={dnaInput("seqA", "C")}>C</button>
                            <button className={"sequenceBtn guanin"} onClick={dnaInput("seqA", "G")}>G</button>
                        </div>
                    </div>

                    <div className={"formInput"}>
                        <label className={"userInput sequenceLabel"}>Second Sequence</label>
                        <div className={"dnaInputContainer"}>
                            <input className={"sequenceInput"} id="seqB" type="text" value={seqB}
                                   onChange={handleInputChange("seqB")}/>
                            <button className={"sequenceBtn adenin"} onClick={dnaInput("seqB", "A")}>A</button>
                            <button className={"sequenceBtn thymin"} onClick={dnaInput("seqB", "T")}>T</button>
                            <button className={"sequenceBtn cytosin"} onClick={dnaInput("seqB", "C")}>C</button>
                            <button className={"sequenceBtn guanin"} onClick={dnaInput("seqB", "G")}>G</button>
                        </div>
                    </div>

                    <div className={"formInputScore"}>
                        <label className={"userInput inputLabel"}>Match</label>
                        <input className={"userInput inputField"} id="matchScore" type="number" value={matchScore}
                               onChange={handleInputChange('matchScore')}/>
                    </div>

                    <div className={"formInputScore"}>
                        <label className={"userInput inputLabel"}>Mismatch</label>
                        <input className={"userInput inputField"} id="mismatchScore" type="number" value={mismatchScore}
                               onChange={handleInputChange("mismatchScore")}/>
                    </div>

                    <div className={"formInputScore"}>
                        <label className={"userInput inputLabel"}>Gap</label>
                        <input className={"userInput inputField"} id="gapScore" type="number" value={gapScore}
                               onChange={handleInputChange("gapScore")}/>
                    </div>
                </div>
                <div className={"speedRangeContainer"}>
                    <label className={"speedPickerLabel"}>Speed</label>
                    <div className={"speedInput"}>
                        <input name="speed" type="range" min="0" max="1000" id="speedPicker"
                               onChange={handleSpeedChange}
                               defaultValue={"1000"} style={{width: "100%"}}/>
                    </div>
                </div>
                <br/>
                <Equation algorithm={algorithm} matchScore={matchScore} mismatchScore={mismatchScore} gapScore={gapScore}/>
                <br/>
                <Infos/>
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
