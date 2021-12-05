import React, {useEffect, useRef} from 'react'
import ActiveObjectManipulator from './ActiveObjectManipulator.component';
import {init} from "../pixijs/App"


const CanvasArea = () => {
    const canvasContainer = useRef() as React.MutableRefObject<HTMLDivElement>;

    

    useEffect(() => {
        init(canvasContainer.current);
    }, [])

    console.log(canvasContainer.current)

    return (
        <div className="canvas-area" style={{height: "100%"}}>
            <div ref={canvasContainer}  style={{height: "100%", position:"relative", overflow: "hidden"}} >
                <ActiveObjectManipulator container={canvasContainer}/>
            </div>
        </div>
    )
}

export default CanvasArea;