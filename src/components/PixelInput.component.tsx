import React from 'react'
import "../styles/components/pixelInput.styles.scss";


type onChange = (e: React.FormEvent<HTMLInputElement>) => any;

interface Props{
    value: number,
    onChange: onChange,
    disabled?: boolean
}

const PixelInput = ({value, onChange, disabled}: Props) => {
    return (
        <div className={`pixel-input ${disabled ? "pixel-input--disabled": ""}`}>
            <input type="" className="pixel-input__input" value={value} onChange={onChange} disabled={disabled}/>
            px
        </div>
    )
}

export default PixelInput;