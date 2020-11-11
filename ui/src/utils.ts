// https://javascriptio.com/view/4915713/react-navigation-that-will-smooth-scroll-to-section-of-the-page
// https://codesandbox.io/s/falling-https-jwrj3?file=/src/App.tsx:636-686

export const scrollIntoViewHelper = (evt: any, targetID: string, targetURI?: string)=>{
  evt.preventDefault();
  const targetElmt = document.getElementById(targetID);
  targetElmt && targetElmt.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.pushState(targetID, targetID, `/${targetURI ? targetURI : targetID}`);
}

