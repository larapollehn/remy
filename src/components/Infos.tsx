import React from "react";


const Infos = () => {

    return(
        <div>
            <div className={"howToSection"}>
                <h3>How To Use Remy</h3>
                <ul className={"howToList"}>
                    <li className={"howToStep"}>Choose an algorithm</li>
                    <li className={"howToStep"}>Type in two sequences</li>
                    <li className={"howToStep"}>Assign Scores for match/mismatch/gap</li>
                    <li className={"howToStep"}>Choose a path visualization speed</li>
                    <li className={"howToStep"}>Choose Path to be visualized</li>
                    <li className={"howToStep"}>Click on Cell to see ascender(s)</li>
                </ul>
            </div>
            <br/>
            <div className={"contactSection"}>
                <h3>Find me and the source Code</h3>
                <ul className={"contactList"}>
                    <li className={"contactItem"}>Github</li>
                    <li className={"contactItem"}>Website</li>
                    <li className={"contactItem"}>Code</li>
                </ul>
            </div>
        </div>
    )
};

export default Infos;
