import React, {useEffect, useState} from "react";
import {decolor, sequenceColor} from "../Utils";
import Cell from "../algorithms/Cell";

interface Props {
    texts: string[],
    paths: Cell[],
    speed: number
}

const Paths = (props: Props) => {
    const {texts, paths, speed} = props;
    const [pageMarker, setPageMarker] = useState([]); // the numbers for the pagination menu
    const itemPerPage = 5; // use to slice an array
    const [visibleTexts, setVisibleTexts] = useState([]); // the texts to be seen in the right menu, in form of their text strings
    const [visiblePaths, setVisiblePaths] = useState([])

    const visualizePath = (index: number) => async (event: any) => {
        // @ts-ignore
        const chosenPath: Cell[] = visiblePaths[index];
        const selectedPath = document.getElementById(`P${index}`);
        const colorSpeed = 1000 - speed;
        decolor(["chosenPath", "selectedPath"]);
        if (selectedPath) {
            selectedPath.classList.add("selectedPath");
        }
        //color the cells belonging to the clicked path
        for (let i = 0; i < chosenPath.length; i++) {
            await sleep(colorSpeed);
            const cell: HTMLElement = document.getElementById(`C${chosenPath[i].x_position}${chosenPath[i].y_position}`);
            cell.classList.add("chosenPath");
        }
    };

    const createPagination = () => {
        const pages = Math.ceil(texts.length / itemPerPage);
        const pageNumbers = [];
        for (let i = 0; i < pages; i++){
            pageNumbers.push(i+1);
        }
        setPageMarker(pageNumbers);
    }

    /**
     * visualize the first path directly after rendering
     */
    useEffect(() => {
        if (visiblePaths && visiblePaths.length > 0) {
            decolor(["chosenPath", "selectedPath"]);
            const selectedPath = document.getElementById(`P0`); // get the first path
            if (selectedPath) {
                selectedPath.classList.add("selectedPath");
            }
            // @ts-ignore
            const chosenPath: Cell[] = visiblePaths[0];
            //color the cells belonging to the clicked path
            for (let i = 0; i < chosenPath.length; i++) {
                const cell: HTMLElement = document.getElementById(`C${chosenPath[i].x_position}${chosenPath[i].y_position}`);
                cell.classList.add("chosenPath");
            }
        }
        createPagination();
    }, [visiblePaths]);

    useEffect(() => {
        setVisibleTexts(texts.slice(0, itemPerPage));
        setVisiblePaths(paths.slice(0, itemPerPage));
    }, [paths])

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    };

    const changePage = (index: number) => {
        setVisibleTexts(texts.slice(index*itemPerPage, (index*itemPerPage)+itemPerPage));
        setVisiblePaths(paths.slice(index*itemPerPage, (index*itemPerPage)+itemPerPage))
        visualizePath(index);
        decolor(["selectedMarker"]);
        const marker = document.getElementById(`M${index}`);
        if(marker){
            marker.classList.add("selectedMarker");
        }
    }

    return (
        <div>
            <div id={"pagination"}>
                <ul className={"pageMarkerList"}>
                    {pageMarker.length > 1 && pageMarker.slice(0,1).map((marker, i) => (
                        <li id={`M${i}`} className={"pageMarker selectedMarker"} key={i} onClick={() => changePage(i)}>{marker}</li>
                    ))}
                    {
                        pageMarker.length > 1 && pageMarker.slice(1).map((marker, i) => (
                            <li id={`M${i+1}`} className={"pageMarker"} key={i} onClick={() => changePage(i+1)}>{marker}</li>
                        ))
                    }
                </ul>
            </div>
            <div>
                <ul className="pathList">
                    {visibleTexts.map((path, i) => (
                        <li key={i} id={`P${i}`} onClick={visualizePath(i)} className="path">
                            <div className={"sequence"}>
                                <p className={"pathString"}>{Array.from(path[0]).map((char: unknown, i: number) => (
                                    <span className={"pathNucleotide upperNucleotide"} key={i}
                                          style={{backgroundColor: sequenceColor(char)}}>{char}</span>
                                ))}</p>
                                <p className={"pathString"}>{Array.from(path[2]).map((char, i: number) => (
                                    <span className={"pathNucleotide lowerNucleotide"} key={i}
                                          style={{backgroundColor: sequenceColor(char)}}>{char}</span>
                                ))}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Paths;
