import React, {useState} from "react"
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {DISPLAY_OBJECT_TYPES} from "../pixijs/App"
import CanvasTextEditor from "./CanvasTextEditor.component"
import CanvasImageEditor from "./CanvasImageEditor.component"

const ActiveObjectEditor = () => {

    const activeObj: any = useSelector((state: RootState) => state.canvasObjects.activeObject)
    const objects: Record<string, any> = useSelector((state: RootState) => state.canvasObjects.objects)
    const activeObject = activeObj && activeObj in objects ? objects[activeObj] : null;
    

    const renderEditor = () => {
        if(!activeObj) return null;
        switch(activeObject.type){
            case DISPLAY_OBJECT_TYPES.IMAGE_OBJECT:
                return <CanvasImageEditor activeObject={activeObject}/>
            case DISPLAY_OBJECT_TYPES.TEXT_OBJECT:
                return <CanvasTextEditor activeObject={activeObject}/>
            default:
                return null;
        }
    }

    return (
        <div className="ui-panel">
           {renderEditor()}
        </div>
    )
}

export default ActiveObjectEditor;