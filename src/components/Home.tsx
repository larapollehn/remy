import React, {ReactElement, useState} from "react";
import Settings from "./Settings";
import Tutorial from "./Tutorial";

const Home = ():ReactElement => {
    const [showTutorial, setShowTutorial] = useState(true);
    return (
        <div>
            {showTutorial &&
                <div>
                    <h2>Welcome to Remys Lab</h2>
                    <Tutorial/>
                    <button onClick={() => setShowTutorial(false)}>Skip Tutorial</button>
                    <button onClick={() => setShowTutorial(false)}>Close</button>
                </div>
            }
            {!showTutorial &&
                <Settings/>
            }
        </div>
    )
}

export default Home;
