import React, {useState, useEffect, useRef} from "react"

import * as tfjs from '@tensorflow/tfjs';
import * as bodyPix from "@tensorflow-models/body-pix"
import * as blazeface from "@tensorflow-models/blazeface"
import * as tfjsWasm from '@tensorflow/tfjs-backend-wasm';
import {canvasToBlob} from "../utils/image.utils"
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';

let blazefaceModel: any = null;
let bodyPixModel: any = null;


interface Status {
    message: string,
    time: Date | null,
    isLoading: boolean
}

interface CustomBlob extends Blob{
    width?: number,
    height?: number,
    name?: string,
}

const useFaceExtractor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [extractedFaces, setExtractedFaces] = useState<CustomBlob[]>([])

    const [status, setStatus] = useState<Status>({
        message: "",
        time: null,
        isLoading: false
    })


    const loadModels = async () => {
        // load async ??? sepertly ???
        setStatusMessage("loading models")
        console.log("loading models...")
        if(!blazefaceModel) blazefaceModel = await blazeface.load();
        if(!bodyPixModel) bodyPixModel = await bodyPix.load({         
            architecture: 'MobileNetV1',
            outputStride: 8,
            quantBytes: 4
        });
    
    }

    const setStatusMessage = (message: string) => {
        setStatus({
            message,
            time: message ? new Date() : null,
            isLoading: !!message
        })
    }

    

    const extractFaces = async (image: HTMLImageElement) => {
        // check if loading
        await loadModels()
        // extract faces
        const faces = await extractFaceFromImage(image)
        setExtractedFaces(faces)
        setStatusMessage("")
    }

    const extractFaceFromImage = async (image: HTMLImageElement): Promise<CustomBlob[]> => {
        if(!canvasRef.current) return [];
        console.log("extract Faces")
        setStatusMessage("searching for faces")
        const predictedFaceDimensions = await predictFaces(image)

        setStatusMessage("x faces found")

        const faceImages = []
        for(let i = 0; i < predictedFaceDimensions.length; i++){

            setStatusMessage("extracting face x")
            // crop image
            await cropFace(canvasRef.current, image, predictedFaceDimensions[i])
            
            // remove background
            await segmentFace(canvasRef.current)

            const faceImage = await canvasToBlob(canvasRef.current) as CustomBlob;
            faceImage.name =  `${image.name.split(".")[0]}-f-${i}.png`;
            faceImage.width =  canvasRef.current.width;
            faceImage.height =   canvasRef.current.height;
            faceImages.push(faceImage)
        }

        return faceImages;
    }

    const cropFace = async (canvas: HTMLCanvasElement, image:any, predictions:any) => {
        canvas.width = predictions.width;
        canvas.height = predictions.height;

        const x = predictions.x ;
        const y = predictions.y ;
        const width = predictions.width;
        const height = predictions.height;
        
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;   
        ctx.drawImage(image, x,y , width, height, 0, 0, canvas.width,  canvas.height)
    }

    const predictFaces = async (image: any) => {
        const returnTensors = false; // Pass in `true` to get tensors back, rather than values.
        const predictions = await blazefaceModel.estimateFaces(image, returnTensors);

        const predictionDimensions = []
        if (predictions.length > 0) {
            for (let i = 0; i < predictions.length; i++) {
                const start = predictions[i].topLeft;
                const end = predictions[i].bottomRight;
                const size = [end[0] - start[0], end[1] - start[1]];

                const startY = Math.max(start[1] - (size[1] / 1.3), 0)
                const startX = Math.max(start[0] - (size[0] / 4), 0)
                    
                predictionDimensions.push({
                    x: startX,
                    y: startY,
                    width:size[0] * 1.5,
                    height:size[1] * 1.7,
                })
            }
        }
        return predictionDimensions;
    }



    const segmentFace = async (canvas: HTMLCanvasElement) => {
        const { data:map } = await bodyPixModel.segmentPerson(canvas);
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        const { data:imgData } = ctx.getImageData(0, 0, canvas.width, canvas.height);

       
        const newImg = ctx.createImageData(canvas.width, canvas.height);
        const newImgData = newImg.data;

        for(let i=0; i<map.length; i++) {
            //The data array stores four values for each pixel
            const [r, g, b, a] = [imgData[i*4], imgData[i*4+1], imgData[i*4+2], imgData[i*4+3]];
            [
              newImgData[i*4],
              newImgData[i*4+1],
              newImgData[i*4+2],
              newImgData[i*4+3]
            ] = !map[i] ? [255, 255, 255, 0] : [r, g, b, a];
        }


        ctx.putImageData(newImg, 0, 0);
  
    }

    return {
        extractFaces,
        extractedFaces,
        canvasRef,
        status,
    }
}

export default useFaceExtractor