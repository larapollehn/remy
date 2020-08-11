import React, {ReactElement, useState} from "react";

import algo from "../algo.gif";
import settings from "../settings.gif";
import equation from "../equation.gif";
import speed from "../speed.gif";
import visualization from "../paths.gif";

const pageOne = {index: 0, page: 1, text: "Choose an algorithm", image: algo, next: true, prev: false};
const pageTwo = {index: 1, page: 2, text: "Set the parameters as needed", image: settings, next: true, prev: true};
const pageThree = {
    index: 2,
    page: 3,
    text: "Choose a path to see the traceback from the best score",
    image: visualization,
    next: true,
    prev: true
};
const pageFour = {
    index: 3,
    page: 4,
    text: "Change the speed of the path visualization",
    image: speed,
    next: true,
    prev: true
};
const pageFive = {
    index: 3,
    page: 4,
    text: "Take a look at the recursion equation",
    image: equation,
    next: false,
    prev: true
};
const pages = [pageOne, pageTwo, pageThree, pageFour, pageFive];

const Tutorial = (): ReactElement => {
    const [step, setStep] = useState(pageOne);
    const {text, image} = step;

    const changeStep = (index: number, direction: string) => (event: any) => {
        if (direction === "prev") {
            setStep(pages[index - 1])
        } else if (direction === "next") {
            setStep(pages[index + 1])
        }
    }

    return (
        <div id={"tutorialContainer"}>
            <p className={"tutorialTitle"}>Welcome to Remys Lab</p>
            <p className={"stepTitle"}>{text}</p>
            <div className={"imageContainer"}>
                <img className={"stepImage"} src={image} alt={"tutorial image"}/>
            </div>
            {step.prev &&
            <button className={"stepBtn prevBtn"} onClick={changeStep(step.index, "prev")}>Previous</button>
            }
            {step.next &&
            <button className={"stepBtn nextBtn"} onClick={changeStep(step.index, "next")}>Next</button>
            }
        </div>
    )
}

export default Tutorial;
