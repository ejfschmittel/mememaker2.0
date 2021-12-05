
import types from "./canvasObjects.types";

interface State {
    objects: {[key: string]: object},
    objectsList: string[],
    activeObject: string | null,
}

const initalState: State = {
    objects: {},
    objectsList: [],
    activeObject: null, // id
}

const canvasObjectReducer = (state=initalState, action:any) => {
    switch(action.type){
        case types.CREATE_CANVAS_OBJECT:
            console.log("create canvas object")
            console.log(state.objectsList)
            return {
                ...state,
                objects: {...state.objects, [action.canvasObject.id]: action.canvasObject},
                objectsList: [...state.objectsList, action.canvasObject.id],
                activeObject: action.canvasObject.id,
            };

        case types.SET_ACTIVE_OBJECT:
            return {
                ...state,
                activeObject: action.id
            }
        case types.UPDATE_CANVAS_OBJECT:
            return {
                ...state,
                objects: {
                    ...state.objects,
                    [action.id]: {
                        ...state.objects[action.id],
                        ...action.canvasObject,
                    }
                }
            }
        default:
            return state;
    }
}

export default canvasObjectReducer;


