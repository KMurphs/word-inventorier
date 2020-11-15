import React, { useEffect } from "react";
import { DisplayQueryMaxLength, DisplayQueryMinLength, DisplayQueryMostFrequentParameter } from "../../contexts/context";
import animateOnScroll from "../../utils/AnimateOnScroll";
import { useIntersect } from "../../utils/useIntersect";
import { scrollIDIntoViewHelper } from "../../utils/utils";
import { AutoGrowingTextAreaWithContext } from "../AutoGrowingTextArea/withContext";
import { InputWithMovingChangingLabelWithContext } from "../InputWithMovingLabel/withContext";
// import { TwoRangeInput } from "../TwoRangeInput";
import { TwoRangeInputWithContext } from "../TwoRangeInput/withContext";
import './style.css';


export const Query = () => {

  
  const [headerRef] = useIntersect({threshold: [.25, .75], onObservedIntersection: animateOnScroll});
  const [textareaRef] = useIntersect({threshold: [.25, .75], onObservedIntersection: animateOnScroll});
  const [summaryRef] = useIntersect({threshold: [.25, .75], onObservedIntersection: animateOnScroll});
  const [inputRef] = useIntersect({threshold: [.25, .75], onObservedIntersection: animateOnScroll});
  const [btnRef, getIntersectionObj] = useIntersect({threshold: [.25, .75], onObservedIntersection: animateOnScroll});



  useEffect(()=>{
    const interval = setInterval(()=>{
      const intersectionObj = getIntersectionObj()
      console.log(intersectionObj?.time, intersectionObj?.intersectionRatio, intersectionObj?.rootBounds, intersectionObj?.boundingClientRect, intersectionObj?.intersectionRect, intersectionObj?.isIntersecting)
    }, 1000)

    return ()=> clearInterval(interval)
  })




  return (
    <div className="container query__container">


      <div className="query__header" ref={headerRef} data-aos="fade-left">
        <h1>Word Inventorier</h1>
        <h4>Setup Text</h4>
      </div>


      <div className="query__body">
        <div className="query-input" ref={textareaRef} data-aos="fade-left">
          <AutoGrowingTextAreaWithContext />
        </div>
        <div className="query-controls">

          <div className="query-summary" ref={summaryRef} data-aos="fade-right">
            <h3>Query Summary</h3>
            <span>Analyse Text on the left</span>
            <span>Retrieve Top <DisplayQueryMostFrequentParameter /> most frequent words</span>
            <span>With lengths between <DisplayQueryMinLength /> and <DisplayQueryMaxLength /></span>
            

          </div>

          <div ref={inputRef} data-aos="fade-right">
            {/* <TwoRangeInput rangeLow={0} rangeHigh={100} /> */}
            <TwoRangeInputWithContext />
            <InputWithMovingChangingLabelWithContext/>
          </div>


          <a className="btn btn--text-icon" href="/" onClick={evt => scrollIDIntoViewHelper("results", evt)} ref={btnRef} data-aos="fade-right"> 
            <i className="fas fa-cloud-upload-alt"></i>
            <span className="btn__text">Submit</span>    
          </a>  

        </div>
        
      </div>
    </div>
  )
}