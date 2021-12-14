import React from 'react'
import Input from "./Input.component"
import { useDispatch } from 'react-redux'
import {updateCanvasObject} from "../redux/canvasObjects/canvasObjects.actions"
import {CanvasObject, ImageCanvasObject} from "../types/canvasObjects.types"

interface Props {
    activeObject: ImageCanvasObject
}



const CanvasImageEditor = ({activeObject}: Props) => {
    const dispatch = useDispatch()

    const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const {name, value} = target;


        const parsed = parseInt(value) ? parseInt(value) : 0;

        dispatch(updateCanvasObject(activeObject.id, {
            [name]: parsed
        }))
        
    }

    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("flip")
        const {name, value, checked} = e.target as HTMLInputElement;
       

        dispatch(updateCanvasObject(activeObject.id, {
            [name]: checked
        }))
        
        
    }

    return (
        <div className="editor">
            <div className="editor__row">
                <Input label="x:" suffix="px" value={Math.round(activeObject.x)} name="x" onChange={onNumberChange}/>
                <Input label="y:" suffix="px" value={Math.round(activeObject.y)} name="y" onChange={onNumberChange}/>
            </div>

            <div className="editor__row">
                <Input label="width:" suffix="px" value={Math.round(activeObject.width)} name="width" onChange={onNumberChange}/>
                <Input label="height:" suffix="px" value={Math.round(activeObject.height)} name="height" onChange={onNumberChange}/>
            </div>

            <div className="editor__row">
                <Input label="rotation:" suffix="px" value={activeObject.rotation} name="rotation" onChange={onNumberChange} type="number"/>
            </div>

            <div className="editor__row">
                <Input label="flip:" suffix="" value={activeObject.flipHorizontal} name="flipHorizontal" onChange={onCheckboxChange} type="checkbox"/>
            </div>

         
        
        </div>
    )
}

export default CanvasImageEditor