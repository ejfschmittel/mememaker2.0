import types from "./canvasObjects.types"
import {CanvasObject} from "../../types/canvasObjects.types"
import {createTextCanvasObject, createImageCanvasObject} from "../../pixijs/pixijs.utils"
import {createDisplayObject} from "../../pixijs/App"
import {AppDispatch} from "../store"

export const createCanvasObject = (canvasObject: CanvasObject) => {
    return {
        type: types.CREATE_CANVAS_OBJECT,
        canvasObject
    }
}




export const createCanvasText= (options: any) => async (dispatch:AppDispatch) => {
    const canvasTextOptions = createTextCanvasObject(options)
    const canvasText = await createDisplayObject(canvasTextOptions)

    // get width & height
    canvasTextOptions.width = canvasText?.getWidth() || 100;
    canvasTextOptions.height = canvasText?.getHeight() || 100; 

    dispatch(createCanvasObject(canvasTextOptions))
}

export const createCanvasImage = (options: any) => async (dispatch:AppDispatch) => {
    const canvasImageOptions = createImageCanvasObject(options)
    const canvasImage = await createDisplayObject(canvasImageOptions)

    console.log("sadfasdf")
    console.log(canvasImage)

    // get width & height
    canvasImageOptions.width = canvasImage?.getWidth() || 100;
    canvasImageOptions.height = canvasImage?.getHeight() ||   100; 

    dispatch(createCanvasObject(canvasImageOptions))
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

