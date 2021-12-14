import React, { useState, useEffect } from 'react'
import "../styles/components/canvasImageCreator.styles.scss";
import RainbowButton from "./RainbowButton.component"
import { useDispatch, useSelector } from 'react-redux';
import { createCanvasImage } from "../redux/canvasObjects/canvasObjects.actions"
import {loadImage} from "../utils/image.utils"
import { RootState } from '../redux/store';
import useFaceExtractor from "../hooks/useFaceExtractor"
import TimeSinceDisplay from "./TimeSinceDisplay.component"


import ImageInput from './ImageInput.component';




const CanvasTextCreator = () => {
    const dispatch = useDispatch()
    
    const dimensions = useSelector((state: RootState) => state.canvas.dimensions)
    const [image, setImage] = useState<HTMLImageElement | undefined>(undefined)
    
    const {canvasRef, status, extractedFaces, extractFaces} = useFaceExtractor();


   

    const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("load image")
        const target = e.target as HTMLInputElement;
        if(target && target.files){
            const loadedImage = await loadImage(target.files[0]);
            console.log(loadedImage)
            setImage(loadedImage)
        }
    }


 
 
    const onAddImage = async () => {
        if(image){
            dispatch(createCanvasImage({
                src: image.src,
                x: Math.round(dimensions.width / 2),
                y: Math.round(dimensions.height / 2),
            }))
        }
    }

    const onExtractFaces = async () => {
        if(image){
            extractFaces(image);
        }
    }


    const onAddFaceImage = async (b: Blob, url: string) => {

        dispatch(createCanvasImage({
            src: url,
            x: Math.round(dimensions.width / 2),
            y: Math.round(dimensions.height / 2),
        }))
    }

    return (
        <div className="image-creator">

            <ImageInput image={image} onChange={onImageChange} />


            <RainbowButton className="rainbow-button--fullsize mt" onClick={onAddImage} disabled={!image}>
                Add Image
            </RainbowButton>

            <RainbowButton className="rainbow-button--fullsize mt" onClick={onExtractFaces} disabled={!image}>
                Extract Faces
            </RainbowButton>

           

            <div className="image-creator__face-extractor">
                <div className="image-creator__status">
                    
                    <TimeSinceDisplay className="image-creator__time" startDate={status.time}/>
                    <div>{status.message}</div>
                </div>
                <div className="image-creator__face-list">
                    {extractedFaces.map((b: Blob) => {

                        const url = window.URL.createObjectURL(b);

                        return (
                            <div className="image-creator__face-item" onClick={() => onAddFaceImage(b, url)}>
                               <img src={url} />
                            </div>
                        )
                    })}
                </div>
            </div>

            <canvas ref={canvasRef} className="image-creator__canvas"></canvas>

            

        </div>
    )
}

export default CanvasTextCreator