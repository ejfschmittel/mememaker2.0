import React from 'react'
import Input from "./Input.component"
import { useSelector, useDispatch } from 'react-redux';
import "../styles/components/canvasBackgroundSettings.styles.scss";
import {setCanvasDimensions} from "../redux/canvas/canavs.actions"
import { RootState } from "../redux/store"

const CanvasBackgroundSettings = () => {

    const dispatch = useDispatch()
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
                        <input type="file" accept="image/*"  name="image"  />
                    </label>
                    <button className="canvas-settings__button">Clear Backgorund</button>
                </div>
            </div>
        </div>
    )
}

export default CanvasBackgroundSettings