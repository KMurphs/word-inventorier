import { useLayoutEffect } from "react";
import { scrollURLIDIntoViewHelper } from "./utils";


// https://reactrouter.com/web/guides/scroll-restoration
// React router does not reliably handle scrolling to the current element 
// When we need to resort to doing it ourselves, this component when rendered will force a scroll to top


type Props = {
  timeout?: number // This timeout is caused by the "transition: all .3s" that's applying to everything from css
}
export default function ScrollToURI({timeout}: Props) {
  
  useLayoutEffect(() => {

    // Define, Register and Pre-run a callback for scrolling
    const callback = () => setTimeout(scrollURLIDIntoViewHelper, timeout || 305)
    window.addEventListener('resize', callback);
    callback();

    // Return object to cleanup effect
    return () => window.removeEventListener('resize', callback);

  // Explicitely state dependency (otherwise a warning is generated)
  }, [timeout]);

  
  return null;
}