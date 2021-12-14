import React from 'react'
import { FaTimes } from "react-icons/fa"
import "../styles/components/canvasEditorOverlay.styles.scss"
import { useSelector, useDispatch } from 'react-redux';
import {setShowImageOverlay} from "../redux/canvas/canavs.actions"
import { RootState } from "../redux/store"
import CanvasBackgroundSettings from "./CanvasBackgroundSettings.component"
import CanvasTemplateList from "./CanvasTemplateList.component"


/*
    - remove background (if background)
    - add/change background ()

    - paginated template list
*/


const CanvasEditorOverlay = () => {
    const dispatch = useDispatch();


    const show = useSelector((state:RootState) => state.canvas.showChoseBackgroundOverlay)
    console.log(show)



    const onClose = () => {
        dispatch(setShowImageOverlay(false))
    }

    return (
        <div className={`canvas-editor ${show ? "" : "canvas-editor--closed"}`}>
            <div className="canvas-editor__container">
                <header className="canvas-editor__header">
                    <h3>Canvas Settings</h3>
                  
                    <button className="canvas-editor__close" onClick={onClose}>
                        <FaTimes />
                    </button>
                </header>

                <div className="canvas-editor__body">
                    <CanvasBackgroundSettings />
                    <CanvasTemplateList />
                </div>
                
            </div>
        </div>
    )
}

export default CanvasEditorOverlay;