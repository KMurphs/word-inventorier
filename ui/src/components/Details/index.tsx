import React, { useContext, useState } from "react";
import { dataControllerContext, queryResultsContext } from "../../contexts/context";
import { TTokenSummary } from "../../data.controller/data.types";
import { scrollIDIntoViewHelper } from "../../utils/utils";
import { CSSLoaderDualRing } from "../CSSLoaders";
import { HistogramData, HistogramHeader } from "../Histogram/TwoCategorySymmetricHistogram";
import './style.css';
type SortParameters = {
  byLength: boolean,
  directionIsAscending: boolean,
}
export const Details = () => {

  const [sortParameters, setSortParameters] = useState<SortParameters>({byLength: false, directionIsAscending: false});


  const [, waitingForServer] = useContext(dataControllerContext)
  
  const queryResultsFromContext = useContext(queryResultsContext)
  const queryResults = queryResultsFromContext ? [...queryResultsFromContext.results[0].data] : []

  const mostFrequent: TTokenSummary = queryResultsFromContext ? {...queryResultsFromContext.mostFrequentWord} : { key: "", length: 0, frequency: 0 }
  const leastFrequent: TTokenSummary = queryResultsFromContext ? {...queryResultsFromContext.leastFrequentWord} : { key: "", length: 0, frequency: 0 }
  const longest: TTokenSummary = queryResultsFromContext ? {...queryResultsFromContext.longestWord} : { key: "", length: 0, frequency: 0 }
  const shortest: TTokenSummary = queryResultsFromContext ? {...queryResultsFromContext.shortestWord} : { key: "", length: 0, frequency: 0 }

  console.log({...sortParameters})
  sortParameters.byLength && queryResults.sort((a, b) => (a.length - b.length) * (sortParameters.directionIsAscending ? 1 : -1))
  !sortParameters.byLength && queryResults.sort((a, b) => (a.frequency - b.frequency) * (sortParameters.directionIsAscending ? 1 : -1))

  return (
    <div className="container details__container">


      <div className="details__header">
        <h1>
          <a className="btn btn--icon btn--secondary" href="/" onClick={evt => { scrollIDIntoViewHelper("results", evt)}}> 
            <i className="fas fa-angle-left"></i> 
          </a>  

          <span>Summary</span>

          <span className="btn btn--icon btn--secondary"></span>
        </h1>
      </div>




      <div className={`details__body ${waitingForServer ? "details__body--processing": ""}`}>
        <div className="details__processing">
          <p>We're processing your request.<br/>This shouldn't take more than a few moments...</p>
          <CSSLoaderDualRing />
        </div>
        
        
        
        
        
        <div className="details__data">

          <HistogramHeader onSort={
            (newValue) => setSortParameters(
              (current) => { 
                current.directionIsAscending = (current.byLength === newValue) ? !current.directionIsAscending : current.directionIsAscending;
                current.byLength = newValue;
                return {...current}
              }
            )}  isCompact={true}/>
            
          <HistogramData data={[...queryResults.map((item) => {
              return { category1Value: item.length, category1Annotation: "", category2Value: item.frequency, category2Annotation: ""}
            })]} category1Maximum={longest.length} category2Maximum={mostFrequent.frequency} isCompact={true}/>  

        </div>
      </div>
    </div>
  )
}