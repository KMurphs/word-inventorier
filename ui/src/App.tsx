import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import './utils/AnimateOnScroll/style.css';
// import { TUIQueryItem, TTextSummary } from './data.controller/data.types';
import { Home } from './components/Home';
import { Query } from './components/Query';
import { Details } from './components/Details';
import { Results } from './components/Results';
import ScrollToURI from './utils/ScrollToURI';
import { dataControllerContext, queryResultsContext } from './contexts/context';
import animateOnScroll from './utils/AnimateOnScroll';
import { useIntersect, thresholdsHelper } from './utils/useIntersect';





function App() {

  const [,waitingForServer,dataController] = useContext(dataControllerContext)
  console.log('[App]: Data Controller Version: ', dataController.getVersion())

  const queryResultsFromContext = useContext(queryResultsContext)
  const [h1Ref] = useIntersect({threshold: thresholdsHelper(4), onObservedIntersection: animateOnScroll});
  const [pRef] = useIntersect({threshold: thresholdsHelper(4), onObservedIntersection: animateOnScroll});
  const [msgRef] = useIntersect({threshold: thresholdsHelper(4), onObservedIntersection: animateOnScroll});
  const [linksRef] = useIntersect({threshold: thresholdsHelper(4), onObservedIntersection: animateOnScroll});


  return (
    <main className="App">
        <ScrollToURI timeout={0} />
        <BrowserRouter>
          

          <Switch>
            <Route exact path="/home">
              <div id="home" className="screen screen-1">
                <Home />
              </div>
            </Route>
            <Redirect from="/*" to="/home" />
          </Switch>



          <div id="query" className="screen screen-2">
            <Query />
          </div>

          <div id="results" className="screen screen-3">
            { (queryResultsFromContext || waitingForServer) && <Results />}
          </div>
          
          <div id="details" className="screen screen-4">
            { (queryResultsFromContext || waitingForServer) && <Details />}
          </div>

          <div id="footer" className="screen screen--footer">
            <h1 ref={h1Ref} data-aos="fade-down">Word Inventorier App</h1>
            <p ref={pRef} data-aos="fade-right" className="app-details">
              <span>Author: </span><span>Stephan K.</span>
              <span>Github Repository: </span><span><a href="https://github.com/KMurphs/word-inventorier" target="_blank" rel="noopener noreferrer">https://github.com/KMurphs/word-inventorier</a></span>
            </p>

            <h2>Contact Me</h2>
            <div ref={msgRef} data-aos="fade-left" className="contact-message"><p>Want to chat? Or have you got a question/Suggestion? <br/>Drop me a message. I'm always happy to engage with the community</p></div>
            <div ref={linksRef} data-aos="zoom-out" className="contact-links">
              <a href="https://github.com/KMurphs" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
              <a href="https://twitter.com/murphs_k" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="https://www.linkedin.com/in/stephane-kibonge/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
              <a href="https://codepen.io/kmurphs" target="_blank" rel="noopener noreferrer"><i className="fab fa-codepen"></i></a>
            </div>

          </div>

        </BrowserRouter>
    </main>
  );
}

export default App;
