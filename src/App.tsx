import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createCanvasText, createCanvasObject, createCanvasImage} from "./redux/canvasObjects/canvasObjects.actions"
import {loadImage} from "./utils/image.utils"

import './App.css';
import CanvasArea from "./components/CanvasArea.component"

function App() {

  const dispatch = useDispatch()

  const [image,setImage] = useState<HTMLImageElement | null>(null)

  const onCreateText = () => {
    if(image){
        dispatch(createCanvasImage({
          src: image.src,
          x: 100,
          y: 100,
        }))
    }
   
  }

  


  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      const loadedImage = await loadImage(e.target.files[0])
      setImage(loadedImage)
    }
  }

  return (
    <div className="App">
      <div style={{
        width: "80%",
        margin: "10px auto",
        height: "60vh",
        background: "#eee"
      }}>
        <CanvasArea></CanvasArea>

        <input type="file" accept="image/*"   name="image"  onChange={onChange}  />
        <button onClick={onCreateText}>add Image</button>
      </div>
    </div>
  );
}

export default App;
