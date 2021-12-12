import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createCanvasText, createCanvasObject, createCanvasImage} from "./redux/canvasObjects/canvasObjects.actions"
import {setCanvasDimensions} from "./redux/canvas/canavs.actions"
import {loadImage} from "./utils/image.utils"
import CanvasEidtorOverlay from "./components/CanvasEditorOverlay"
import Menu from "./components/Menu.compoent"
import './App.css';
import CanvasArea from "./components/CanvasArea.component"

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
        <Menu />
      </div>
      <div className="layout__canvas">
        <CanvasArea></CanvasArea>
      </div>
      <div className="layout__download">
        <button onClick={test}>Test</button>
      </div>
      <div className="layout__elements"></div>
      <div className="layout__creator"></div>
      <div className="layout__editor"></div>
    </div>
  );
}

export default App;
