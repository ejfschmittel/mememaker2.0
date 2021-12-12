import React, { useState } from 'react'
import "../styles/components/canvasTextCreator.styles.scss";
import RainbowButton from "./RainbowButton.component"
import { useDispatch } from 'react-redux';
import { createCanvasImage } from "../redux/canvasObjects/canvasObjects.actions"
import {loadImage} from "../utils/image.utils"

import ImageInput from './ImageInput.component';
const CanvasTextCreator = () => {
    const dispatch = useDispatch()
    const [image, setImage] = useState<HTMLImageElement | null>(null)
    
   

    const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("load image")
        const target = e.target as HTMLInputElement;
        if(target && target.files){
            const loadedImage = await loadImage(target.files[0]);
            console.log(loadedImage)
            setImage(loadedImage)
        }
    }


 
 
    const onAddImage = () => {
        if(image){
            dispatch(createCanvasImage({
                src: image.src,
            }))
        }
    }

    return (
        <div className="image-creator">

            <ImageInput image={image} onChange={onImageChange} />


            <RainbowButton className="rainbow-button--fullsize mt" onClick={onAddImage} disabled={!image}>
                Add Image
            </RainbowButton>

        </div>
    )
}

export default CanvasTextCreator