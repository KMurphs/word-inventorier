import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ScrollToTop from "../../utils/ScrollToTop";
import { scrollIDIntoViewHelper } from "../../utils/utils";
import { CSSLoaderEllipsis } from "../CSSLoaders";
import './style.css';

import {useIntersect} from "../../utils/useIntersect";

// React router does not reliably handle scrolling to the current element 
// We need to resort to doing it ourselves
// Everytime this component is rendered, ScrollToTop is going to rendered, forcing a scroll back to top
export const Home = () => {


  // const ref = useRef(null);
  // const [ref, entry] = useIntersect({
  //   threshold: Array.from(Array(2).keys(), i => i / 100),
  //   callback: ( entry ) => {if(entry.intersectionRatio > .5) console.log(entry);}
  // });
  // const [ref, entry] = useIntersect({ threshold: 1 });
  const [ref1] = useIntersect({callback: (entry)=>{console.log("ref 1: ", entry.target.tagName, entry.intersectionRatio)}});
  const [ref2] = useIntersect({callback: (entry)=>{console.log("ref 2: ", entry.target.tagName, entry.intersectionRatio)}});
  console.log("ReRender Home")


  return (
    <div className="container home__container">
      <ScrollToTop/>
      <div className="home__background"></div>
      <div className="home__header">
        <h1>Word Inventorier</h1>
        <p>This app will inventory text and allow querying for most frequent words with lengths ranges</p>
      </div>
      <div className="home__body">
        <p ref={ref1}><CSSLoaderEllipsis/><br/>Let's start by entering some text to get going. Or, the URL to an online text file...</p>
        
        {/* <span style={{"color":"white"}}>{entry && entry.intersectionRatio}</span> */}
        
        <a className="btn btn--text-icon" href="/" onClick={evt => scrollIDIntoViewHelper("query", evt)}> 
          <i className="fas fa-pencil-alt"></i>
          <span className="btn__text" ref={ref2}>Start Exploring!</span>    
        </a> 

        {/* <span style={{"color":"white"}}>{entry && entry.intersectionRatio}</span> */}

        
      </div>
    </div>
  )
}