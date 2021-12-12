

import types from "./canvas.types"


export const setCanvasDimensions = (width: number, height:number) => ({
    type: types.SET_CANVAS_DIMENSIONS,
    payload: {
        width,
        height
    }
})

export const setCanvasMaxDimensions = (maxWidth: number, naxHeight:number) => ({
    type: types.SET_CANVAS_DIMENSIONS,
    payload: {
        maxWidth,
        naxHeight
    }
})

export const setCanvasBackgroundImage = (image: string, width: number, height:number) => ({
    type: types.SET_BACKGROUND_IMAGE,
    payload: {
        image,
        width,
        height
    }
})

export const setShowImageOverlay = (show:boolean) => ({
    type: types.SET_SHOW_IMAGE_OVERLAY,
    payload: show
})

