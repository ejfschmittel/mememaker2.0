import {CanvasObject, CanvasObjectBase, ImageCanvasObject, TextCanvasObject} from "../types/canvasObjects.types"
import {v4 as uuid} from "uuid"
import {DISPLAY_OBJECT_TYPES} from "./App"

export const createTextCanvasObject = (object:any): TextCanvasObject => {

    // defaults
    const textObjectOptions = {
        fontSize: 32,
        color: "#ffffff",
        boderColor: "#000000",
        borderWidth: 3,
        wordWrap: true,
        x: 0,
        y: 0,
        flipVertical: false,
        flipHorizontal: false,
        rotation: 0,
        ...object,
        id: uuid(),
        type: DISPLAY_OBJECT_TYPES.TEXT_OBJECT
    }

    

    return textObjectOptions as TextCanvasObject;
}

export const createImageCanvasObject = (object:any): ImageCanvasObject => {

    // defaults
    const textObjectOptions = {
        width: 100,
        height: 100,
        flipVertical: false,
        flipHorizontal: false,
        image: "",
        x: 0,
        y: 0,
        rotation: 0,
        ...object,    
        id: uuid(),
        type: DISPLAY_OBJECT_TYPES.IMAGE_OBJECT,
    }

    return textObjectOptions as ImageCanvasObject;
}