import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createCanvasText, createCanvasObject, createCanvasImage} from "./redux/canvasObjects/canvasObjects.actions"
import {setCanvasDimensions} from "./redux/canvas/canavs.actions"
import {loadImage} from "./utils/image.utils"
import CanvasEidtorOverlay from "./components/CanvasEditorOverlay"
import Menu from "./components/Menu.compoent"
import './App.css';
import CanvasArea from "./components/CanvasArea.component"
import CanvasObjectCreator from "./components/CanvasObjectCreator.component"
import DownloadSection from "./components/DownloadSection.component"
import ActiveObjectEditor from "./components/ActiveObjectEditor.component"
import CanvasObjectList from "./components/CanvasObjectList.component"
import OpenCanvasEditorSection from "./components/OpenCanvasEditor.component"
function App() {

  const dispatch = useDispatch()

  const [image,setImage] = useState<HTMLImageElement | null>(null)

  const onCreateImage = () => {
    if(image){
        dispatch(createCanvasImage({
          src: image.src,
          x: 100,
          y: 100,
        }))
    }
   
  }

  const onCreateText = () => {

        dispatch(createCanvasText({
          text: "Arne ist blöd",
          x: 100,
          y: 100,
        }))
  
   
  }

  const test = () => {
    dispatch(setCanvasDimensions(600,400))
  }

  


  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      const loadedImage = await loadImage(e.target.files[0])
      setImage(loadedImage)
    }
  }

  return (
    <div className="App layout">
      <CanvasEidtorOverlay />
      <div className="layout__info">
        <OpenCanvasEditorSection />
      </div>
      <div className="layout__canvas">
        <CanvasArea />
      </div>
      <div className="layout__download">
        <DownloadSection />
      </div>
      <div className="layout__elements">
        <CanvasObjectList />
      </div>
      <div className="layout__creator">
        <CanvasObjectCreator />
      </div>
      <div className="layout__editor">
        <ActiveObjectEditor />
      </div>
    </div>
  );
}

export default App;
