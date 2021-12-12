import React, {useState} from 'react'
import "../styles/components/canvasObjectCreator.styles.scss";

import CanvasTextCreator from "./CanvasTextCreator.component"
import CanvasImageCreator from "./CanvasImageCreator.component"

const TABS = {
    TEXT: "Text",
    IMAGE: "Image"
}


const CanvasObjectCreator = () => {

    const [activeTab, setActiveTab] = useState(TABS.TEXT)

    const renderContainer = (activeTab: string) => {
        switch(activeTab){
            case TABS.IMAGE:
                return <CanvasImageCreator />
            default:
                return <CanvasTextCreator />
        }
    }

    return (
        <div className="object-creator">
            <header className="object-creator__header">
                {Object.entries(TABS).map(([key, value]) => (
                    <button
                        className={`object-creator__toggle-btn ${activeTab == value ? "object-creator__toggle-btn--active": ""}`}
                        key={value}
                        onClick={() => setActiveTab(value)}
                    >
                        {value}
                    </button>   
                ))}

                
            </header>
            <div  className="object-creator__container">
                {renderContainer(activeTab)}
            </div>
        </div>
    )
}

export default CanvasObjectCreator