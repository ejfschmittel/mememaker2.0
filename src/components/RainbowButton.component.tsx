import React from 'react'
import { isPropertySignature } from 'typescript'
import "../styles/components/rainbowButton.styles.scss";

interface Props {
    className?: string,
    onClick?: any
    children?: React.ReactNode,
    disabled?:boolean,
}


const RainbowButton = ({children, className, onClick, disabled}: Props) => {
    return (
        <button className={`rainbow-button ${className}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}

export default RainbowButton