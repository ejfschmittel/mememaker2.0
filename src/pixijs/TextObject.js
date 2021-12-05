import * as PIXI from "pixi.js";
import DisplayObject from "./DisplayObject";

class TextObject extends DisplayObject{

    constructor(object){
        super(object);
        this.textContent = object.text;


        
        this.text = new PIXI.Text(this.textContent);
        this.background = new PIXI.Graphics();
        this.background.beginFill(0xff0000);
        this.background.drawRect(0,0,this.text.width, this.text.height);
        this.background.endFill()

        this.addChild(this.background, this.text);
    }

     // update custom properties (includes width, height)
     updateObject = (object) => {
    
     }   
}

export default TextObject;