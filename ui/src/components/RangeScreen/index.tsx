import React from 'react';
import './index.css';
import bodyImage from './assets/undraw_Bibliophile_hwqc.svg'; 
import leftArrow from './assets/LeftArrow.svg';
import { QueryResultLimitSpan, QueryMinLengthSpan, QueryMaxLengthSpan } from '../../contexts';
import { TwoRangeInputWithContext } from '../TwoRangeInput/withContext';

interface Props {
  onSubmit: (evt: any)=>void,
  onEnterText: (evt: any)=>void
}

export default function RangeScreen({onSubmit, onEnterText}: Props) {



  return (
    <div className="RangeScreen flex flex-col h-full">
      <header className="component-header">
        <h2>Set a Range of Lengths</h2>
      </header>

      <main className="component-body"> 
        <div className="component-body__image"><img src={bodyImage} alt="launch rocket"/></div>

        

        <div className="input-group" >
          <TwoRangeInputWithContext />
          <span className="text-muted">
            The Application will retrieve the top <QueryResultLimitSpan /> most frequent words 
            with length between <QueryMinLengthSpan /> and <QueryMaxLengthSpan />
          </span>
          <label htmlFor="query-limit" className="flex ml-auto query-limit-container">
            <span>Limit results to the top: </span>
            <span className="query-limit-value"><input type="number" value={9999} onChange={evt=>{}}/></span>
          </label>
        </div>

      </main>


      <footer className="component-footer">
        <button className="btn btn-tertiary flex-row-reverse" onClick={onEnterText}>
          <span>Enter New Text</span>
          <span className="icon"><img src={leftArrow} alt="left arrow"/></span>
        </button>
        <button className="btn w-full" onClick={onSubmit}><span>Submit</span></button>
      </footer>
    </div>
  );
}
