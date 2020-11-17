import React, { useContext, useRef, useState } from "react";
import { dataControllerContext, queryResultsContext } from "../../contexts/context";
import { TTokenSummary } from "../../data.controller/data.types";
import { scrollIDIntoViewHelper } from "../../utils/utils";
import { CSSLoaderDualRing } from "../CSSLoaders";
import { 
  TwoCategorySymmetricHistogramHeader as HistogramHeader,
  TwoCategorySymmetricHistogramData as HistogramData,
} from "../Histogram";
import { InputWithMovingChangingLabelWithContext } from "../InputWithMovingLabel/withContext";
import { TwoRangeInputWithContext } from "../TwoRangeInput/withContext";
import './style.css';

type SortParameters = {
  byLength: boolean,
  directionIsAscending: boolean,
}
export const Results = () => {

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
    <div className="container results__container">


      <div className="results__header">
        <h1>
          <a className="btn btn--icon btn--secondary" href="/" onClick={evt => { scrollIDIntoViewHelper("query", evt) }}> 
            <i className="fas fa-angle-left"></i> 
          </a>  

          <span>Results</span>

          {
            waitingForServer 
            ? (
              <span className="btn btn--icon btn--secondary"></span>
            )
            : (
              <a className="btn btn--icon btn--secondary" href="/" onClick={evt => { scrollIDIntoViewHelper("details", evt) }}> 
                <i className="fas fa-angle-right"></i>  
              </a>  
            )
          }

        </h1>
      </div>




      <div className={`results__body ${waitingForServer ? "results__body--processing": ""}`}>


        <div className="results__processing">
          <p>We're processing your request.<br/>This shouldn't take more than a few moments...</p>
          <CSSLoaderDualRing />
        </div>

        
        <div className="results__data">
  
          <HistogramHeader onSort={
            (newValue) => setSortParameters(
              (current) => { 
                current.directionIsAscending = (current.byLength === newValue) ? !current.directionIsAscending : current.directionIsAscending;
                current.byLength = newValue;
                return {...current}
              }
            )}/>

          <HistogramData data={[
              { label: mostFrequent.key, category1Value: mostFrequent.length, category1Annotation: "", category2Value: mostFrequent.frequency, category2Annotation: "Most Frequent"},
              { label: leastFrequent.key, category1Value: leastFrequent.length, category1Annotation: "Least Frequent", category2Value: leastFrequent.frequency, category2Annotation: ""},
              { label: longest.key, category1Value: longest.length, category1Annotation: "Longest", category2Value: longest.frequency, category2Annotation: ""},
              { label: shortest.key, category1Value: shortest.length, category1Annotation: "", category2Value: shortest.frequency, category2Annotation: "Shortest"},
            ]}/>

          <hr/>

          <HistogramData data={[...queryResults.map((item) => {
            return { label: item.key, category1Value: item.length, category1Annotation: "", category2Value: item.frequency, category2Annotation: ""}
          })]} category1Maximum={longest.length} category2Maximum={mostFrequent.frequency}/>  
        </div>

        
        {/* <div className="results__controls" ref={inputRef} data-aos="fade-right"> */}
          {/* <TwoRangeInputWithContext /> */}
          {/* <p>Adjust Range of Lengths on Query</p> */}
          {/* <InputWithMovingChangingLabelWithContext /> */}
        {/* </div> */}


      </div>
    </div>
  )
}