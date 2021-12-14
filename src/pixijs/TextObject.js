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

        this.mask = this.background;

        this.updateObject(object)
        
        this.addChild(this.background, this.text);
    }

     // update custom properties (includes width, height)
     updateObject = (object) => {

        // handle text dimensions
        this.text.style.wordWrap = true;
        this.text.style.wordWrapWidth = object.width;    
        this.background.width = object.width;
        this.background.height = object.height;

        // handle text styleing
        this.text.style.fill = object.color ? PIXI.utils.string2hex(object.color) : 0x000000;
        this.text.style.stroke = object.borderColor ? PIXI.utils.string2hex(object.borderColor) : 0x000000;
        this.text.style.strokeThickness = object?.borderWidth || 0;
        this.text.style.fontSize = object?.fontSize || 32;

        this.pivot.set(object.width / 2, object.height / 2)
     }   

   
}

export default TextObject;