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
import { dataControllerContext, QueryLengthRangeProvider } from './contexts/context';





function App() {

  // let dc = useRef<DataController|null>(null);
  // (dc.current === null) && (dc.current = new DataController());
  const [,,dataController] = useContext(dataControllerContext)
  console.log('[App]: Data Controller Version: ', dataController.getVersion())

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

          <div id="results" className="screen screen-3">
            <Results />
          </div>

          <div id="details" className="screen screen-4">
            <Details />
          </div>

          <div id="footer" className="screen screen--footer">
            <h1>Footer Screen</h1>
          </div>

        </BrowserRouter>
      </QueryLengthRangeProvider>
    </main>
  );
}

export default App;
