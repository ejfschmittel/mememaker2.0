

import React, {useState, useEffect} from 'react'
import useInterval from "../hooks/useInterval"
interface Props {
    className?: string,
    startDate: Date | null,
    
}

const defaultProps = {
    refreshRate: 500,

}

const getCurrentDateString = (startDate: Date) => {
    const delta = Math.floor((new Date().getTime() - startDate.getTime()) / 1000);

    const minutes = Math.floor(delta / 60) % 60
    const seconds = delta % 60; 

    return `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`
}

const TimeSinceDisplay = ({className, startDate, refreshRate}: Props & typeof defaultProps) => {

    const [timeString, setTimeString] = useState("00:00");

    useInterval(() => {
        console.log("interval")
        const newTimeString = startDate ?  getCurrentDateString(startDate) : ""
        setTimeString(newTimeString)
    }, refreshRate)


    return (
        <div className={className}>
            {timeString}
        </div>
    )
}

TimeSinceDisplay.defaultProps = defaultProps;

export default TimeSinceDisplay