import React, { useContext, useState } from "react";
import { dataControllerContext, queryResultsContext } from "../../contexts/context";
import { TTokenSummary } from "../../data.controller/data.types";
import animateOnScroll from "../../utils/AnimateOnScroll";
import { thresholdsHelper, useIntersect } from "../../utils/useIntersect";
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
  const longest: TTokenSummary = queryResultsFromContext ? {...queryResultsFromContext.longestWord} : { key: "", length: 0, frequency: 0 }


  sortParameters.byLength && queryResults.sort((a, b) => (a.length - b.length) * (sortParameters.directionIsAscending ? 1 : -1))
  !sortParameters.byLength && queryResults.sort((a, b) => (a.frequency - b.frequency) * (sortParameters.directionIsAscending ? 1 : -1))


  const [titleRef] = useIntersect({threshold: thresholdsHelper(4), onObservedIntersection: animateOnScroll});
  const [graphRef] = useIntersect({threshold: thresholdsHelper(4), onObservedIntersection: animateOnScroll});
  const [group1Ref] = useIntersect({threshold: thresholdsHelper(100), onObservedIntersection: animateOnScroll});
  const [group2Ref] = useIntersect({threshold: thresholdsHelper(100), onObservedIntersection: animateOnScroll});




  return (
    <div className="container details__container">


      <div className="details__header">
        <h1 ref={titleRef} data-aos="fade-up">
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
        
        
        
        
        
        <div className="details__data"  >

          <div className="details__data-graph" ref={graphRef} data-aos="fade-left">
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


          <div className="details__data-text">

            <div className="details__data-text__group">
              <h2>Text Processing Results</h2>
              <div className="details__data-text__subgroup" ref={group1Ref} data-aos="fade-right">
                <h3>Text Meta Data</h3>
                <div><span>Text ID: </span><span>{queryResultsFromContext?.id}</span></div>
                <div><span>Text Type: </span><span>{queryResultsFromContext?.idType}</span></div>
                <div><span>Text Info: </span><span>{queryResultsFromContext?.meta}</span></div>
                <div><span>Text was Submitted at: </span><span>{queryResultsFromContext?._createdAt}</span></div>
                <div><span>Text was Processed In: </span><span>{((queryResultsFromContext?.summaryDurationSec || 0) / 1000).toFixed(2)}sec</span></div>
              </div>
              <div className="details__data-text__subgroup">
                <h3>Text Summary</h3>
                <div><span>Word Count: </span><span>{queryResultsFromContext?.wordsCount}</span></div>
                <div><span>Unique Words: </span><span>{queryResultsFromContext?.uniqueWordsCount}</span></div>
                <div><span>Most Frequent Word: </span><span><span>{queryResultsFromContext?.mostFrequentWord.key}</span><span><span><span>Frequency: </span>{queryResultsFromContext?.mostFrequentWord.frequency}</span><span><span>Length: </span>{queryResultsFromContext?.mostFrequentWord.length}</span></span></span></div>
                <div><span>Least Frequent Word: </span><span><span>{queryResultsFromContext?.leastFrequentWord.key}</span><span><span><span>Frequency: </span>{queryResultsFromContext?.leastFrequentWord.frequency}</span><span><span>Length: </span>{queryResultsFromContext?.leastFrequentWord.length}</span></span></span></div>
                <div><span>Longest Word: </span><span><span>{queryResultsFromContext?.longestWord.key}</span><span><span><span>Frequency: </span>{queryResultsFromContext?.longestWord.frequency}</span><span><span>Length: </span>{queryResultsFromContext?.longestWord.length}</span></span></span></div>
                <div><span>Shortest Word: </span><span><span>{queryResultsFromContext?.shortestWord.key}</span><span><span><span>Frequency: </span>{queryResultsFromContext?.shortestWord.frequency}</span><span><span>Length: </span>{queryResultsFromContext?.shortestWord.length}</span></span></span></div>
              </div>
            </div>


            <div className="details__data-text__group" ref={group2Ref} data-aos="fade-right">
              <h2>Query Processing Results</h2>
              <div className="details__data-text__subgroup">
                <h3>Query Parameters</h3>
                <div><span>Most Frequent Tokens Retrieved: </span><span>{queryResultsFromContext?.results[0].uiQuery.topN}</span></div>
                <div><span>Token Minimum Length: </span><span>{queryResultsFromContext?.results[0].uiQuery.minLength}</span></div>
                <div><span>Token Maximum Length: </span><span>{queryResultsFromContext?.results[0].uiQuery.maxLength}</span></div>
              </div>
              <div className="details__data-text__subgroup">
                <h3>Query Summary</h3>
                <div><span>Query was Submitted at: </span><span>{queryResultsFromContext?.results[0]._createdAt}</span></div>
                <div><span>Query was Processed in: </span><span>{((queryResultsFromContext?.results[0].durationMs || 0) / 1000).toFixed(2)}sec</span></div>
              </div>
            </div>



          </div>

        </div>
      </div>
    </div>
  )
}