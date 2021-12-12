import React from 'react'
import { useDispatch } from 'react-redux';
import {setShowImageOverlay} from "../redux/canvas/canavs.actions"

const Menu = () => {
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(setShowImageOverlay(true))
    }

    return (
        <div>
            <button onClick={onClick}>Open</button>
        </div>
    )
}

export default Menu;