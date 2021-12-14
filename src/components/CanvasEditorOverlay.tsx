import React, { useState, useEffect } from 'react'
import { FaTimes } from "react-icons/fa"
import "../styles/components/canvasEditorOverlay.styles.scss"
import { useSelector, useDispatch } from 'react-redux';
import { setCanvasDimensions, setCanvasBackgroundImage, setShowImageOverlay} from "../redux/canvas/canavs.actions"
import { RootState } from "../redux/store"
import {loadImageFromURL} from "../utils/image.utils"
import PixelInput from "./PixelInput.component";
import Input from "./Input.component"
import useCanvasLimiter from "../hooks/useCanvasLimiter"

import { MEME_TEMPLATES, getTemplatePath } from "../data/templates"

import CanvasBackgroundSettings from "./CanvasBackgroundSettings.component"
import CanvasTemplateList from "./CanvasTemplateList.component"


/*
    - remove background (if background)
    - add/change background ()

    - paginated template list
*/


const CanvasEditorOverlay = () => {
    const dispatch = useDispatch();

    const { width, height } = useSelector((state: RootState) => state.canvas.dimensions)
    const show = useSelector((state:RootState) => state.canvas.showChoseBackgroundOverlay)
    console.log(show)

    const backgroundImage = useSelector((state: RootState) => state.canvas.backgroundImage)
    const {limit, maxHeight, maxWidth} = useCanvasLimiter()

    const [canEditDimensions, setCanEditDimensions] = useState(false)


    const onWidthChange = (e: React.FormEvent<HTMLInputElement>) => {

        const target = e.target as HTMLInputElement;
        const newWidth = parseInt(target.value);


        dispatch(setCanvasDimensions(newWidth, height))
    }

    const onHeightChange = (e: React.FormEvent<HTMLInputElement>) => {

        const target = e.target as HTMLInputElement;
        const newHeight = parseInt(target.value);

        dispatch(setCanvasDimensions(width, newHeight))
    }

    const onImageClick = async (templatePath: string) => {
        const image = await loadImageFromURL(templatePath);
        console.log(image.width, image.height)
        const {width, height} = limit(image.width, image.height);

        console.log("width / height")
        console.log(maxWidth, maxHeight)
        console.log(image.width, image.height)
        console.log(width, height)
      

        // 577

        dispatch(setCanvasBackgroundImage(templatePath, width, height))
    }

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