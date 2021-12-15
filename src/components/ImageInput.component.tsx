import React, {useState} from 'react'
import "../styles/components/imageInput.styles.scss"
import {FaImage} from "react-icons/fa"

interface Props {
    image?: HTMLImageElement,
    onChange?: any
    onDrop?: any
}


const ImageInput = ({image, onChange, onDrop}: Props) => {
    const src = image ? image.src : undefined;

    const [dragOver, setDragOver] = useState(false)

   
    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true)
    }

    const onDragExit = () => {
        setDragOver(false)
    }

    return (
        <label className="image-input"  onDrop={onDrop} onDragOver={onDragOver} onPointerOut={onDragExit} onDragLeave={onDragExit}>
            <input type="file" accept="image/*"   name="image" className="image-input__input" onChange={onChange}/>
            <div className={`image-input__background ${image ? "image-input__background--elevated": ""} ${dragOver ? "image-input__background--force-show": ""}`}>
                <div>
                  Chose or drop file
                </div>
                <FaImage />
            </div>
            <img className="image-input__img" src={src} />    
        </label>
    )
}

export default ImageInput