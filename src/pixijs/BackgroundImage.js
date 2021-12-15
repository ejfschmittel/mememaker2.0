import DisplayObject from "./DisplayObject";


import * as PIXI from "pixi.js";



class BackgroundImage extends PIXI.Container{

    constructor(object){
        super(object);

        // create text
        this._sprite = null;
        this.sprite = null;

        this.background = new PIXI.Graphics();
        this.background.beginFill(0xffffff);
        this.background.drawRect(0,0,600, 400);
        this.background.endFill()

        this.addChild(this.background)
    }

    // update custom properties (includes width, height)
    update = (canvasData) => {
  
    
        this.background.width = canvasData.dimensions.width;
        this.background.height = canvasData.dimensions.height;

   
        if(canvasData.backgroundImage !== this._sprite){
           
            // load new sprite
            if(canvasData.backgroundImage === null){
                this.removeChild(this.sprite)
            }else{

                // check if full url
                this.removeChild(this.sprite)
                this.sprite = null;
                const url = process.env.PUBLIC_URL + canvasData.backgroundImage

                this.sprite = PIXI.Sprite.from(url)
         
                this.sprite.width = this.background.width;
                this.sprite.height = this.background.height;
        
             
                this.addChild(this.sprite)

            }
            this._sprite = canvasData.backgroundImage;
        }

       
 
       
    }  

}

export default BackgroundImage;