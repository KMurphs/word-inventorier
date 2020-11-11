import React from "react";
import { scrollIDIntoViewHelper } from "../../utils/utils";
import './Results.css';


export class Results extends React.Component {
  render() {
    return <div>
      <h1>Results Screen</h1>
      <div>
        <a href="/" onClick={evt => scrollIDIntoViewHelper("query", evt)}>to Query</a>
      </div>
      <div>
        <a href="/" onClick={evt => scrollIDIntoViewHelper("details", evt)}>to Details</a>
      </div>
    </div>;
  }
}