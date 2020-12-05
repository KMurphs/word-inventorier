import React, { useState } from 'react';

import './App.css';

import Home from "./components/Home";
import TextScreen from './components/TextScreen';
import DetailedResultsScreen from './components/DetailedResultsScreen';
import RangeScreen from './components/RangeScreen';
import ResultScreen from './components/ResultScreen';
import { scrollIDIntoViewHelper, useResetURI } from './utils/scrollHelpers';


function App() {

  const [currentScreen, setCurrentScreen] = useState<string>("Home")
  console.log("App refreshed")

  // const resetURI = useRef<boolean>(false)
  // const prevURI = useRef<string | null>("Home")
  // const nextURI = useRef<string>("Home")


  // const handleResetURI = () => {window.history.pushState("Home", "Home", `/Home`);};
  // useEffect(() => {
  //   window.addEventListener("load", handleResetURI);

  //   return () => {
  //     // Clean up the listener
  //     window.removeEventListener("load", handleResetURI);
  //   };
  // });
  useResetURI()



  const handleScreenChange = (nextScreenId: string, clickEvt?: any)=>{
    setCurrentScreen(nextScreenId)
    scrollIDIntoViewHelper(nextScreenId, clickEvt)
  }

  

  return (
    <div className="App full-height flex flex-col ">


      <header className={`app-header p-8 flex justify-between flex-wrap ${currentScreen === 'Home' ? 'hide-on-mobile' : '' }`}>
        <div className="logo hidden">Words</div>
        <div className="progress w-full at-step-1 at-step-2 at-step-3 at-steps-completed">
          <ul className="grid grid-cols-3 text-xs max-w-lg m-auto con">
            <li><span>Enter Text</span></li>
            <li><span>Set Range</span></li>
            <li><span>Explore</span></li>
          </ul>
        </div>
        <div className="flex-force-wrap flex flex-col">
          {/* <button onClick={evt => scrollIDIntoViewHelper("Home", evt)}>toHome</button> */}
          {/* <button onClick={evt => scrollIDIntoViewHelper("TextScreen", evt)}>toText</button> */}
          {/* <button onClick={evt => scrollIDIntoViewHelper("RangeScreen", evt)}>toRange</button> */}
          {/* <button onClick={evt => scrollIDIntoViewHelper("ResultScreen", evt)}>toResults</button> */}
          {/* <button onClick={evt => scrollIDIntoViewHelper("DetailedResultsScreen", evt)}>toDetails</button> */}
        </div>
        
      </header>




      <main className="flex-grow flex overflow-y-hidden">
        <section className="flex">
          <div id="Home" className="app-screen p-8 w-screen"><Home onExplore={evt => handleScreenChange("TextScreen", evt)}/></div>
        </section>

        <section className="flex">
          <div id="TextScreen" className="app-screen p-8 w-screen"><TextScreen onSubmit={evt => handleScreenChange("ResultScreen", evt)}/></div>
          <div id="RangeScreen" className="app-screen p-8 w-screen"><RangeScreen /></div>
        </section>

        <section className="flex">
          <div id="ResultScreen" className="app-screen p-8 w-screen"><ResultScreen /></div>
          <div id="DetailedResultsScreen" className="app-screen p-8 w-screen"><DetailedResultsScreen/></div>
        </section>
      </main>






      <footer className="hidden lg:block">1-2-3</footer>

    </div>
  );
}

export default App;
