import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ScrollToTop from "../../utils/ScrollToTop";
import { scrollIDIntoViewHelper } from "../../utils/utils";
import { CSSLoaderEllipsis } from "../CSSLoaders/CSSLoaders";
import './Home.css';


// React router does not reliably handle scrolling to the current element 
// We need to resort to doing it ourselves
// Everytime this component is rendered, ScrollToTop is going to rendered, forcing a scroll back to top
export class Home extends React.Component {
  
  render() {
    return <div className="home__container">
      <ScrollToTop/>
      <div className="home__background"></div>
      <div className="home__header">
        <h1>Word Inventorier</h1>
        <p>This app will inventory text and allow querying for most frequent words with lengths ranges</p>
      </div>
      <div className="home__body">
        <p><CSSLoaderEllipsis/><br/>Let's start by entering some text to get going. Or, the URL to an online text file...</p>
        
        

        <a className="btn btn--icon" href="/" onClick={evt => scrollIDIntoViewHelper("query", evt)}> 
          <i className="fas fa-pencil-alt"></i>
          <span className="btn__text">Start Exploring!</span>    
        </a> 

        <span></span>
        
      </div>
    </div>;
  }
}