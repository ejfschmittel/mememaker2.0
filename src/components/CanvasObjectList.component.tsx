import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "../redux/store"
import { CanvasObject, TextCanvasObject, ImageCanvasObject } from '../types/canvasObjects.types'
import {DISPLAY_OBJECT_TYPES} from "../pixijs/App"
import {FaImage, FaCommentDots, FaTrash} from "react-icons/fa"
import "../styles/components/canvasObjectList.styles.scss"
import { deleteCanvasObject, setActiveObject } from '../redux/canvasObjects/canvasObjects.actions'

const CanvasObjectList = () => {
    const dispatch = useDispatch()

    
    const activeObj: any = useSelector((state: RootState) => state.canvasObjects.activeObject)
    const objects: Record<string, any> = useSelector((state: RootState) => state.canvasObjects.objects)
    const objectsList = useSelector((state: RootState) => state.canvasObjects.objectsList)


    
     

    return (
        <div className="ui-panel p canvas-object-list">
            { objectsList.map(objectKey => {
                const obj = objects[objectKey]
                return <CanvasObjectItem item={obj} key={obj.id} isActive={activeObj === obj.id}/>
            })}
        </div>
    )
}

type C = ImageCanvasObject | TextCanvasObject

interface ObjecItemProps {
    item: C,
    isActive: boolean
}



const CanvasObjectItem = ({item, isActive}: ObjecItemProps) => {
    const dispatch = useDispatch()

    const renderIcon = () => {
        switch(item.type){
            case DISPLAY_OBJECT_TYPES.TEXT_OBJECT:
                return <FaCommentDots />
            case DISPLAY_OBJECT_TYPES.IMAGE_OBJECT:
                return <FaImage />
            default: 
                return null;
        }
    }


    const renderItemContent = () => {
        switch(item.type){
            case DISPLAY_OBJECT_TYPES.TEXT_OBJECT:
                const castItem = item as TextCanvasObject;
                return castItem.text;
            case DISPLAY_OBJECT_TYPES.IMAGE_OBJECT:
               
                return null
            default: 
                return null;
        }
    }

    const onDeleteClick = (e: React.SyntheticEvent) => {
        e.stopPropagation()
        dispatch(deleteCanvasObject(item.id))
    }

    const onItemClick = (e: React.SyntheticEvent) => {
        dispatch(setActiveObject(item.id))
    }


    return (
        <div className={`canvas-item ${isActive ? 'canvas-item--active' : ''}`} onClick={onItemClick}>
            <div className="canvas-item__icon">
                {renderIcon()}
            </div>
            <div className="canvas-item__content">
                {renderItemContent()}
                
            </div>
            <div className="canvas-item__remove-btn" onClick={onDeleteClick}>
                <FaTrash />
            </div>
        </div>
    )
}

export default CanvasObjectList