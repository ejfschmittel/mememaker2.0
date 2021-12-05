import * as PIXI from "pixi.js";

import store from "../redux/store"
import TextObject from "./TextObject"
import {updateCanvasObject, setActiveObject} from "../redux/canvasObjects/canvasObjects.actions"

let app;
const displayObjects = {} 

export const DISPLAY_OBJECT_TYPES = {
    IMAGE_OBJECT: "IMAGE_OBJECT",
    TEXT_OBJECT: "TEXT_OBJECT"
}



export const createDisplayObject = (object) => {
   
    if(object && object.id && !displayObjectExists(object.id)){
        // create object 
        const displayObject = getNewDisplayObject(object);

        displayObject.interactive = true;
        displayObject.buttonMode = true;
        displayObject.zIndex = 5;

        const onClick = (event) => {
            console.log("on item click!!!")
            console.log(object.id)
            store.dispatch(setActiveObject(object.id))   
        } 

        displayObject    // events for drag start
        .on('mousedown', onClick)
        .on('touchstart', onClick)

        // add to stage
        app.stage.addChild(displayObject)

        displayObjects[object.id] = displayObject
        console.log(displayObjects)
        return displayObject
    }
    return null;
}


const getNewDisplayObject = (object) => {
    switch(object.type){
        case DISPLAY_OBJECT_TYPES.IMAGE_OBJECT:
            return createImageObject(object);
        case DISPLAY_OBJECT_TYPES.TEXT_OBJECT:
            const textObj = creatTextObject(object);
            
            return textObj
        default:
            return null;
    }
}


const createImageObject = () => {
    return null;
}

const creatTextObject = (object) =>  new TextObject(object)


const displayObjectExists = (id) => {
    return id in displayObjects
}

const getDisplayObject = (id) => {
    return displayObjectExists(id) ? displayObjects[id] : null;
}

const removeDisplayObject = (id) => {
    const objToDelete = getDisplayObject(id)
    if(objToDelete){
        app.stage.removeChild(objToDelete);
        displayObjects[id] = null
    }
}





const updateObjects = ({objects, objectsList, activeObject}) => {
    objectsList.forEach(objID => {
        console.log(objID)
        if(displayObjectExists(objID)){    
            const objSettings = objects[objID]
            const pixiElement = displayObjects[objID]
            pixiElement.update(objSettings);
        }
    });
}


const render = () => {
    const {canvasObjects} = store.getState();

    console.log(canvasObjects)
    // add new objects
   // addNewObjects(canvasObjects)

    // clear delete objects
    
    // update objects
    updateObjects(canvasObjects)

  
}


export const init = (container) => {
    if(app) return null; 

    app = new PIXI.Application({
        resizeTo: container, backgroundColor: 0xffffff, resolution: 1, preserveDrawingBuffer: true
    });

    container.appendChild(app.view)  
    app.stage.sortableChildren = true; 
   
    // init canvas objects
  

}

store.subscribe(render)



