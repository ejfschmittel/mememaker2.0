import React from 'react'
import Input from "./Input.component"
import { useDispatch } from 'react-redux'
import {updateCanvasObject} from "../redux/canvasObjects/canvasObjects.actions"
import {CanvasObject, TextCanvasObject} from "../types/canvasObjects.types"

interface Props {
    activeObject: TextCanvasObject
}



const CanvasTextEditor = ({activeObject}: Props) => {
    const dispatch = useDispatch()

    const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const {name, value} = target;


        const parsed = parseInt(value) ? parseInt(value) : 0;

        dispatch(updateCanvasObject(activeObject.id, {
            [name]: parsed
        }))
        
    }

    const onColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const {name, value} = target;


     

        dispatch(updateCanvasObject(activeObject.id, {
            [name]: value
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
                <Input label="font size:" suffix="px" value={activeObject.fontSize} name="fontSize" onChange={onNumberChange} type="number"/>
            </div>

            <div className="editor__row">
                <Input label="color:" suffix="" type="color" value={activeObject.color} name="color" onChange={onColorChange}/>
            </div>

            <div className="editor__row">
                <Input label="border color:" suffix="" type="color" value={activeObject.borderColor} name="borderColor" onChange={onColorChange}/>
            </div>

            <div className="editor__row">
                <Input label="border width:" suffix="px" value={activeObject.borderWidth} name="borderWidth" onChange={onNumberChange}/>
            </div>
        
        </div>
    )
}

export default CanvasTextEditor