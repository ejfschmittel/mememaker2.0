import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createCanvasText} from "./redux/canvasObjects/canvasObjects.actions"

import './App.css';
import CanvasArea from "./components/CanvasArea.component"

function App() {

  const dispatch = useDispatch()

  const onCreateText = () => {



    dispatch(createCanvasText({
      text: "some longer text",
      x: 100,
      y: 100,
    }))
   
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

        <button onClick={onCreateText}>add Text</button>
      </div>
    </div>
  );
}

export default App;
