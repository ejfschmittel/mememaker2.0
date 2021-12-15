import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import "../styles/components/activeObjectMainpulator.styles.scss";
import { updateCanvasObject } from "../redux/canvasObjects/canvasObjects.actions"
import { RootState } from "../redux/store"
import { getLineAndCharacterOfPosition } from 'typescript';
import {DISPLAY_OBJECT_TYPES} from "../pixijs/App"


interface Props {
    container: React.MutableRefObject<HTMLDivElement> | null
}


const PADDING = 20;

const HANDLE_SIZE = 14;

const ActiveObjectManipulator = ({ container }: Props) => {
    const dispatch = useDispatch()
    const [dragging, setDragging] = useState(false)
    const [startCoords, setStartCoords] = useState({
        x: 0,
        y: 0,
    })
    const activeObject: any = useSelector((state: RootState) => state.canvasObjects.activeObject)
    const objects: Record<string, any> = useSelector((state: RootState) => state.canvasObjects.objects)
    const activeObj = activeObject && activeObject in objects ? objects[activeObject] : null;




    useEffect(() => {
        document.addEventListener("mousemove", onMouseMove, false);
        return () => document.removeEventListener("mousemove", onMouseMove, false);
    }, [dragging, container, activeObj]);

    const clamp = (num: number, min: number, max: number): number => Math.min(Math.max(num, min), max)

    const onMouseMove = (e: MouseEvent) => {

        if (dragging && container) {
            const bounds = container.current.getBoundingClientRect();

            const correctedX = e.clientX - bounds.x - startCoords.x;
            const correctedY = e.clientY - bounds.y - startCoords.y;

            const clampedX = clamp(correctedX, 0 , bounds.width );
            const clampedY = clamp(correctedY, 0 , bounds.height );

            dispatch(updateCanvasObject(activeObject, {
                x: clampedX,
                y: clampedY,
            }))
        }
    }

    const onDragStart = (e: React.MouseEvent) => {
    
        if (container) {
            const bounds = container.current.getBoundingClientRect();

            const xOffset = e.clientX - bounds.x - activeObj.x;
            const yOffset = e.clientY - bounds.y - activeObj.y;
            setStartCoords({
                x: xOffset,
                y: yOffset
            })
            setDragging(true)
        }
    }

    const onDragFinish = (e: React.MouseEvent) => {
        setDragging(false)
    }


    const cancelDrag = (e: React.MouseEvent) => {
        e.preventDefault()
    }


    return (
        <div className="active-object" style={{
            display: activeObj ? "block" : "none",
            top: activeObject ? `${activeObj.y - (PADDING / 2) - activeObj.height / 2}px` : 0,
            left: activeObject ? `${activeObj.x - (PADDING / 2) - activeObj.width / 2}px` : 0,
            width: activeObj ? `${activeObj.width + PADDING}px` : 100,
            height: activeObj ? `${activeObj.height + PADDING}px` : 100,
            transformOrigin: "center center",
            transform: `rotate(${activeObj?.rotation || 0}rad)`
        }}

        >

            <div className="active-object__content"
                onDragEnter={cancelDrag}
                onDragEnd={cancelDrag}
                onPointerDown={onDragStart}
                onDragOver={onDragStart}
                onDragLeave={cancelDrag}
                onPointerUp={onDragFinish}
            ></div>


            <DragHandle x={0} y={0} size={HANDLE_SIZE} cursor="nw-resize" container={container} activeObject={activeObj} />
            <DragHandle x={.5} y={0} size={HANDLE_SIZE} cursor="n-resize" container={container} activeObject={activeObj} />
            <DragHandle x={1} y={0} size={HANDLE_SIZE} cursor="ne-resize" container={container} activeObject={activeObj} />
            <DragHandle x={1} y={.5} size={HANDLE_SIZE} cursor="e-resize" container={container} activeObject={activeObj} />
            <DragHandle x={1} y={1} size={HANDLE_SIZE} cursor="se-resize" container={container} activeObject={activeObj} />
            <DragHandle x={.5} y={1} size={HANDLE_SIZE} cursor="s-resize" container={container} activeObject={activeObj} />
            <DragHandle x={0} y={1} size={HANDLE_SIZE} cursor="sw-resize" container={container} activeObject={activeObj} />
            <DragHandle x={0} y={.5} size={HANDLE_SIZE} cursor="w-resize" container={container} activeObject={activeObj} />


            <RotationHandle activeObject={activeObj} container={container}/>


        </div>
    )
}


interface RotationHandleProps {
    container: React.MutableRefObject<HTMLDivElement> | null,
    activeObject: any
}


