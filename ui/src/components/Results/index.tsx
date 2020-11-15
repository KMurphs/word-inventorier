import React, { useContext } from "react";
import { dataControllerContext } from "../../contexts/context";
import { scrollIDIntoViewHelper } from "../../utils/utils";
import './style.css';

export const Results = () => {

  const [, waitingForServer] = useContext(dataControllerContext)


  return (
    <div>
      <h1>Results Screen</h1>
      {!waitingForServer && <p>Is Processing</p>}
      <div>
        <a href="/" onClick={evt => scrollIDIntoViewHelper("query", evt)}>to Query</a>
      </div>
      <div>
        <a href="/" onClick={evt => scrollIDIntoViewHelper("details", evt)}>to Details</a>
      </div>
    </div>
  )
}