import React from "react";
import animateOnScroll from ".";
import { useIntersect } from "../useIntersect";
import "./style.css"


export const AnimateOnSCrollExample = () => {

  const [ref1] = useIntersect({threshold: [0, 1], onObservedIntersection: animateOnScroll});

  return (
    <div>
      <p ref={ref1} data-aos="fade-right">Let's start by entering some text to get going. Or, the URL to an online text file...</p>
    </div>
  )
}