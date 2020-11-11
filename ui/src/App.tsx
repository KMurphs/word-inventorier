import React, { useState, useRef } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import './App.css';
import { TUIQueryItem, TTextSummary } from './data.controller/data.types';
import DataController from './data.controller/data.controller';
import { scrollIDIntoViewHelper } from './utils/utils';
import { Home } from './components/Home/Home';
import { Query } from './components/Query/Query';
import { Details } from './components/Details/Details';
import { Results } from './components/Results/Results';





function App() {

  let dc = useRef<DataController|null>(null);
  (dc.current === null) && (dc.current = new DataController());
  console.log('[App]: Data Controller Version: ', dc.current.getVersion())

  const [isModalActive, setIsModalActive] = useState<boolean>(false)


  return (
    <main className="App">
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
          <Results />
        </div>

        <div id="details" className="screen screen-4">
          <Details />
        </div>



      </BrowserRouter>
    </main>
  );
}

export default App;
