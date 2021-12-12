import React, {useState} from 'react'
import "../styles/components/canvasObjectCreator.styles.scss";

import CanvasTextCreator from "./CanvasTextCreator.component"


const TABS = {
    TEXT: "TEXT",
    IMAGE: "IMAGE"
}


const CanvasObjectCreator = () => {

    const [activeTab, setActiveTabs] = useState(TABS.TEXT)

    const renderContainer = (activeTab: string) => {
        switch(activeTab){
            default:
                return <CanvasTextCreator />
        }
    }

    return (
        <div className="object-creator">
            <header className="object-creator__header">
                <button className="object-creator__toggle-btn">Text</button>
                <button  className="object-creator__toggle-btn">Image</button>
            </header>
            <div  className="object-creator__container">
                {renderContainer(activeTab)}
            </div>
        </div>
    )
}

export default CanvasObjectCreator