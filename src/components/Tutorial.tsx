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

    const closeModal = () => {
        const modal = document.getElementById("tutorialContainer");
        if (modal){
            modal.style.display = "none";
        }
    }

    return (
        <div id={"tutorialContainer"}>
            <a onClick={closeModal} className={"closeModal"}>
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x-circle-fill" fill="lightgrey"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.146-3.146a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z"/>
                </svg>
            </a>
            <p className={"tutorialTitle"}>Tutorial for Remys Lab</p>
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
