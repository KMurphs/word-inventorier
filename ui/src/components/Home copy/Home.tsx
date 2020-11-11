import React from "react";
import { scrollIDIntoViewHelper } from "../../utils/utils";
import './Home.css';
export class Home extends React.Component {
  render() {
    return <div>
      <h1>Home Screen</h1>
      <a href="/" onClick={evt => scrollIDIntoViewHelper("query", evt)}>to Query</a>  
    </div>;
  }
}