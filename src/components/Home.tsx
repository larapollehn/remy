import React, {ReactElement, useState} from "react";
import Settings from "./Settings";
import Tutorial from "./Tutorial";

const Home = (): ReactElement => {

    return (
        <div id={"home"}>
            <div className={"homeTutorialSection"}>
                <Tutorial/>
            </div>

            <Settings/>
        </div>
    )
}

export default Home;
