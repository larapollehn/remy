import React, {ReactElement, useState} from "react";

import mouse from "../mouse.png";

const pageOne = {index: 0, page: 1, text: "blu bla blub", image: mouse, next: true, prev: false};
const pageTwo = {index: 1, page: 2, text: "la la lu lu", image: mouse, next: true, prev: true};
const pageThree = {index: 2, page: 3, text: "hehe hihi huhu", image: mouse, next: true, prev: true};
const pageFour = {index: 3, page: 4, text: "yaaaaasss", image: mouse, next: false, prev: true};
const pages = [pageOne, pageTwo, pageThree, pageFour];

const Tutorial = ():ReactElement => {
    const [next, setNext] = useState(true);
    const [step, setStep] = useState(pageOne);
    const {page, text, image} = step;

    const changeStep = (index: number, direction: string) => (event: any) => {
        if (direction === "prev"){
            setStep(pages[index-1])
        } else if (direction === "next"){
            setStep(pages[index+1])
        }
    }

    return (
        <div>
            <h3>Step {page}</h3>
            <img src={image} alt={"tutorial image"} style={{width: "100px"}}/>
            <p>{text}</p>
            {step.prev &&
                <button onClick={changeStep(step.index, "prev")}>Previous</button>
            }
            {step.next &&
                <button onClick={changeStep(step.index, "next")}>Next</button>
            }
        </div>
    )
}

export default Tutorial;
