import React from 'react'
import "../styles/components/imageInput.styles.scss"
import {FaImage} from "react-icons/fa"


const ImageInput = ({image, onChange}) => {
    const src = image ? image.src : null;

    return (
        <label className="image-input">
            <input type="file" accept="image/*"   name="image" className="image-input__input" onChange={onChange}  />
            <div className={`image-input__background ${image ? "image-input__background--elevated": ""}`}>
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