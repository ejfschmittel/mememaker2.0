import React, {useState} from "react"
import { useSelector } from "react-redux"
import {RootState} from "../redux/store"

const useCanvasLimiter = () => {
    const {width: maxWidth,height:maxHeight} = useSelector((state:RootState) => state.canvas.maxDimensions)
    
    // return maxWidht,maxHeight, size 

    // independent 
    const limit = (width: number, height: number) => {

        console.log(maxWidth, maxHeight)
        // check width
        if(width > maxWidth){
            height = (maxWidth / width) * height;
            width = maxWidth;          
        }
       
        // check height
        if(height > maxHeight){
            console.log("fix height")
            width = (maxHeight / height) * width;
            height = maxHeight;
        }

        return {
            width: Math.round(width),
            height: Math.round(height)
        }
    }

    

    return {limit, maxWidth, maxHeight}
}
export default useCanvasLimiter;