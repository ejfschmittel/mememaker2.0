import React from 'react'
import Input from "./Input.component"
import { useSelector, useDispatch } from 'react-redux';
import "../styles/components/canvasBackgroundSettings.styles.scss";
import {setCanvasDimensions, clearCanvasBackground, setCanvasBackgroundImage} from "../redux/canvas/canavs.actions"
import { RootState } from "../redux/store"
import {loadImage} from "../utils/image.utils"
import useCanvasLimiter from '../hooks/useCanvasLimiter';

const CanvasBackgroundSettings = () => {

    const dispatch = useDispatch()
    const {limit, maxWidth, maxHeight} = useCanvasLimiter()
    const { width, height } = useSelector((state: RootState) => state.canvas.dimensions)
    const backgroundImage = useSelector((state: RootState) => state.canvas.backgroundImage)

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

    const onClearCanvas = () => {
        dispatch(clearCanvasBackground())
    }

    const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("load image")
        const target = e.target as HTMLInputElement;
        if(target && target.files){
            const loadedImage = await loadImage(target.files[0]);
            const {width, height} = limit(loadedImage.width, loadedImage.height);
            dispatch(setCanvasBackgroundImage(loadedImage.src, width, height))
        }
    }



    return (
        <div className="canvas-settings">
            <div className={`canvas-settings__img-container ${backgroundImage ? "": "canvas-settings__img-container--clear"}`}>
                <img src={backgroundImage}/>
            </div>

            <div className="canvas-settings__controlls">
                <div className="canvas-settings__dimensions">
                    <Input suffix="px" label="width" value={width} onChange={onWidthChange} />
                    <Input suffix="px" label="height" value={height} onChange={onHeightChange} />
                </div>
                <div className="canvas-settings__buttons">
                    
                    <label className="canvas-settings__image-input">
                        Custom Image
                        <input type="file" accept="image/*"  name="image"  onChange={onImageChange}/>
                    </label>
                    <button className="canvas-settings__button" onClick={onClearCanvas}>Clear Backgorund</button>
                </div>
            </div>
        </div>
    )
}

export default CanvasBackgroundSettings