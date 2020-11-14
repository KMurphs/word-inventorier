import { useLayoutEffect } from "react";
import { scrollURLIDIntoViewHelper } from "./utils";


// https://reactrouter.com/web/guides/scroll-restoration
// React router does not reliably handle scrolling to the current element 
// When we need to resort to doing it ourselves, this component when rendered will force a scroll to top


type Props = {
  timeout?: number // This timeout is caused by the "transition: all .3s" that's applying to everything from css
}
export default function ScrollToURI({timeout}: Props) {
  const callback = () => setTimeout(scrollURLIDIntoViewHelper, timeout || 305)


  useLayoutEffect(() => {

    window.addEventListener('resize', callback);
    callback();

    return () => window.removeEventListener('resize', callback);
  }, []);

  return null;
}