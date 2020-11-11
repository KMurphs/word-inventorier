import React from "react";
import { scrollIDIntoViewHelper } from "../../utils/utils";
import './Query.css';
export class Query extends React.Component {
  render() {
    return <div>
      <h1>Query Screen</h1>
      <a href="/" onClick={evt => scrollIDIntoViewHelper("results", evt)}>to Results</a>
    </div>;
  }
}