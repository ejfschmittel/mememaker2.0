
import types from "./canvas.types"

interface canvasState {
    dimensions: {
        width: number,
        height: number,
    },
    maxDimensions: {
        width: number,
        height: number
    }
    backgroundImage: string | null,
    showChoseBackgroundOverlay: boolean,    
}

const initalState:canvasState = {
    dimensions: {
        width: 600,
        height: 400,
    },
    maxDimensions: {
        width: 600,
        height: 400,
    },
    backgroundImage: null,
    showChoseBackgroundOverlay: true, 
}

const canvasReducer = (state=initalState, action:any) => {
  
    switch(action.type){

        
        case types.SET_CANVAS_DIMENSIONS: 
        
            return {...state, dimensions: action.payload }

        case types.SET_BACKGROUND_IMAGE:
            return {...state, dimensions: {width: action.payload.width, height: action.payload.height}, backgroundImage: action.payload.image, showChoseBackgroundOverlay: false}

        case types.SET_CANVAS_MAX_DIMENSIONS:
            return {...state, maxDimensions: action.payload }

        case types.SET_SHOW_IMAGE_OVERLAY:
            console.log("change show")
            return {...state, showChoseBackgroundOverlay: action.payload}
        
        default:
            return state;
    }
}

export default canvasReducer;