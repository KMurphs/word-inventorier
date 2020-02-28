import React, { useState, useRef } from 'react';


import './Query.css';
import { TUIQueryItem } from '../../data.controller/data.types';



type TProps = {
  data: TUIQueryItem,
  index: number,
  hasResults: boolean,
  onChange: ()=>void
  onRemove: ()=>void
  onView: ()=>void
}
const Query: React.FC<TProps> = ({data, index, onChange, onView, hasResults, onRemove}) => {


  return (
    <div className="query-container">

      <div className="query-header">
        <p className="query-index">Query&nbsp;{index}</p>
        <span className="query-icons">
          {
            hasResults && (
              <span className="query-result" onClick={evt=>onView()}>
                <i className="fas fa-eye"></i>
              </span>
            )
          }
          <span className="query-edit" onClick={evt=>onRemove()}><i className="fas fa-minus"></i></span>
          <span className="query-remove" onClick={evt=>onChange()}><i className="fas fa-pencil-alt"></i></span>
          
        </span>
      </div>

      <p className="query-text">
        {
          `Retrieve top ${data.topN} most frequent tokens from text with length between ${data.minLength} and ${data.maxLength}`
        }
      </p>
      
    </div>
  );


}

export default Query;
