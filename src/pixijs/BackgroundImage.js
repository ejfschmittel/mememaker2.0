import DisplayObject from "./DisplayObject";


import * as PIXI from "pixi.js";



class BackgroundImage extends PIXI.Container{

    constructor(object){
        super(object);

        // create text
        this._sprite = null;
        this.sprite = null;
    }

    // update custom properties (includes width, height)
    update = (canvasData) => {
        console.log(canvasData)
        // set width of container
        this.width = canvasData.dimensions.width;
        this.height = canvasData.dimensions.height;

        // update sprite if changed
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

                this.sprite = PIXI.Sprite.from(url)
                this.sprite.width = canvasData.dimensions.width;
                this.sprite.width = canvasData.dimensions.height;
             
                this.addChild(this.sprite)

            }
            this._sprite = canvasData.backgroundImage;
        }
    }  

}

export default BackgroundImage;