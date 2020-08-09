import React from "react";

import github from "../github.png";
import linkedin from "../linkedin.png"

const Infos = () => {

    return(
        <div>
            <div className={"contactSection"}>
                <a rel="noreferrer" target="_blank" href="https://github.com/larapollehn" className="socialName">
                    <img id="githubLink" src={github}
                         className="socialLink"/>
                </a>
                <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/pollehn/" className="socialName">
                    <img id="githubLink" src={linkedin}
                         className="socialLink"/>
                </a>
            </div>
        </div>
    )
};

export default Infos;
