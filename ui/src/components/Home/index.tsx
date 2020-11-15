import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ScrollToTop from "../../utils/ScrollToTop";
import { scrollIDIntoViewHelper } from "../../utils/utils";
import { CSSLoaderEllipsis } from "../CSSLoaders";
import './style.css';

import {useIntersect} from "../../utils/useIntersect";
import animateOnScroll from "../../utils/AnimateOnScroll";
import { AnimateOnSCrollExample } from "../../utils/AnimateOnScroll/example";
import { queryMaxLengthContext, queryMinLengthContext } from "../../contexts/context";


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


  const [headerRef] = useIntersect({onObservedIntersection: animateOnScroll});
  const [pRef] = useIntersect({onObservedIntersection: animateOnScroll});
  const [btnRef] = useIntersect({onObservedIntersection: animateOnScroll});

  const [queryMinLength, setQueryMinLength] = useContext(queryMinLengthContext);
  const [queryMaxLength, setQueryMaxLength] = useContext(queryMaxLengthContext);

  return (
    <div className="container home__container">
      <ScrollToTop/>
      <div className="home__background"></div>
      <div className="home__header" ref={headerRef} data-aos="zoom-out">
        <h1>Word Inventorier</h1>
        <p>This app will inventory text and allow querying for most frequent words with lengths ranges <span>{queryMinLength}</span> <span>{queryMaxLength}</span></p>
      </div>
      <div className="home__body">
        <p ref={pRef} data-aos="fade-left"><CSSLoaderEllipsis/><br/>Let's start by entering some text to get going. Or, the URL to an online text file...</p>

        {/* <AnimateOnSCrollExample /> */}
        <a className="btn btn--text-icon" href="/" onClick={evt => scrollIDIntoViewHelper("query", evt)} data-aos="fade-right" ref={btnRef}> 
          <i className="fas fa-pencil-alt"></i>
          <span className="btn__text">Start Exploring!</span>    
        </a> 


        
      </div>
    </div>
  )
}