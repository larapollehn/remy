import React, {useEffect, useState} from "react";
import {decolorCells, sequenceColor} from "../Utils";
import Cell from "../algorithms/Cell";

interface Props {
    texts: string[],
    paths: Cell[],
    speed: number
}

const Paths = (props: Props) => {
    const {texts, paths, speed} = props;
    const [page, setPage] = useState(0);
    const [pageMarker, setPageMarker] = useState([]);
    const itemPerPage = 2;
    const [visiblePaths, setVisiblePaths] = useState([]);

    const visualizePath = (index: number) => async (event: any) => {
        // @ts-ignore
        const chosenPath: Cell[] = paths[index];
        const selectedPath = document.getElementById(`P${index}`);
        const colorSpeed = 1000 - speed;
        decolorCells(["chosenPath", "selectedPath"]);
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
            decolorCells(["chosenPath", "selectedPath"]);
            const selectedPath = document.getElementById(`P0`);
            if (selectedPath) {
                selectedPath.classList.add("selectedPath");
            }
            // @ts-ignore
            const chosenPath: Cell[] = paths[0];
            //color the cells belonging to the clicked path
            for (let i = 0; i < chosenPath.length; i++) {
                const cell: HTMLElement = document.getElementById(`C${chosenPath[i].x_position}${chosenPath[i].y_position}`);
                cell.classList.add("chosenPath");
            }
        }
        createPagination();
    }, [visiblePaths]);

    useEffect(() => {
        setVisiblePaths(texts.slice(0, itemPerPage));
    }, [paths])

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    };

    const changePage = (index: number) => {
        const currentPaths = texts.slice(index*itemPerPage, (index*itemPerPage)+itemPerPage);
        setVisiblePaths(currentPaths);
       visualizePath(index);
    }

    return (
        <div>
            <ul>
                {
                    pageMarker.map((marker, i) => (
                        <li key={i} onClick={() => changePage(i)}>{marker}</li>
                    ))
                }
            </ul>
            <ul className="pathList">
                {visiblePaths.map((path, i) => (
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
    )
}

export default Paths;
