import * as PIXI from "pixi.js";

import store from "../redux/store"
import TextObject from "./TextObject"
import ImageObject from "./ImageObject";
import BackgroundImage from "./BackgroundImage"
import {updateCanvasObject, setActiveObject} from "../redux/canvasObjects/canvasObjects.actions"

export let app;
let background;
const displayObjects = {} 

export const DISPLAY_OBJECT_TYPES = {
    IMAGE_OBJECT: "IMAGE_OBJECT",
    TEXT_OBJECT: "TEXT_OBJECT"
}



export const createDisplayObject = async (object) => {
   
    if(object && object.id && !displayObjectExists(object.id)){
        // create object 
        const displayObject = await getNewDisplayObject(object);

        displayObject.interactive = true;
        displayObject.buttonMode = true;
        displayObject.zIndex = 5;

        displayObject.pivot.set(displayObject.width/2, displayObject.height/2)

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


const getNewDisplayObject = async (object) => {
    switch(object.type){
        case DISPLAY_OBJECT_TYPES.IMAGE_OBJECT:
            return createImageObject(object);
        case DISPLAY_OBJECT_TYPES.TEXT_OBJECT:  
            return await creatTextObject(object); 
        default:
            return null;
    }
}



const createImageObject = async (object) => {
    const imageObject = new ImageObject(object)
    await imageObject.hasLoaded();
    return imageObject;
}

const creatTextObject = async (object) => new TextObject(object)


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


const resizeCanvas = (width,height) => {
    app.view.width = width;
    app.view.height = height;
    console.log("resize canvas")
    app.renderer.resize(width,height);
    //app.renderer.resize(width, height);
}

const rerenderCanvasSize = () => {

}

/*
    fit dimensiosn of contianer
    have given width or height
    scale down 

*/

const removeObject = (id) => {
    const element = displayObjects[id]
    app.stage.removeChild(element)
    displayObjects[id] = null
}


export const render = () => {
    if(app) {
    const {canvasObjects, canvas} = store.getState();


    // resize canvas 
    const {dimensions} = canvas;
    resizeCanvas(dimensions.width, dimensions.height)

     // clear deleted objects = 
     Object.keys(canvasObjects.objects).map((id) => {
        const object = canvasObjects.objects[id];
        if(object.deleted) removeObject(id)
    })

    // update background image
    background.update(canvas)

    // add new objects
   // addNewObjects(canvasObjects)

    // clear delete objects
    
    // update objects
    updateObjects(canvasObjects)
    }
  
}


export const init = (container) => {
    if(app) return null; 

    app = new PIXI.Application({
       backgroundColor: 0xffffff, resolution: 1, preserveDrawingBuffer: true
    });

    

    container.appendChild(app.view)  
    app.stage.sortableChildren = true; 
   
    
    // create canvas background
    background = new BackgroundImage();
    app.stage.addChild(background)

}

store.subscribe(render)



