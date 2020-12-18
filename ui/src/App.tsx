import React, { useContext, useRef, useState } from 'react';
import './App.css';
import {  scrollIDIntoViewHelper, useResetURI } from './utils/scrollHelpers';
import Header from './components/Header';
import Introduction from './components/Introduction';
import { useCustomCss_vh } from './utils/useCustomCss_vh';
import { useScrollTransitionV2 } from './utils/useScrollTransition';
import ProgressSection from './components/ProgressSection';
import QueryForm from './components/QueryForm';
import { dataControllerContext, queryResultsContext } from './contexts';
import { CSSLoaderEllipsis } from './components/CSSLoaders';
import Results from './components/Results';
import Footer from './components/Footer';

type TCurrentScreen = "Introduction" | "Text" | "Range" | "Results" | "Details"

function App() {

  const [currentScreen, setCurrentScreen] = useState<TCurrentScreen>("Introduction")

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

    if(ratio === 1 || ((window.scrollY || window.pageYOffset) > 126)){
      movingElement.current && (movingElement.current.style.top = dst + "px");
      movingElement.current && (movingElement.current.style.left = dstLeft + "px");
      movingElement.current && (movingElement.current.style.fontSize = dstFontSize + "rem");
      !appElm.current?.classList.contains("fixed-app-bar") && appElm.current?.classList.add("fixed-app-bar");

    }else{
      movingElement.current && (movingElement.current.style.top = (dst + (1 - ratio) * offset) + "px");
      movingElement.current && (movingElement.current.style.left = (dstLeft + (1 - ratio) * (srcLeft - dstLeft)) + "px");
      movingElement.current && (movingElement.current.style.fontSize = (dstFontSize + (1 - ratio) * (srcFontSize - dstFontSize)) + "rem");
      appElm.current?.classList.remove("fixed-app-bar")

    }
  })
  
  const [waitingForServer, executeQuery] = useContext(dataControllerContext)
  const queryResults = useContext(queryResultsContext)
  console.log(queryResults)



  return (
    <div className="App full-height lg:h-auto" ref={appElm} >

      {/* Loader Section */}
      <section className={`frosty-loader fixed top-0 left-0 text-white justify-center align-center flex-col z-50 text-center ${waitingForServer? "visible" : "invisible"}`}>
        <h1 className="text-white mb-8">Processing Query</h1>
        <h2 className="text-white mb-8">This will take a moment</h2>
        <CSSLoaderEllipsis/>
      </section>


      {/* Header Section  */}
      <section className="app-section flex-auto h-1 lg:h-2 bg-blue-500" id="top-bar-element"></section>
      <section className={`app-section px-8 flex-nowrap ${currentScreen === "Introduction"?'hidden md:flex':''}`} id="app-header">        
        <Header exposeLogo={ grabFinalAnchor }/>
      </section>

      


      {/* Intro Section  */}
      <section className={`app-section flex-12/12 lg:flex-2/12 flex-shrink-0 px-8 pb-8 lg:mb-20 h-full ${currentScreen !== "Introduction" ? "hidden lg:flex" : ""}`} id="introduction">
        <Introduction onExplore={()=>{ setCurrentScreen("Text"); scrollIDIntoViewHelper("query-form"); }}
                      exposeMovingLogo={ (target)=>{movingElement.current = target;} }
                      exposeMovingLogoAnchor={ grabSourceAnchor }
        />
      </section>
      <section className="app-section progress-bar-section hidden lg:flex" id="introduction-progress">
        <ProgressSection title="Let's Get Started"/>
      </section>




      {/* Form Section  */}
      <section className={`app-section px-8 pt-8 lg:pt-16 pb-8 lg:mb-20 flex-2/12 flex-grow ${["Text", "Range"].includes(currentScreen) ? "" : "hidden lg:flex"}`} id="query-form">
        <QueryForm onEnterText={()=>setCurrentScreen("Text")}
                   onSetRange={()=>setCurrentScreen("Range")}
                   onResults={()=>{ setCurrentScreen("Results"); scrollIDIntoViewHelper("results"); executeQuery(); }}
                   displayTextScreen={currentScreen === "Text"}
                   displayRangeScreen={currentScreen === "Range"}
        />
      </section>
      <section className="app-section progress-bar-section hidden lg:flex" id="query-form-progress">
        <ProgressSection title="Your results are ready!"/>
      </section>





      {/* Result Section  */}
      <section className={`app-section px-8 pt-8 lg:pt-16 pb-8 lg:mb-20 flex-2/12 overflow-y-auto xl:overflow-y-visible flex-grow ${["Results", "Details"].includes(currentScreen) ? "" : "hidden lg:flex"}`} id="results">
        { queryResults !== null && (
            <Results  onNewQuery={()=>{ setCurrentScreen("Text"); scrollIDIntoViewHelper("query-form"); }}
                    onDetailedResults={()=>{ setCurrentScreen("Details"); scrollIDIntoViewHelper("query-form"); }}
                    onResults={()=>{ setCurrentScreen("Results"); scrollIDIntoViewHelper("query-form"); }}
                    displayResultsScreen={currentScreen === "Results"}
                    displayDetailedResults={currentScreen === "Details"}
            />
          )
        }
      </section>


      {/* Footer */}
      <footer className="app-section hidden lg:flex" id="footer"><Footer/></footer>

    </div>
  );
}

export default App;
