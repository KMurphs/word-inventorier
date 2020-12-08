import React, { useEffect, useRef, useState } from 'react';

import './App.css';

import bannerImage from './undraw_file_analysis_8k9b 2.svg';

import Home from "./components/Home";
import TextScreen from './components/TextScreen';
import DetailedResultsScreen from './components/DetailedResultsScreen';
import RangeScreen from './components/RangeScreen';
import ResultScreen from './components/ResultScreen';
import { scrollIDIntoViewHelper, useResetURI } from './utils/scrollHelpers';
import ProgressIndicator from './components/ProgressIndicator';
import { useScrollTransition } from './utils/useScrollTransition';


function App() {

  const [currentScreen, setCurrentScreen] = useState<string>("Home")
  console.log("App refreshed")

  // const resetURI = useRef<boolean>(false)
  // const prevURI = useRef<string | null>("Home")
  // const nextURI = useRef<string>("Home")

  const headerHTML = useRef<HTMLDivElement|null>(null)
  const logoHTML = useRef<HTMLDivElement|null>(null)




  useScrollTransition(140, (scrollRatio)=>{
    if(scrollRatio <= 1 && logoHTML.current){
      // console.log(y.toFixed(2));
      // console.log(headerHTML.current?.classList);
      logoHTML.current.style.left = `${6.5 * (1 - scrollRatio)}rem`;
      logoHTML.current.style.top = `${8.5 * (1 - scrollRatio)}rem`;
      logoHTML.current.style.fontSize = `${48 + (72 - 48) * (1 - scrollRatio)}px`;
      headerHTML.current && headerHTML.current.classList.remove("has-shadow");
    } 
    if (scrollRatio >= 1 && headerHTML.current){
      !headerHTML.current.classList.contains("has-shadow")
                 && headerHTML.current.classList.add("has-shadow")
    }
  })


  useResetURI()



  const handleScreenChange = (nextScreenId: string, clickEvt?: any)=>{
    setCurrentScreen(nextScreenId)
    scrollIDIntoViewHelper(nextScreenId, clickEvt)
  }

  

  return (
    <div className="App full-height flex flex-col " >


      <header ref={headerHTML} className={`app-header p-8 flex justify-between flex-wrap ${currentScreen === 'Home' ? 'hide-on-mobile' : '' }`}>
        <div className="logo hidden lg:inline-block" ref={logoHTML}>Words</div>
        <ProgressIndicator />
      </header>




      <main className="flex-grow flex overflow-y-hidden overflow-x-hidden lg:flex-col lg:overflow-y-visible lg:overflow-x-visible">
        
        
        <section className="flex flex-wrap relative">
          <div id="Home" className="app-screen p-8 w-screen">
            <Home onExplore={evt => handleScreenChange("TextScreen", evt)}/>
          </div>

          <div className="app-progress-section hidden lg:block flex-force-wrap h-72">
            <h2>Let’s Get Started</h2>
            <div className="flex align-center justify-center">
              <ProgressIndicator />
            </div>
          </div>

          <div className="decorators decorators-first">
            <div className="top-left-circles"></div>
            <div className="top-right-circle"></div>
            <div className="bottom-right-histogram hidden lg:grid"><span></span><span></span></div>
          </div>

        </section>

        <section className="flex flex-wrap settings-section lg:justify-between relative">


          
          <div className="flex flex-grow lg:flex-wrap lg:flex-col lg:flex-grow-0 form-container lg:ml-36 lg:my-14">
            <div id="TextScreen" className="app-screen p-8 w-screen">
              <TextScreen onSubmit={evt => handleScreenChange("ResultScreen", evt)}
                          onSetRange={evt => handleScreenChange("RangeScreen", evt)}
              />
            </div>
            <div id="RangeScreen" className="app-screen p-8 w-screen">
              <RangeScreen onSubmit={evt => handleScreenChange("ResultScreen", evt)}
                          onEnterText={evt => handleScreenChange("TextScreen", evt)}
              />
            </div>
          </div>

          <div className=" banner hidden lg:flex flex-col lg:w-6/12 lg:px-36 lg:my-14">
            <header>
              <h2>This will just take a minute!</h2>
              <h3>We just need a couple of details</h3>
            </header>
            <main>
              <img className="m-auto" src={bannerImage} alt="launch rocket"/>
            </main>
          </div>

          




          <div className="app-progress-section hidden lg:block flex-force-wrap h-72">
            <h2>Let’s Get Started</h2>
            <div className="flex align-center justify-center">
              <ProgressIndicator />
            </div>
          </div>


          <div className="decorators ">
            <div className="top-left-circles"></div>
            <div className="top-right-circle "></div>
            <div className="bottom-right-histogram hidden lg:grid"><span></span><span></span></div>
          </div>

        </section>

        <section className="flex flex-wrap">
          <div id="ResultScreen" className="app-screen p-8 w-screen"><ResultScreen /></div>
          <div id="DetailedResultsScreen" className="app-screen p-8 w-screen"><DetailedResultsScreen/></div>
          
          <div className="app-progress-section hidden lg:block flex-force-wrap h-72">
            <h2>Let’s Get Started</h2>
            <div className="flex align-center justify-center">
              <ProgressIndicator />
            </div>
          </div>
          
        </section>
      </main>






      <footer className="hidden lg:block">1-2-3</footer>

    </div>
  );
}

export default App;
