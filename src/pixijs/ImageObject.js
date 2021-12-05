import * as PIXI from "pixi.js";
import DisplayObject from "./DisplayObject";


class ImageObject extends DisplayObject{

    constructor(object){
        super(object);

        // create text
        this.text = new PIXI.Text(this.textContent);

        // create background
        this.background = new PIXI.Graphics();
        this.background.beginFill(0xff0000);
        this.background.drawRect(0,0,this.text.width, this.text.height);
        this.background.endFill()

        // add background and text to container
        this.addChild(this.background, this.text);

        // mask
        this.mask = this.background;
    }

    // update custom properties (includes width, height)
    updateObject = (object) => {

    }  
}

export default ImageObject;