import React from 'react'
import { MEME_TEMPLATES, getTemplatePath, MemeTemplate } from "../data/templates"
import "../styles/components/canvasTemplateList.styles.scss"
import {loadImageFromURL} from "../utils/image.utils"
import { useSelector, useDispatch } from 'react-redux';
import { setCanvasDimensions, setCanvasBackgroundImage, setShowImageOverlay} from "../redux/canvas/canavs.actions"
import useCanvasLimiter from '../hooks/useCanvasLimiter';

const CanvasTemplateList = () => {
    const dispatch = useDispatch()

    const {limit, maxWidth, maxHeight} = useCanvasLimiter()

    const onTemplateClick = async (templatePath: string) => {
  
        const image = await loadImageFromURL(templatePath);
    
        const {width, height} = limit(image.width, image.height);
        dispatch(setCanvasBackgroundImage(templatePath, width, height))
    }

    return (
        <div className="template-list">
            <div className="template-list__search-container">
                <input className="template-list__search" placeholder="search..." />
            </div>

            <div className="template-list__items">
                {MEME_TEMPLATES.map(template => {
                    

                    return <CanvasTemplateListItem 
                        key={template.path}
                        template={template}
                        onClick={onTemplateClick}
                    />    
                })}
            </div>

            <div className="template-list__pagination">

            </div>
        </div>
    )
}

interface ListItemProps {
    template: MemeTemplate
    onClick: any,
}

const CanvasTemplateListItem = ({template, onClick}: ListItemProps) => {

    const templatePath = getTemplatePath(template)
    return (
        <div 
            className="template-list__item"
            style={{ backgroundImage: `url('${templatePath}')` }} title={template.name || template.path}
            onClick={() => onClick(templatePath)}
        ></div>
    )
}

export default CanvasTemplateList