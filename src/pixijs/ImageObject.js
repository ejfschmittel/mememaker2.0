import * as PIXI from "pixi.js";
import DisplayObject from "./DisplayObject";
import store from "../redux/store"
import { updateCanvasObject } from "../redux/canvasObjects/canvasObjects.actions";



class ImageObject extends DisplayObject{

    constructor(object){
        super(object);

        // create text
        this.sprite = PIXI.Sprite.from(object.src)
        this.addChild(this.sprite);

   
    }



    hasLoaded = () =>  new Promise((res,rej) => {
        const timeout = 20;
        const maxCounts = 30;
        let count = 0;
       
        const intervalHandle = setInterval(() => {
            console.log(this.sprite.width)
            if(this.sprite.width !== 1){
                clearInterval(intervalHandle);
                res();
            }
            if(count >= maxCounts){
                clearInterval(intervalHandle);
                rej();
            }
            count++;
        }, timeout)
    })


    


    // update custom properties (includes width, height)
    updateObject = (object) => {
        this.sprite.width = object.width;
        this.sprite.height = object.height;
    }  

    getWidth = () => this.sprite.width;
    getHeight = () => this.sprite.height;
}

export default ImageObject;