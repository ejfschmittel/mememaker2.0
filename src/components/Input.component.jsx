import React from 'react'
import "../styles/components/input.styles.scss"

const Input = ({label, suffix, ...props}) => {
    return (
        <div className="input">
            <label className="input__label">{label}</label>
            <input className="input__input" {...props} />
            <div className="input__type">{suffix}</div>
        </div>
    )
}

export default Input;