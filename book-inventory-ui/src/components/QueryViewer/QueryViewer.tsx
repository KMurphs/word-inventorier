import React, { useState, useRef } from 'react';


import './QueryViewer.css';
import {  TQuerySummary } from '../../data.controller/data.types';




type TProps = {
  data: TQuerySummary,
  onClose: ()=>void
}
const QueryViewer: React.FC<TProps> = ({data, onClose}) => {

  return (
    <div className="query-viewer">


      <div className="query-meta">
        <h1>Meta Data</h1>
        <div className="data-container">
          <p>Query Timestamp</p>
          <p className="data-item">{data._createdAt}</p>
          <p>Query Duration</p>
          <p className="data-item">{(data.durationMs/1000).toFixed(2)}sec</p>
        </div>
      </div>


      <div className="query-object">
        <h1>Query Summary</h1>
        <h3>Searching for top '{data.uiQuery.topN}' most frequent tokens with length between '{data.uiQuery.minLength}' and '{data.uiQuery.maxLength}'</h3>
        <div className="data-container">
          <p>Token Count</p>
          <p>Minimum Length</p>
          <p>Maximum Length</p>
          <p className="data-item">{data.uiQuery.topN}</p>
          <p className="data-item">{data.uiQuery.minLength}</p>
          <p className="data-item">{data.uiQuery.maxLength}</p>
        </div>
      </div>

      <div className="query-result">
        <h1>Query Results</h1>

        {
          data.data.map(res => {
            return (
              <div className="data-container">
                <h3>{`Found '${res.key}' with frequency '${res.frequency}' and length '${res.length}'`}</h3>
                <p>Token</p>
                <p>Frequency</p>
                <p>Length</p>
                <p className="data-item data-item-token">{res.key}</p>
                <p className="data-item">{res.frequency}</p>
                <p className="data-item">{res.length}</p>
              </div>
            )
          })
        }


      </div>

    </div>
  );


}

export default QueryViewer;
