import types from "./canvasObjects.types"
import {CanvasObject} from "../../types/canvasObjects.types"
import {createTextCanvasObject} from "../../pixijs/pixijs.utils"
import {createDisplayObject} from "../../pixijs/App"


export const createCanvasObject = (canvasObject: CanvasObject) => {
    return {
        type: types.CREATE_CANVAS_OBJECT,
        canvasObject
    }
}


export const createCanvasText= (options: any) => {
    const canvasTextOptions = createTextCanvasObject(options)
    const canvasText = createDisplayObject(canvasTextOptions)

    // get width & height
    canvasTextOptions.width = canvasText?.getWidth() || 100;
    canvasTextOptions.height = canvasText?.getHeight() || 100; 

    return createCanvasObject(canvasTextOptions)
}

export const deleteCanvasObject = (id: string) => {
    return {
        type: types.DELETE_CANVAS_OBJECT,
        id,
    }
}

export const setActiveObject = (id: string) => {
    return {
        type: types.SET_ACTIVE_OBJECT,
        id,
    }
}

export const updateCanvasObject = (id: string, canvasObject: any) => {
    return {
        type: types.UPDATE_CANVAS_OBJECT,
        id,
        canvasObject,
    }
}

