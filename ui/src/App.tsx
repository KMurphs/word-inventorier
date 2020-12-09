import React, { useRef, useState } from 'react';
import './App.css';
import {  useResetURI } from './utils/scrollHelpers';
import Header from './components/Header';
import Introduction from './components/Introduction';
import { useCustomCss_vh } from './utils/useCustomCss_vh';


function App() {


  console.log("App refreshed")
  useResetURI()

  const elm = useRef<HTMLDivElement | null>(null)
  useCustomCss_vh(elm.current)



  const initialPos = useRef<[number, number]>([-1,-1])
  const finalPos = useRef<[number, number]>([-1,-1])
  const movingElement = useRef<HTMLElement | null>(null)
  const getHTMLElementPosition = ( target: HTMLElement):[number, number] => [target.getClientRects()[0].x, target.getClientRects()[0].y] 
  const saveHTMLElementPosition = (targetPositionContainer: React.MutableRefObject<[number, number]>, target: HTMLElement) => { 
    targetPositionContainer.current = getHTMLElementPosition(target)
  }
  
  // console.log(initialPos.current)

  return (
    <div className="App full-height" ref={elm} >
      
      {/* Header Section  */}
      <section className="app-section flex-auto h-1 lg:h-2 bg-blue-500" id="top-bar-element"></section>
      <section className={`app-section px-8 flex-nowrap ${true?'hidden md:flex':''}`} id="app-header">
        <button onClick={evt=>console.log(initialPos.current, finalPos.current, movingElement.current && getHTMLElementPosition(movingElement.current))}>Click me</button>
        <Header exposeLogo={ saveHTMLElementPosition.bind(null, finalPos) }/>
      </section>

      
      {/* Intro Section  */}
      <section className="app-section flex-1/12 px-8 pb-8" id="introduction">
        <Introduction onExplore={()=>{}}
                      exposeMovingLogoAnchor={ saveHTMLElementPosition.bind(null, initialPos) }
                      exposeMovingLogo={ (target)=>movingElement.current = target }
        />
      </section>
      {/* <section className="app-section progress-bar-section" id="introduction-progress"><ProgressIndicator /></section> */}


      {/* Form Section  */}
      {/* <section className="app-section introduction" id="query-form"><QueryForm /></section> */}
      {/* <section className="app-section progress-bar-section" id="query-form-progress"><ProgressIndicator /></section> */}


      {/* Result Section  */}
      {/* <section className="app-section" id="results"><Results /></section> */}


      {/* Footer */}
      {/* <footer className="app-section hidden lg:block" id="footer"><Footer/></footer> */}

    </div>
  );
}

export default App;
