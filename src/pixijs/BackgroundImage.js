import DisplayObject from "./DisplayObject";


import * as PIXI from "pixi.js";



class BackgroundImage extends PIXI.Container{

    constructor(object){
        super(object);

        // create text
        this._sprite = null;
        this.sprite = null;

        this.background = new PIXI.Graphics();
        this.background.beginFill(0xff0000);
        this.background.drawRect(0,0,600, 400);
        this.background.endFill()

        this.addChild(this.background)
    }

    // update custom properties (includes width, height)
    update = (canvasData) => {
         console.log(canvasData)
        // set width of container
        console.log("update background")
    
        this.background.width = canvasData.dimensions.width;
        this.background.height = canvasData.dimensions.height;

        console.log(this.background.height)

   
        if(canvasData.backgroundImage !== this._sprite){
           
            // load new sprite
            if(canvasData.backgroundImage === null){
                this.removeChild(this.sprite)
            }else{
                console.log("insert new sprite")
                // check if full url
                this.removeChild(this.sprite)
                this.sprite = null;
                const url = process.env.PUBLIC_URL + canvasData.backgroundImage

                console.log("sprite data")
                this.sprite = PIXI.Sprite.from(url)
                console.log(canvasData.dimensions.width, canvasData.dimensions.height )
          
                this.sprite.width = this.background.width;
                this.sprite.height = this.background.height;
        
             
                this.addChild(this.sprite)

            }
            this._sprite = canvasData.backgroundImage;
        }

       
 
       
    }  

}

export default BackgroundImage;