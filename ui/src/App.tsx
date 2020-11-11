import React, { useState, useRef } from 'react';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import './App.css';
import { TUIQueryItem, TTextSummary } from './data.controller/data.types';
import DataController from './data.controller/data.controller';




function App() {

  let dc = useRef<DataController|null>(null);
  (dc.current === null) && (dc.current = new DataController());
  console.log('[App]: Data Controller Version: ', dc.current.getVersion())

  const [isModalActive, setIsModalActive] = useState<boolean>(false)


  return (
    <main className="App">
      <BrowserRouter>
        <Switch>



          <Route path="/query">
            <div id="query" className="screen screen-2">
              <div>Query Screen</div>
              <Link to="/results">to Results</Link>
            </div>
          </Route>



          <Route path="/results">
            <div id="results" className="screen screen-2">
              <div>Result Screen</div>
              <div>
                <Link to="/query">to Query</Link>
              </div>
              <div>
                <Link to="/details">to Details</Link>
              </div>
            </div>
          </Route>



          <Route path="/details">
            <div id="details" className="screen screen-2">
              <div>Details Screen</div>
              <Link to="/results">to Results</Link>
            </div>
          </Route>



          <Route path="/">
            <div id="home" className="screen screen-1">
              <div>Home Screen</div>
              <Link to="/query">to Query</Link>
            </div>
          </Route>



        </Switch>
      </BrowserRouter>


    </main>
  );
}

export default App;
