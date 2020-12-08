import { useEffect } from "react";

type TAction = (scrollRatio: number) => void

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
export const useScrollTransition = (targetScrollOffset: number, onRatioChange: (scrollRatio: number) => void) =>{

  const computeRatio = (targetOffset: number)=>{
    
    // Possible optimization: discard scroll event not on window
    // Or maybe find a way to bind scroll to a custom element different from window

    // let y = (window.scrollY || window.pageYOffset) / 140;
    let scrollRatio = (window.scrollY || window.pageYOffset) / targetOffset;
    scrollRatio = scrollRatio > 1 ? 1 : scrollRatio ;// ensure y is always >= 1 (due to Safari's elastic scroll)
    scrollRatio = Math.round(scrollRatio * 100)/100;
    return scrollRatio;
  }



  useEffect(() => {
    // window.addEventListener("scroll", throttle(callback, 100));
    window.addEventListener("scroll", ()=> onRatioChange(computeRatio(targetScrollOffset)));

    return () => {
      // window.removeEventListener("scroll", throttle(callback, 100));
      window.removeEventListener("scroll", ()=> onRatioChange(computeRatio(targetScrollOffset)));
    };
  });


}




// https://stackoverflow.com/a/52638293/9034699
// https://www.sitepoint.com/throttle-scroll-events/
function throttle(fn: Function, waitMs: number) {
  var time = Date.now();
  return function() {
    if ((time + waitMs - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}