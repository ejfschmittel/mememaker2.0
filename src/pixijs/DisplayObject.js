import * as PIXI from "pixi.js";
import { getTextOfJSDocComment } from "typescript";


class DisplayObject extends PIXI.Container{

    constructor(object){
        super();
        this.object = object;
        this.cachedObject = JSON.stringify(this.object)

        this.x = object.x ? object.x : 0;
        this.y = object.y ? object.y : 0;
    }

    setObjectData = (object) => {
        this.object = object;
        this.cachedObject = JSON.stringify(this.object)
    }


    shouldUpdate = (newObject) => {
        return JSON.stringify(newObject) !== this.cachedObject
    }

    getData = () => this.object
    
 
    update = (object) => {
        if(!this.shouldUpdate(object)) return;

        this.setObjectData(object);
        this.updateBaseProperties(object)
        this.updateObject(object)
    }

    // update x, y and rotation (check update)
    updateBaseProperties = (object) => {

        this.x = object.x;
        this.y = object.y;
    }

    updateObject = (object) => {}

    getWidth = () => this.width;
    getHeight = () => this.height;
}

export default DisplayObject;