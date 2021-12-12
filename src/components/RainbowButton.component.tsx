import React from 'react'
import { isPropertySignature } from 'typescript'
import "../styles/components/rainbowButton.styles.scss";

interface Props {
    className?: string,
    onClick?: any
    children?: React.ReactNode,
}


const RainbowButton = ({children, className, onClick}: Props) => {
    return (
        <button className={`rainbow-button ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default RainbowButton