import { useLayoutEffect, useRef, useState } from "react";

// type TAction = (scrollRatio: number) => void

/**
 * This function will call a function "onRatioChange" everytime the window is scrolled.
 * 
 * Use case is moving or changing something based on the current scroll offset.
 * 
 * Provide the target offset, and the callback to perform your desired action.
 * 
 * Note: that the scroll ratio is capped at 1
 * 
 * Example: 
 * @example
 *  useScrollTransition(140, (scrollRatio)=>{ 
 *    if(scrollRatio == 0) console.log("Target element is not at original position")
 *    else if(scrollRatio < 1) console.log("Target is somewhere between original and final position")
 *    else console.log("Target is at final position. And 'scrollRatio' will stay 1")
 *  })
 * 
 * 
 * 
 * 
 * @param  {number} targetScrollOffset
 * @param  {(scrollRatio:number)=>void} onRatioChange
 */
export const useScrollTransition = (targetOffset: number, onRatioChange: (scrollRatio: number, targetOffset: number) => void) =>{



  const computeRatio = (targetOffset: number): [number, number]=>{
    
    // Possible optimization: discard scroll event not on window
    // Or maybe find a way to bind scroll to a custom element different from window

    const scrollRatio = Math.round(coerce((window.scrollY || window.pageYOffset) / targetOffset, 0, 1) * 100)/100;
    return [scrollRatio, targetOffset];
  }

  


  
  useLayoutEffect(() => {

    const cb = ()=> onRatioChange(...computeRatio(targetOffset));
    const scrollToTop = ()=> window.scrollTo(0, 0);

    window.addEventListener("scroll", cb);
    window.addEventListener("beforeunload", scrollToTop);

    return () => { 
      window.removeEventListener("scroll", cb); 
      window.removeEventListener("beforeunload", scrollToTop); 
    };
  }, [targetOffset, onRatioChange]);
}



export const useScrollTransitionV2 = (onRatioChange: (scrollRatio: number, originalOffset: number, dstAnchor: HTMLElement, srcAnchor: HTMLElement) => void): [(destinationAnchor: HTMLElement)=>void, (sourceAnchor: HTMLElement)=>void] =>{


  const [dstOffset, setDstOffset] = useState<number>(-1)
  const [srcOffset, setSrcOffset] = useState<number>(-1)
  const srcAnchor = useRef<HTMLElement | null>(null)
  const dstAnchor = useRef<HTMLElement | null>(null)



  const grabSourceAnchor = (target: HTMLElement)=>{
    srcAnchor.current = target;
    setSrcOffset(target.getBoundingClientRect().y);
  }
  const grabFinalAnchor = (target: HTMLElement)=>{
    dstAnchor.current = target;
    setDstOffset(target.getBoundingClientRect().y);
  }



  useScrollTransition(
    Math.abs(dstOffset - srcOffset), 
    (ratio, offset) => dstAnchor.current && srcAnchor.current && onRatioChange(ratio, offset, dstAnchor.current, srcAnchor.current)
  );


  return [grabFinalAnchor, grabSourceAnchor];

}


// // https://stackoverflow.com/a/52638293/9034699
// // https://www.sitepoint.com/throttle-scroll-events/
// function throttle(fn: Function, waitMs: number) {
//   var time = Date.now();
//   return function() {
//     if ((time + waitMs - Date.now()) < 0) {
//       fn();
//       time = Date.now();
//     }
//   }
// }

const coerce = (val: number, low: number, high: number) => {
  if(low > high) return val;
  if(val < low) return low;
  if(val > high) return high;
  return val;
}