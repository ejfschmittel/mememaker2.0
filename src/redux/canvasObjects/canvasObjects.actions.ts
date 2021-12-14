import types from "./canvasObjects.types"
import {CanvasObject, TextCanvasObject} from "../../types/canvasObjects.types"
import {createTextCanvasObject, createImageCanvasObject} from "../../pixijs/pixijs.utils"
import {createDisplayObject} from "../../pixijs/App"
import store, {AppDispatch, RootState} from "../store"

export const createCanvasObject = (canvasObject: CanvasObject) => {
    return {
        type: types.CREATE_CANVAS_OBJECT,
        canvasObject
    }
}




export const createCanvasText= (options: any) => async (dispatch:AppDispatch) => {
    const canvasTextOptions = createTextCanvasObject(options)
    const canvasText = await createDisplayObject(canvasTextOptions)


    console.log("create text")
    console.log(canvasText)
    
        

    // get width & height
    canvasTextOptions.width = canvasText?.getWidth() || 100;
    canvasTextOptions.height = canvasText?.getHeight() || 100; 

    console.log("canvasText width")
    console.log(canvasText?.getWidth())
 

    dispatch(createCanvasObject(canvasTextOptions))
}


interface Dimension {
    width: number,
    height: number
}


const limitWithFixedRatio = (dimensions:Dimension, maxDimensions: Dimension) => {
    let width = dimensions.width;
    let height = dimensions.height;
    if(width > maxDimensions.width){
        height = (maxDimensions.width / width) * height;
        width = maxDimensions.width; 
    }

    if(height > maxDimensions.height){
        width = (maxDimensions.height / height) * width;
        height = maxDimensions.height; 
    }

    return {
        width, 
        height
    }
}

export const createCanvasImage = (options: any) => async (dispatch:AppDispatch) => {
    const canvasImageOptions = createImageCanvasObject(options)
    const canvasImage = await createDisplayObject(canvasImageOptions)


    const imageWidth = canvasImage?.getWidth() || 100;
    const imageHeight = canvasImage?.getHeight() ||   100; 

    // scale image down?
    const state = store.getState();
    const maxDimensions = state.canvas.dimensions;
    const {width, height} = limitWithFixedRatio({width: imageWidth, height: imageHeight},{width: maxDimensions.width /2, height: maxDimensions.height/2})

    console.log(width, height)

    canvasImageOptions.width = width;
    canvasImageOptions.height = height

    dispatch(createCanvasObject(canvasImageOptions))
}

export const deleteCanvasObject = (id: string) => {
    return {
        type: types.DELETE_CANVAS_OBJECT,
        payload: id,
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

