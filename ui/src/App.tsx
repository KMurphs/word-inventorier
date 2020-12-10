import React, { useRef } from 'react';
import './App.css';
import {  useResetURI } from './utils/scrollHelpers';
import Header from './components/Header';
import Introduction from './components/Introduction';
import { useCustomCss_vh } from './utils/useCustomCss_vh';
import { useScrollTransitionV2 } from './utils/useScrollTransition';


function App() {


  console.log("App refreshed")
  useResetURI()

  const appElm = useRef<HTMLDivElement | null>(null)
  useCustomCss_vh(appElm.current)



  const movingElement = useRef<HTMLElement | null>(null)
  const [grabFinalAnchor, grabSourceAnchor] = useScrollTransitionV2((ratio, offset, dstAnchor, srcAnchor)=>{
    
    const dst = dstAnchor.getBoundingClientRect().y;
    const dstLeft = dstAnchor.getBoundingClientRect().x;
    const srcLeft = srcAnchor.getBoundingClientRect().x;
    if(!dst || !srcLeft || !dstLeft || !movingElement) return;

    const dstFontSize = 3;
    const srcFontSize = 4;

    if(ratio === 1){
      movingElement.current && (movingElement.current.style.top = (dst + (1 - ratio) * offset) + "px");
      movingElement.current && (movingElement.current.style.left = (dstLeft + (1 - ratio) * (srcLeft - dstLeft)) + "px");
      movingElement.current && (movingElement.current.style.fontSize = (dstFontSize + (1 - ratio) * (srcFontSize - dstFontSize)) + "rem");
      !appElm.current?.classList.contains("fixed-app-bar") && appElm.current?.classList.add("fixed-app-bar")

    }else{
      movingElement.current && (movingElement.current.style.top = (dst + (1 - ratio) * offset) + "px");
      movingElement.current && (movingElement.current.style.left = (dstLeft + (1 - ratio) * (srcLeft - dstLeft)) + "px");
      movingElement.current && (movingElement.current.style.fontSize = (dstFontSize + (1 - ratio) * (srcFontSize - dstFontSize)) + "rem");
      appElm.current?.classList.remove("fixed-app-bar")

    }
  })
  


  return (
    <div className="App full-height lg:h-auto" ref={appElm} >
      
      {/* Header Section  */}
      <section className="app-section flex-auto h-1 lg:h-2 bg-blue-500" id="top-bar-element"></section>
      <section className={`app-section px-8 flex-nowrap ${true?'hidden md:flex':''}`} id="app-header">        
        <Header exposeLogo={ grabFinalAnchor }/>
      </section>

      
      {/* Intro Section  */}
      <section className="app-section flex-1/12 px-8 pb-8" id="introduction">
        <Introduction onExplore={()=>{}}
                      exposeMovingLogo={ (target)=>{movingElement.current = target;} }
                      exposeMovingLogoAnchor={ grabSourceAnchor }
        />
      </section>
      {/* <section className="h-screen"></section> */}
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
