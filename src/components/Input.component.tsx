import React from 'react'
import "../styles/components/input.styles.scss"


interface Props {
    label?: string,
    suffix?: string,
    disabled?: boolean,
    value?: any,
    onChange?:any,
    name?: string,
    type?: string,
}

const Input = ({label, suffix, disabled, ...props}:Props) => {
    return (
        <div className="input">
            <label className="input__label">{label}</label>
            <input className="input__input" disabled={disabled} {...props} />
            <div className="input__type">{suffix}</div>
        </div>
    )
}

export default Input;