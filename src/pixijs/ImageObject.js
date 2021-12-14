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


        if(object.flipHorizontal){
            this.sprite.scale.x = Math.abs(this.sprite.scale.x) * -1; 
            this.sprite.anchor.x = 1;
        }else{
            this.sprite.scale.x = Math.abs(this.sprite.scale.x); 
            this.sprite.anchor.x = 0;
        }
      
        this.pivot.set(object.width / 2, object.height / 2)

       

    }  

    getWidth = () => this.sprite.width;
    getHeight = () => this.sprite.height;
}

export default ImageObject;