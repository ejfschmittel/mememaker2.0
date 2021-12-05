import { combineReducers } from "redux";

import canvasObjects from "./canvasObjects/canvasObjects.reducer"
import canvas from "./canvas/canvas.reducer"

const rootReducer = combineReducers({
    canvasObjects,
    canvas,
})

export default rootReducer