import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ScrollToTop from "../../utils/ScrollToTop";
import { scrollIDIntoViewHelper } from "../../utils/utils";
import './Home.css';


// React router does not reliably handle scrolling to the current element 
// We need to resort to doing it ourselves
// Everytime this component is rendered, ScrollToTop is going to rendered, forcing a scroll back to top
export class Home extends React.Component {
  
  render() {
    return <div>
      <ScrollToTop/>
      <h1>Home Screen</h1>
      <a href="/" onClick={evt => scrollIDIntoViewHelper("query", evt)}>to Query</a>  
    </div>;
  }
}