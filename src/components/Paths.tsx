import React from "react";
import {decolorCells, sequenceColor} from "../Utils";
import Cell from "../algorithms/Cell";

interface Props {
    texts: string[],
    paths: Cell[],
    speed: number
}

const Paths = (props: Props) => {
    const {texts, paths, speed} = props;

    const visualizePath = (index: number) => async (event: any) => {
        // @ts-ignore
        const chosenPath: Cell[] = paths[index];
        const colorSpeed = 1000 - speed;
        decolorCells(["chosenPath"]);
        //color the cells belonging to the clicked path
        for (let i = 0; i < chosenPath.length; i++) {
            await sleep(colorSpeed);
            const cell: HTMLElement = document.getElementById(`C${chosenPath[i].x_position}${chosenPath[i].y_position}`);
            cell.classList.add("chosenPath");
        }
    };

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    };

    return (
        <ul className="pathList">
            {texts.map((path, i) => (
                <li key={i} onClick={visualizePath(i)} className="path">
                    <div>
                        <p className={"pathString"}>{Array.from(path[0]).map((char, i: number) => (
                            <span className={"pathNucleotide"} key={i}
                                  style={{backgroundColor: sequenceColor(char)}}>{char}</span>
                        ))}</p>
                        <p className={"pathString"}>{Array.from(path[2]).map((char, i: number) => (
                            <span className={"pathNucleotide"} key={i}
                                  style={{backgroundColor: sequenceColor(char)}}>{char}</span>
                        ))}</p>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default Paths;
