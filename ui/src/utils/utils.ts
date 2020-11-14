// https://javascriptio.com/view/4915713/react-navigation-that-will-smooth-scroll-to-section-of-the-page
// https://codesandbox.io/s/falling-https-jwrj3?file=/src/App.tsx:636-686

export const scrollIDIntoViewHelper = (targetID: string, clickEvent: any, targetURI?: string)=>{
  
  // We are essentially hijacking the click event which does not really work with react router
  clickEvent && clickEvent.preventDefault && clickEvent.preventDefault();

  // Scroll element with provided id into view
  const targetElmt = document.getElementById(targetID);
  targetElmt && targetElmt.scrollIntoView({ behavior: "smooth", block: "start" });

  // Update the url
  window.history.pushState(targetID, targetID, `/${targetURI ? targetURI : targetID}`);
}

export const scrollURLIDIntoViewHelper = (smooth: boolean = false)=>{
  
  // This function assumes that the last uri corresponds to the id of the element
  // that must be scrolled into view
  let url = window.location.href.split("/");
  let target = url[url.length - 1].toLowerCase();
  let element = document.getElementById(target);

  // Adjust view to display component with id from uri
  element && element.scrollIntoView(smooth ? { behavior: "smooth", block: "start" } : { block: "start" });
}




