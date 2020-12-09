import { useEffect } from "react";


/* https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser */
/* https://dev.to/admitkard/mobile-issue-with-100vh-height-100-100vh-3-solutions-3nae */
/* https://stackoverflow.com/a/60735432/9034699 */



/**
 * This function will create a css custom variable --vh based on the current viewport height.
 * 
 * --vh will take into consideration the app bar on top. 
 * 
 * So The example below will give an element full height with no scrolls.
 * 
 * @example
 *  calc(100 * var(--vh))

 * @param  {None} None
 */
export const useCustomCss_vh = (target: HTMLElement | null) =>{

  const htmlTarget = target ? target : document.querySelector(':root') as HTMLElement
  
  const adjuster = (target: HTMLElement)=> { 
    target?.style.setProperty('--vh', window.innerHeight/100 + 'px');
  }

  adjuster(htmlTarget);
  useEffect(() => {
    // window.addEventListener("scroll", throttle(callback, 100));
    window.addEventListener("resize", ()=> adjuster(htmlTarget));

    return () => {
      // window.removeEventListener("scroll", throttle(callback, 100));
      window.removeEventListener("resize", ()=> adjuster(htmlTarget));
    };
  });


}


