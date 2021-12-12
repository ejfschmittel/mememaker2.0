import React, { useState } from 'react'
import "../styles/components/canvasTextCreator.styles.scss";
import RainbowButton from "./RainbowButton.component"
import { useDispatch } from 'react-redux';
import { createCanvasText } from "../redux/canvasObjects/canvasObjects.actions"


const CanvasTextCreator = () => {
    const [text, setText] = useState("")

    const dispatch = useDispatch()

    const createText = () => {
        dispatch(createCanvasText({
            text,
            x: 0,
            y: 0,
        }))
    }

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setText(newText)
    }

    return (
        <div className="text-creator">

            <div className="text-creator__input-container">
                <textarea className="text-creator__input" value={text} onChange={onChange} />
            </div>


            <RainbowButton className="rainbow-button--fullsize mt" onClick={createText}>
                Add Text
            </RainbowButton>

        </div>
    )
}

export default CanvasTextCreator