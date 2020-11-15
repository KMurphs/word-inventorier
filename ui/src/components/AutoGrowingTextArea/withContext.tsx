import React, { useContext } from "react";
import { AutoGrowingTextArea } from ".";
import { queryTextToProcessContext } from "../../contexts/context";
import './style.css';



type Props = {}
export const AutoGrowingTextAreaWithContext = () => {

  const [queryText, setQueryText] = useContext(queryTextToProcessContext);
  return (
    <AutoGrowingTextArea text={queryText} setText={setQueryText}/>
  )

}
AutoGrowingTextAreaWithContext.defaultProps = {};
