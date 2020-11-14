import { render } from "@testing-library/react";
import React, { useEffect, useRef } from "react";
import animateOnScroll from "../../utils/AnimateOnScroll";
import { useIntersect } from "../../utils/useIntersect";
import { scrollIDIntoViewHelper } from "../../utils/utils";
import { AutoGrowingTextArea } from "../AutoGrowingTextArea";
import { InputWithMovingChangingLabel } from "../InputWithMovingLabel";
import { TwoRangeInput } from "../TwoRangeInput";
import './style.css';


export const Query = () => {

  const rootRef = useRef<HTMLDivElement>(null);
  const parentNode = rootRef.current?.parentNode as Element;
  // console.log(parentNode)
  
  const [headerRef] = useIntersect({threshold: [.25, .75], onObservedIntersection: animateOnScroll});
  const [textareaRef] = useIntersect({threshold: [.25, .75], onObservedIntersection: animateOnScroll});
  const [summaryRef] = useIntersect({threshold: [.25, .75], onObservedIntersection: animateOnScroll});
  const [inputRef] = [null]; //useIntersect({threshold: [.25, .75], onObservedIntersection: animateOnScroll});
  const [btnRef, getIntersectionObj] = useIntersect({threshold: [.25, .75], onObservedIntersection: animateOnScroll});
  const intersectionObj = getIntersectionObj()
  console.log(intersectionObj)
  // const btnRef = useRef(null); 


  console.log("Query rendered")
  // let interval: NodeJS.Timeout;
  useEffect(()=>{
    const interval = setInterval(()=>{
      const intersectionObj = getIntersectionObj()
      console.log(intersectionObj?.time, intersectionObj?.intersectionRatio, intersectionObj?.rootBounds, intersectionObj?.boundingClientRect, intersectionObj?.intersectionRect, intersectionObj?.isIntersecting)
    }, 1000)

    return ()=> clearInterval(interval)
  })




  return (
    <div className="container query__container" /*ref={rootRef}*/>


      <div className="query__header" ref={headerRef} data-aos="fade-left">
        <h1>Word Inventorier</h1>
        <h4>Setup Text</h4>
      </div>


      <div className="query__body">
        <div className="query-input" ref={textareaRef} data-aos="fade-left">
          <AutoGrowingTextArea />
        </div>
        <div className="query-controls">

          <div className="query-summary" ref={summaryRef} data-aos="fade-right">
            <h3>Query Summary</h3>
            <span>Analyse Text on the left</span>
            <span>Retrieve Top 10 most frequent words</span>
            <span>With lengths between 10 and 30</span>
          </div>

          {/* <div ref={inputRef} data-aos="fade-left"> */}
            <TwoRangeInput rangeLow={0} rangeHigh={100}/>
            <InputWithMovingChangingLabel/>
          {/* </div> */}


          <a className="btn btn--text-icon" href="/" onClick={evt => scrollIDIntoViewHelper("results", evt)} ref={btnRef} data-aos="fade-right"> 
            <i className="fas fa-cloud-upload-alt"></i>
            <span className="btn__text">Submit</span>    
          </a>  

        </div>
        
      </div>
    </div>
  )
}