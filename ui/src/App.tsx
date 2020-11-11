import React, { useState, useRef } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import './App.css';
import { TUIQueryItem, TTextSummary } from './data.controller/data.types';
import DataController from './data.controller/data.controller';
import { scrollIntoViewHelper } from './utils';





function App() {

  let dc = useRef<DataController|null>(null);
  (dc.current === null) && (dc.current = new DataController());
  console.log('[App]: Data Controller Version: ', dc.current.getVersion())

  const [isModalActive, setIsModalActive] = useState<boolean>(false)


  return (
    <main className="App">
      <BrowserRouter>
        


        <Switch>
          <Redirect from="/*" to="/home" />
          <Route path="/home">
            <div id="home" className="screen screen-1">
              <div>Home Screen</div>
              {/* <Link to="/query">to Query</Link> */}
              <a href="/" onClick={evt => scrollIntoViewHelper(evt, "query")}>to Query</a>
            </div>
          </Route>
        </Switch>


          {/* <Route path="/query"> */}
            <div id="query" className="screen screen-2">
              <div>Query Screen</div>
              {/* <Link to="/results">to Results</Link> */}
              <a href="/" onClick={evt => scrollIntoViewHelper(evt, "results")}>to Results</a>
            </div>
          {/* </Route> */}



          {/* <Route path="/results"> */}
            <div id="results" className="screen screen-2">
              <div>Result Screen</div>
              <div>
                {/* <Link to="/query">to Query</Link> */}
                <a href="/" onClick={evt => scrollIntoViewHelper(evt, "query")}>to Query</a>
              </div>
              <div>
                {/* <Link to="/details">to Details</Link> */}
                <a href="/" onClick={evt => scrollIntoViewHelper(evt, "details")}>to Details</a>
              </div>
            </div>
          {/* </Route> */}



          {/* <Route path="/details"> */}
            <div id="details" className="screen screen-2">
              <div>Details Screen</div>
              {/* <Link to="/results">to Results</Link> */}
              <a href="/" onClick={evt => scrollIntoViewHelper(evt, "results")}>to Results</a>
            </div>
          {/* </Route> */}







        
      </BrowserRouter>


    </main>
  );
}

export default App;
