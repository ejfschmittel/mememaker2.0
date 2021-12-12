import React, { useState, useEffect } from 'react'
import { FaTimes } from "react-icons/fa"
import "../styles/components/canvasEditorOverlay.styles.scss"
import { useSelector, useDispatch } from 'react-redux';
import { setCanvasDimensions, setCanvasBackgroundImage, setShowImageOverlay} from "../redux/canvas/canavs.actions"
import { RootState } from "../redux/store"
import {loadImageFromURL} from "../utils/image.utils"
import PixelInput from "./PixelInput.component";

import { MEME_TEMPLATES, getTemplatePath } from "../data/templates"


const useCanvasLimiter = () => {
    const {width: maxWidth,height:maxHeight} = useSelector((state:RootState) => state.canvas.maxDimensions)
    
    // return maxWidht,maxHeight, size 

    // independent 
    const limit = (width: number, height: number) => {

        console.log(maxWidth, maxHeight)
        // check width
        if(width > maxWidth){
            height = (maxWidth / width) * height;
            width = maxWidth;          
        }
       
        // check height
        if(height > maxHeight){
            console.log("fix height")
            width = (maxHeight / height) * width;
            height = maxHeight;
        }

        return {
            width: Math.round(width),
            height: Math.round(height)
        }
    }

    

    return {limit, maxWidth, maxHeight}
}

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
                <div className="canvas-editor__bar">
                    <button className="canvas-editor__close" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="canvas-editor__settings">


                    <div className="form-input">
                        <label>Width: </label>
                        <PixelInput value={width} onChange={onWidthChange} disabled={!canEditDimensions} />
                    </div>
                    <div className="form-input">
                        <label>Height: </label>
                        <PixelInput value={height} onChange={onHeightChange} disabled={!canEditDimensions} />
                    </div>

                </div>

                <div className="canvas-editor__templates">
                    <div className="canvas-editor__template-search">
                        <input />
                    </div>
                    <div className="canvas-editor__template-list">
                        {MEME_TEMPLATES.map(template => {
                            const templatePath = getTemplatePath(template)

                            return (
                                <div
                                    className="canvas-editor__template"
                                    key={template.path}
                                    onClick={() => onImageClick(templatePath)}
                                    style={{ backgroundImage: `url('${templatePath}')` }} title={template.name || template.path}>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CanvasEditorOverlay;