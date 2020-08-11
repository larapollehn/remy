import React, {ReactElement, useState} from "react";
import Settings from "./Settings";
import Tutorial from "./Tutorial";

const Home = (): ReactElement => {
    const [showTutorial, setShowTutorial] = useState(true);
    return (
        <div id={"home"}>
            {showTutorial &&
            <div className={"homeTutorialSection"}>
                <button className={"tutorialBtn skipBtn"} onClick={() => setShowTutorial(false)}>Close Tutorial</button>
                <Tutorial/>
            </div>
            }
            {!showTutorial &&
            <Settings/>
            }
        </div>
    )
}

export default Home;
