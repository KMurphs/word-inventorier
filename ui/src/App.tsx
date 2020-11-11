import React, { useState, useRef } from 'react';
import './App.css';
import { TUIQueryItem, TTextSummary } from './data.controller/data.types';
import DataController from './data.controller/data.controller';




function App() {

  let dc = useRef<DataController|null>(null);
  (dc.current === null) && (dc.current = new DataController());
  console.log('[App]: Data Controller Version: ', dc.current.getVersion())

  const [isModalActive, setIsModalActive] = useState<boolean>(false)


  return (
    <main className="App">

      <div id="screen-1" className="screen screen-1">screen 1 <a href="#screen-2">to screen 2</a></div>
      <div id="screen-2" className="screen screen-2">screen 2 <a href="#screen-3">to screen 3</a></div>
      <div id="screen-3" className="screen screen-3">screen 3 <a href="#screen-2">to screen 2</a><a href="#screen-4">to screen 4</a></div>
      <div id="screen-4" className="screen screen-4">screen 4 <a href="#screen-3">to screen 3</a></div>
      <div id="screen-5" className="screen screen-5">screen 5</div>

    </main>
  );
}

export default App;
