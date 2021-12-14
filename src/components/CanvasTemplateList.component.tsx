import React, {useRef, useState, useEffect} from 'react'
import { MEME_TEMPLATES, getTemplatePath, MemeTemplate } from "../data/templates"
import "../styles/components/canvasTemplateList.styles.scss"
import {loadImageFromURL} from "../utils/image.utils"
import { useSelector, useDispatch } from 'react-redux';
import { setCanvasDimensions, setCanvasBackgroundImage, setShowImageOverlay} from "../redux/canvas/canavs.actions"
import useCanvasLimiter from '../hooks/useCanvasLimiter';



const CanvasTemplateList = () => {
    const dispatch = useDispatch()
    const templateContainer = useRef<HTMLDivElement>(null)
    const {limit, maxWidth, maxHeight} = useCanvasLimiter()


    const [searchTerm, setSearchTerm] = useState("")
    const [currPage, setCurrPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(14)

    const [pageCount, setPageCount] = useState(1)


    const [pageItems, setPageItems] = useState<MemeTemplate[]>([])
    // items per page
    // current page 
    // search term

    // () => update 

    const updatePageItems = () => {
        const filteredTempaltes = searchTemplates(searchTerm)
        setPageCount(Math.ceil(filteredTempaltes.length / itemsPerPage))
        const pageItems = getPageItems(filteredTempaltes, currPage, itemsPerPage)
        console.log(pageItems)
        setPageItems(pageItems)
    }

    useEffect(() => {
       updatePageItems()
    }, [searchTerm, currPage, itemsPerPage])

   


    const getPageItems = (items: MemeTemplate[], page: number, itemsPerPage: number) => {
        const start = page * itemsPerPage;
        const end = (page + 1) * itemsPerPage;

        return items.slice(start, end > items.length ? items.length : end);
    }

    const searchTemplates = (searchTerm: string) => {
        if(searchTerm === "") return MEME_TEMPLATES;
        return MEME_TEMPLATES.filter((template) => {
            const smallSearch = searchTerm.toLowerCase();
            return template.name.toLowerCase().includes(smallSearch) || template.path.toLowerCase().includes(smallSearch)
        })
    }


    const onTemplateClick = async (templatePath: string) => {
  
        const image = await loadImageFromURL(templatePath);
    
        const {width, height} = limit(image.width, image.height);
        dispatch(setCanvasBackgroundImage(templatePath, width, height))
    }

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target as HTMLInputElement;
        setSearchTerm(value)
    }

    return (
        <div className="template-list">
            <div className="template-list__search-container">
                <input className="template-list__search" placeholder="search..." value={searchTerm} onChange={onSearch}/>
            </div>

            <div className="template-list__items" ref={templateContainer}>
                {pageItems.length > 0 ? pageItems.map(template => {
                    

                    return <CanvasTemplateListItem 
                        key={template.path}
                        template={template}
                        onClick={onTemplateClick}
                    />    
                })
                :
                (
                    <div className="template-list__message">
                        No templates found
                    </div>
                )
               
            }
            </div>

            <div className="template-list__pagination">
                {[...new Array(pageCount)].map((_, idx) => {
                    return (
                        <div 
                            className={`template-list__page-icon ${idx == currPage ? "template-list__page-icon--active" : ""}`} 
                            key={`page-${idx}`}
                            onClick={() => setCurrPage(idx)}
                            >
                            <span>{idx +1}</span>
                        </div>
                    )
                })}
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