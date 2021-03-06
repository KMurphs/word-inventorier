// https://javascriptio.com/view/4915713/react-navigation-that-will-smooth-scroll-to-section-of-the-page
// https://codesandbox.io/s/falling-https-jwrj3?file=/src/App.tsx:636-686
// https://stackoverflow.com/a/16171238/9034699

import { useEffect } from "react";

export const scrollIDIntoViewHelper = (targetID: string, clickEvent?: any, targetURI?: string, smooth: boolean = false)=>{
  
  // We are essentially hijacking the click event which does not really work with react router
  clickEvent && clickEvent.preventDefault && clickEvent.preventDefault();

  // Scroll element with provided id into view
  const targetElmt = document.getElementById(targetID);
  targetElmt && targetElmt.scrollIntoView(smooth ? { behavior: "smooth", block: "start" } : { block: "start" });

  // Update the url
  targetURI && window.history.pushState(targetID, targetID, `/${targetURI ? targetURI : targetID}`);
}

// useEffect(scrollURLIDIntoViewHelper) use with interval?
export const scrollURLIDIntoViewHelper = (smooth: boolean = false)=>{
  
  // This function assumes that the last uri corresponds to the id of the element
  // that must be scrolled into view
  const url = window.location.href.split("/");
  const target = url[url.length - 1];//.toLowerCase();
  const element = document.getElementById(target);

  // Adjust view to display component with id from uri
  element && element.scrollIntoView(smooth ? { behavior: "smooth", block: "start" } : { block: "start" });
}


export const useResetURI = (uri: string = "Home") => {
  const handleResetURI = () => window.history.pushState(uri, uri, `/${uri}`);
  
  useEffect(() => {
    window.addEventListener("load", handleResetURI);

    return () => {
      // Clean up the listener
      window.removeEventListener("load", handleResetURI);
    };
  });
}
// export const useSyncURIAndDisplay = ()=>{
  
//   // This function assumes that the last uri corresponds to the id of the element
//   // that must be scrolled into view
//   let url = window.location.href.split("/");
//   let target = url[url.length - 1].toLowerCase();
//   let element = document.getElementById(target);

//   // Adjust view to display component with id from uri
//   element && element.scrollIntoView(smooth ? { behavior: "smooth", block: "start" } : { block: "start" });
// }