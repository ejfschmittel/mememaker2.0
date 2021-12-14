import React, {useEffect, useRef, useLayoutEffect} from 'react'
import ActiveObjectManipulator from './ActiveObjectManipulator.component';
import {useDispatch, useSelector} from "react-redux"
import {init} from "../pixijs/App"
import {setCanvasDimensions, setCanvasMaxDimensions, triggerRerender} from "../redux/canvas/canavs.actions"

import {RootState} from "../redux/store"
import "../styles/components/canvasArea.styles.scss";

const CanvasArea = () => {
    const dispatch = useDispatch()
    const canvasContainer = useRef() as React.MutableRefObject<HTMLDivElement>;
    const canvasArea = useRef() as React.MutableRefObject<HTMLDivElement>;

    const {width, height } = useSelector((state: RootState) => state.canvas.dimensions)
    const maxDimensions = useSelector((state: RootState) => state.canvas.maxDimensions)

    useLayoutEffect(() => {
        function updateSize() {
            const bounds = canvasArea.current.getBoundingClientRect()
            dispatch(setCanvasMaxDimensions(Math.round(bounds.width), Math.round(bounds.height)));
            
        }
        window.addEventListener('resize', updateSize);
       
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
      }, [dispatch]);
    

    useEffect(() => {
        init(canvasContainer.current);
    }, [])

    
    return (
        <div ref={canvasArea} className="canvas-area" >
            <div ref={canvasContainer}  className="canvas-area__canvas" style={{width, height}}>
                <ActiveObjectManipulator container={canvasContainer}/>
            </div>
        </div>
    )
}

export default CanvasArea;