const RotationHandle = ({activeObject, container}: RotationHandleProps) => {
    const dispatch = useDispatch()
    const [dragging, setDragging] = useState(false)

    useEffect(() => {
        document.addEventListener("mousemove", onMouseMove, false);
        return () => document.removeEventListener("mousemove", onMouseMove, false);
    }, [dragging]);

    useEffect(() => {
        document.addEventListener("mouseup", dragEnd, false);
        return () => document.removeEventListener("mouseup", dragEnd, false);
    }, [dragging]);


    const onMouseMove = (e: MouseEvent) => {
        if(dragging && container){
            // mouse pos
            const bounds = container.current.getBoundingClientRect();
            const mouseX = e.clientX - bounds.x;
            const mouseY = e.clientY - bounds.y;

            //const rad = Math.atan2( activeObject.y - mouseY,  activeObject.x - mouseX)
            const rad = Math.atan2(  mouseY - activeObject.y, mouseX - activeObject.x) + Math.PI / 2 

           dispatch(updateCanvasObject(activeObject.id, {
               rotation: rad
           }))
        }
    }
    
    const onDragStart = (e: React.MouseEvent) => {
      
        setDragging(true)
        document.body.style.cursor = "grabbing" 
    }

    const dragEnd = (e: MouseEvent) => {
      
        setDragging(false)
        document.body.style.cursor = "default" 
    }

    return (
        <div 
        className="active-object__rotation-handle"
        onPointerDown={onDragStart} 
        style={{
            backgroundColor: dragging ? "red" : "#fff"
        }}
         ></div>
    )
}

interface DragHandleProps {
    x: number,
    y: number,
    cursor?: string,
    size: number,
    container: React.MutableRefObject<HTMLDivElement> | null,
    activeObject: any
}



const DragHandle = ({ x, y, cursor, size, container, activeObject }: DragHandleProps) => {
    const [dragging, setDragging] = useState(false)
    const dispatch = useDispatch()

    const onDragStart = () => {
        setDragging(true)
    }


    useEffect(() => {
        document.addEventListener("mousemove", onMouseMove, false);
        return () => document.removeEventListener("mousemove", onMouseMove, false);
    }, [dragging]);

    useEffect(() => {
        document.addEventListener("mouseup", dragEnd, false);
        return () => document.removeEventListener("mouseup", dragEnd, false);
    }, [dragging]);

    const dragEnd = () => {
        setDragging(false)
    }

    const onMouseMove = (e: MouseEvent) => {
        if (dragging && container) {

            // mouse pos
            const bounds = container.current.getBoundingClientRect();
            const mouseX = e.clientX - bounds.x;
            const mouseY = e.clientY - bounds.y;

            // rect point
            const dragX = activeObject.x + activeObject.width * x;
            const dragY = activeObject.y + activeObject.height * y;

            // anchor point
            const anchorX = activeObject.x  - activeObject.width / 2 + activeObject.width * (1 - x)
            const anchorY = activeObject.y - activeObject.height / 2 + activeObject.height * (1 - y)

            // 

            // y = 0 => -1 * 100 + 200 => 100
            const m = (num: number) => num == 1 ? 1 : -1;

            // todo: calculate widht based on height to lock sides
            const newHeight = y !== .5 ? Math.max(m(y) * mouseY - m(y) * anchorY, 30) : activeObject.height;

            // resize function for open resize
            const freeNewWidth = x !== .5 ? Math.max(m(x) * mouseX - m(x) * anchorX, 30) : activeObject.width;

            // (newHeight / activeObject.height) activeObject.width 
            const lockedNewWidth = x !== .5 ? (newHeight / activeObject.height) * activeObject.width: activeObject.width;

            let newWidth = y == .5 ? freeNewWidth : lockedNewWidth;
            if(activeObject.type == DISPLAY_OBJECT_TYPES.TEXT_OBJECT) newWidth = freeNewWidth;


            console.log(anchorX, anchorY)
            const newY = y !== .5 ? anchorY + m(y) * newHeight/2 : activeObject.y;
            const newX = x !== .5 ? anchorX + m(x) * newWidth /2: activeObject.x;

            dispatch(updateCanvasObject(activeObject.id, {
                x: newX,
                y: newY,
                width: newWidth,
                height: newHeight,
            }))
        }
    }

    const cancelDrag = (e: React.MouseEvent) => e.preventDefault()

    const offset = (-size / 2) - 1;

    return (
        <div className="active-object__handle"
            onPointerDown={onDragStart}
            onDragEnter={cancelDrag}
            onDragOver={cancelDrag}
            onDragEnd={cancelDrag}
            onDragLeave={cancelDrag}
            onPointerUp={dragEnd}
    
            style={{
                width: size,
                height: size,
                cursor: cursor ? cursor : "pointer",
                top: y == 0 ? offset : y == .5 ? `50%` : undefined,
                left: x == 0 ? offset : x == .5 ? `50%` : undefined,
                bottom: y == 1 ? offset : undefined,
                right: x == 1 ? offset : undefined,
                transform: x === .5 ? `translate(-50%, 0)` : y === .5 ? 'translate(0,-50%)' : undefined
            }}
        ></div>
    )
}

export default ActiveObjectManipulator;


/*

top-right: scale width & height + update y
top-left: scale widht & height + update y + x

fixpoint (top-right => bottom-left) => {100, 100}

fixpoint + point => line

dragpoint => mouse => closeset to line (orthogonale)



- dragpoint
- anchor point (opposite of dragpoint)
- mouse position ()
- line point (closest to mouse position)

- clamp minsize (width,height) => 20, 20


- dragpoint (0, .5)
- oppositie (0, .5) => (1 - 0), 1 - .5) => 1 .5



=> calc widht , height (distance line point => anchor point)
=> clamp minsize (20,20???)
=> calc x,y =>
    - .5 => keep
    - 0 => -y - x
    - 1 => keep


<DragHandle x=1 y=1 />

*/