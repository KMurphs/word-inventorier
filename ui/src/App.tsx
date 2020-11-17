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
import { dataControllerContext, QueryLengthRangeProvider, queryResultsContext } from './contexts/context';





function App() {

  // let dc = useRef<DataController|null>(null);
  // (dc.current === null) && (dc.current = new DataController());
  const [,,dataController] = useContext(dataControllerContext)
  console.log('[App]: Data Controller Version: ', dataController.getVersion())

  const queryResultsFromContext = useContext(queryResultsContext)

  // const [isModalActive, setIsModalActive] = useState<boolean>(false)

  // window.addEventListener('resize', ()=>setTimeout(scrollURLIDIntoViewHelper, 250));


  return (
    <main className="App">
      <QueryLengthRangeProvider>
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

          {
            queryResultsFromContext && (

              <React.Fragment>
                <div id="results" className="screen screen-3">
                  <Results />
                </div>
          
                <div id="details" className="screen screen-4">
                  <Details />
                </div>
              </React.Fragment>

            )
          }

          <div id="footer" className="screen screen--footer">
            <h1>Word Inventorier App</h1>
            <p className="app-details">
              <span>Author: </span><span>Stephan K.</span>
              <span>Github Repository: </span><span><a href="https://github.com/KMurphs/word-inventorier" target="_blank">https://github.com/KMurphs/word-inventorier</a></span>
            </p>

            <h2>Contact Me</h2>
            <div className="contact-message"><p>Want to chat? Got a question/Suggestion? Drop me a message. <br/>I'm always happy to engage with the community</p></div>
            <div className="contact-links">
              <a href="https://github.com/KMurphs" target="_blank"><i className="fab fa-github"></i></a>
              <a href="https://twitter.com/murphs_k" target="_blank"><i className="fab fa-twitter"></i></a>
              <a href="https://www.linkedin.com/in/stephane-kibonge/" target="_blank"><i className="fab fa-linkedin"></i></a>
              <a href="https://codepen.io/kmurphs" target="_blank"><i className="fab fa-codepen"></i></a>
            </div>

          </div>

        </BrowserRouter>
      </QueryLengthRangeProvider>
    </main>
  );
}

export default App;
