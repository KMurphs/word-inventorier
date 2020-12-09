import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import {  useResetURI } from './utils/scrollHelpers';
import Header from './components/Header';
import Introduction from './components/Introduction';
import { useCustomCss_vh } from './utils/useCustomCss_vh';
import { useScrollTransition, useScrollTransitionV2 } from './utils/useScrollTransition';


function App() {


  console.log("App refreshed")
  useResetURI()

  const appElm = useRef<HTMLDivElement | null>(null)
  useCustomCss_vh(appElm.current)



  // const initialPos = useRef<[number, number]>([-1,-1])
  // const finalPos = useRef<[number, number]>([-1,-1])
  // const initialAnchor = useRef<HTMLElement | null>(null)
  // const finalAnchor = useRef<HTMLElement | null>(null)
  const movingElement = useRef<HTMLElement | null>(null)
  // const getHTMLElementPosition = ( target: HTMLElement):[number, number] => [target.getClientRects()[0].x, target.getClientRects()[0].y] 
  // const saveHTMLElementPosition = (targetPositionContainer: React.MutableRefObject<[number, number]>, target: HTMLElement) => { 
  //   targetPositionContainer.current = getHTMLElementPosition(target)
  // }




  // const dstAnchor = useRef<DOMRect>(new DOMRect())
  // const registerDstAnchor = (anchor: DOMRect)=>{
  //   dstAnchor.current = DOMRect.fromRect(anchor)
  // }
  // const srcAnchor = useRef<DOMRect>(new DOMRect())
  // const registerSrcAnchor = (anchor: DOMRect)=>{
  //   srcAnchor.current = DOMRect.fromRect(anchor)
  // }
  // const dstCurrent = useRef<DOMRect>(new DOMRect())
  // const registerDstCurrent = (anchor: DOMRect)=>{
  //   dstCurrent.current = anchor
  // }
  // const srcCurrent = useRef<DOMRect>(new DOMRect())
  // const registerSrcCurrent = (anchor: DOMRect)=>{
  //   srcCurrent.current = anchor
  // }

  // useScrollTransition(
  //   Math.abs(dstAnchor.current.y - srcAnchor.current.y),
  //   (ratio, offset)=>{
  //     console.log(ratio)
  //     const dst = finalAnchor.current?.getClientRects()[0].y || 0;
  //     if(ratio === 1){
  //       movingElement.current && (movingElement.current.style.top = (dst + (1 - ratio) * offset) + "px");
  //     }else{
  //       movingElement.current && (movingElement.current.style.top = (dst + (1 - ratio) * offset) + "px");
  //     }
  //   }
  // )


  // const myNum2 = useRef<number>(-1)
  // const getOffset2 = (num: number)=>{
  //   myNum2.current = num 
  // }


  // useEffect(() => {
  //   const computeRatio = ()=>{

  //     const windowOffset = window.scrollY || window.pageYOffset

  //     const srcCurrent = initialAnchor.current?.getClientRects()[0].y || 0;
  //     const dstCurrent = finalAnchor.current?.getClientRects()[0].y || 0;

  //     const originalDistance = Math.abs(dstAnchor.current.y - srcAnchor.current.y);
  //     const currentDistance = srcCurrent - dstCurrent;
  //     const ratio = coerce(currentDistance/originalDistance, 0, 1)

  //     if(prevRatio.current === ratio) return;

      
  //     // movingElement.current && finalAnchor.current && initialAnchor.current && (movingElement.current.style.left = (finalAnchor.current?.getClientRects()[0].x + (ratio) * Math.abs(initialAnchor.current?.getClientRects()[0].x - finalAnchor.current?.getClientRects()[0].x))+ "px")
  //     movingElement.current && finalAnchor.current && initialAnchor.current && (movingElement.current.style.top = (finalAnchor.current?.getClientRects()[0].y + windowOffset +(currentDistance < 0 ? 0 : currentDistance))+ "px")
  //     prevRatio.current = ratio;
  //     console.log({originalDistance, currentDistance, ratio}, finalAnchor.current?.getClientRects()[0].y, initialAnchor.current?.getClientRects()[0].y, movingElement.current?.style.top)
  //   }
  //   // window.addEventListener("scroll", throttle(callback, 100));
  //   window.addEventListener("scroll", computeRatio);

  //   return () => {
  //     // window.removeEventListener("scroll", throttle(callback, 100));
  //     window.removeEventListener("scroll", computeRatio);
  //   };
  // });
  // useScrollTransitionV2(
  //   initialAnchor.current.getClientRects()[0].y || null, 
  //   ()=>finalAnchor.current ? finalAnchor.current.getClientRects()[0].y : 0, 
  //   (scrollRatio)=>{
  //     console.log(finalAnchor.current?.getClientRects()[0].y || 0, (initialAnchor.current?.getClientRects()[0].y || 0) - (finalAnchor.current?.getClientRects()[0].y || 0));
  //     if(finalAnchor.current && initialAnchor.current){

  //       (movingElement.current as HTMLElement).style.top = `${finalAnchor.current?.getClientRects()[0].y || 0 + (1 - scrollRatio) * (initialAnchor.current?.getClientRects()[0].y || 0 - finalAnchor.current?.getClientRects()[0].y || 0)}px`;
  //     }
  //   }
  // )


  const [grabFinalAnchor, grabSourceAnchor] = useScrollTransitionV2((ratio, offset, dstAnchor, srcAnchor)=>{

    const dst = dstAnchor.getClientRects()[0].y;
    const dstLeft = dstAnchor.getClientRects()[0].x;
    const srcLeft = srcAnchor.getClientRects()[0].x;
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
    <div className="App full-height-" ref={appElm} >
      
      {/* Header Section  */}
      <section className="app-section flex-auto h-1 lg:h-2 bg-blue-500" id="top-bar-element"></section>
      <section className={`app-section px-8 flex-nowrap ${true?'hidden md:flex':''}`} id="app-header">
        {/* <button onClick={evt=>console.log(dstAnchor.current,srcAnchor.current, movingElement.current && getHTMLElementPosition(movingElement.current))}>Click me</button> */}
        <Header 
                // exposeLogo={ saveHTMLElementPosition.bind(null, finalPos) }
                exposeLogo={ grabFinalAnchor }
                // exposeLogo={ (target)=> {finalAnchor.current = target; console.log(target);registerDstAnchor(target.getClientRects()[0]); } }
        />
      </section>

      
      {/* Intro Section  */}
      <section className="app-section flex-1/12 px-8 pb-8" id="introduction">
        <Introduction onExplore={()=>{}}
                      // exposeMovingLogoAnchor={ saveHTMLElementPosition.bind(null, initialPos) }
                      exposeMovingLogo={ (target)=>{movingElement.current = target;} }
                      exposeMovingLogoAnchor={ grabSourceAnchor }
                      // exposeMovingLogoAnchor={ (target)=>{initialAnchor.current = target; registerSrcAnchor(target.getClientRects()[0])} }
        />
      </section>
      <section className="h-screen"></section>
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
