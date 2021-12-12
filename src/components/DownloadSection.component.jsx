import React from 'react'
import RainbowButton from './RainbowButton.component'
import {app} from "../pixijs/App"

const DownloadSection = () => {

    const onDownloadClick = () => {
        if(app){
            console.log(app.view)

           var link = document.createElement('a');
            link.download = 'meme.png';
           
            link.href = app.view.toDataURL("image/png")
            link.click();
        }
    }

    return (
    <div className="ui-panel p flex-center">
        <RainbowButton className="rainbow-button--fullsize" onClick={onDownloadClick}>
            Download
        </RainbowButton>
    </div>
    )
}

export default DownloadSection