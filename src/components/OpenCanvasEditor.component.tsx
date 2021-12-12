import React from 'react'
import RainbowButton from './RainbowButton.component'
import { useDispatch } from 'react-redux'
import {setShowImageOverlay} from "../redux/canvas/canavs.actions"

const OpenCanvasEditorSection = () => {
    const dispatch = useDispatch()
    const onClick = () => {
        dispatch(setShowImageOverlay(true))
    }

    return (
    <div className="ui-panel p flex-center">
        <RainbowButton className="rainbow-button--fullsize" onClick={onClick}>
            Edit Background
        </RainbowButton>
    </div>
    )
}

export default OpenCanvasEditorSection