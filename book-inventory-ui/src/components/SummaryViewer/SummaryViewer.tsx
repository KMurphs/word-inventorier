import React, { useState, useRef } from 'react';


import './SummaryViewer.css';
import { TUIQueryItem, TQuerySummary, TBookSummary } from '../../data.controller/data.types';




type TProps = {
  data: TBookSummary,
  onClose: ()=>void
}
const SummaryViewer: React.FC<TProps> = ({data, onClose}) => {

  return (
    <div className="summary-viewer">


      <div className="summary-meta">
        <h1>Meta Data</h1>
        <div className="data-container">
          <p>ID</p>
          <p className="data-item">{`${data.id.substr(0, 20)}... - ${data.idType}`}</p>
          <p>Info</p>
          <p className="data-item">{`${data.meta}${data.idType === 'book-hash' ? '...' : ''}`}</p>
          <p>Timestamp</p>
          <p className="data-item">{data._createdAt}</p>
          <p>Duration</p>
          <p className="data-item">{(data.summaryDurationSec).toFixed(2)}sec</p>
        </div>
      </div>


      <div className="summary-data">
        <h1>Summary</h1>
        <div className="data-container">
          <p>Words Count</p>
          <p className="data-item">{data.wordsCount}</p>
          <p>Unique Words</p>
          <p className="data-item">{data.uniqueWordsCount}</p>
        </div>

        <div className="data-container">
          <h3>{`Most Frequent word is '${data.mostFrequentWord.key}' with frequency '${data.mostFrequentWord.frequency}' and length '${data.mostFrequentWord.length}'`}</h3>
          <p>Token</p>
          <p>Frequency</p>
          <p>Length</p>
          <p className="data-item data-item-token">{data.mostFrequentWord.key}</p>
          <p className="data-item">{data.mostFrequentWord.frequency}</p>
          <p className="data-item">{data.mostFrequentWord.length}</p>
        </div>

        <div className="data-container">
          <h3>{`Longest word is '${data.longestWord.key}' with frequency '${data.longestWord.frequency}' and length '${data.longestWord.length}'`}</h3>
          <p>Token</p>
          <p>Frequency</p>
          <p>Length</p>
          <p className="data-item data-item-token">{data.longestWord.key}</p>
          <p className="data-item">{data.longestWord.frequency}</p>
          <p className="data-item">{data.longestWord.length}</p>
        </div>

              
      </div>





    </div>
  );


}

export default SummaryViewer;
