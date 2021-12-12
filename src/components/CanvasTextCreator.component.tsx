import React, { useState } from 'react'
import "../styles/components/canvasTextCreator.styles.scss";
import RainbowButton from "./RainbowButton.component"
import { useDispatch, useSelector} from 'react-redux';
import { createCanvasText } from "../redux/canvasObjects/canvasObjects.actions"
import { RootState } from '../redux/store';

const CanvasTextCreator = () => {
    const dispatch = useDispatch()
    const dimensions = useSelector((state: RootState) => state.canvas.dimensions)
    const [text, setText] = useState("")

    const createText = () => {
        dispatch(createCanvasText({
            text,
            x: Math.round(dimensions.width / 2),
            y: Math.round(dimensions.height / 2),
        }))
    }

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText)
    }

    return (
        <div className="text-creator">

            <div className="text-creator__input-container">
                <textarea className="text-creator__input" value={text} onChange={onChange} placeholder="Write Text..."/>
            </div>


            <RainbowButton className="rainbow-button--fullsize mt" onClick={createText}>
                Add Text
            </RainbowButton>

        </div>
    )
}

export default CanvasTextCreator