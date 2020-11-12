import React from "react";
import { scrollIDIntoViewHelper } from "../../utils/utils";
import './style.css';


export class Details extends React.Component {
  render() {
    return <div>
      <h1>Details Screen</h1>
      <a href="/" onClick={evt => scrollIDIntoViewHelper("results", evt)}>to Results</a>
    </div>;
  }
}