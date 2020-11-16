import React, { useContext } from "react";
import { dataControllerContext, queryResultsContext } from "../../contexts/context";
import { scrollIDIntoViewHelper } from "../../utils/utils";
import { CSSLoaderDualRing } from "../CSSLoaders";
import { 
  TwoCategorySymmetricHistogramHeader as HistogramHeader,
  TwoCategorySymmetricHistogramData as HistogramData,
} from "../Histogram";
import './style.css';

export const Results = () => {

  const [, waitingForServer] = useContext(dataControllerContext)
  const queryResultsFromContext = useContext(queryResultsContext)
  const queryResults = queryResultsFromContext ? {...queryResultsFromContext.results} : null

  return (
    <div className="container results__container">


      <div className="results__header">
        <h1>
          <a className="btn btn--icon btn--secondary" href="/" onClick={evt => { scrollIDIntoViewHelper("query", evt)}}> 
            <i className="fas fa-angle-left"></i> 
          </a>  

          <span>Results</span>

          <a className="btn btn--icon btn--secondary" href="/" onClick={evt => { scrollIDIntoViewHelper("details", evt)}}> 
            <i className="fas fa-angle-right"></i>  
          </a>  
        </h1>
      </div>




      <div className={`results__body ${waitingForServer ? "results__body--processing": ""}`}>


        <div className="results__processing">
          <p>We're processing your request.<br/>This shouldn't take more than a few moments...</p>
          <CSSLoaderDualRing />
        </div>

        
        <div className="results__data">
  
          <HistogramHeader />


          <HistogramData data={[
              {category1Value: 2, category1Annotation: "fsdf", category2Value: 12, category2Annotation: "dsf"},
              {category1Value: 10, category1Annotation: "fsdf", category2Value: 20, category2Annotation: "dsf"},
              {category1Value: 5, category1Annotation: "fsdf", category2Value: 200, category2Annotation: "dsf"},
              {category1Value: 3, category1Annotation: "fsdf", category2Value: 2, category2Annotation: "dsf"},
            ]}/>

          <hr/>

          <HistogramData data={[
              {label: "dasdasd", category1Value: 2,  category2Value: 12},
              {label: "dasdasd", category1Value: 10, category2Value: 20},
              {label: "dasdasd", category1Value: 5,  category2Value: 200},
              {label: "dasdasd", category1Value: 3,  category2Value: 2},
            ]}/>  
        </div>


      </div>
    </div>
  )
}