import React, { useContext } from 'react';
import './index.css';
import bodyImage from './assets/undraw_Bibliophile_hwqc.svg'; 
import leftArrow from './assets/LeftArrow.svg';
import { QueryResultLimitSpan, QueryMinLengthSpan, QueryMaxLengthSpan, queryResultLimitContext } from '../../contexts';
import { TwoRangeInputWithContext } from '../TwoRangeInput/withContext';

interface Props {
  onSubmit: (evt: any)=>void,
  onEnterText: (evt: any)=>void
}

export default function RangeScreen({onSubmit, onEnterText}: Props) {

  const [queryResultLimit, setQueryResultLimit] = useContext(queryResultLimitContext);


  return (
    <div className="RangeScreen flex flex-col h-full">
      <header className="component-header">
        <h2><span className="hidden">2</span>Set a Range of Lengths</h2>
      </header>

      <main className="component-body"> 
        <div className="component-body__image"><img src={bodyImage} alt="launch rocket"/></div>

        

        <div className="input-group" >
          <TwoRangeInputWithContext />
          <span className="text-muted">
            The Application will retrieve the top <QueryResultLimitSpan /> most frequent words 
            with length between <QueryMinLengthSpan /> and <QueryMaxLengthSpan />
          </span>
          <label htmlFor="query-limit" className="flex ml-auto query-limit-container lg:ml-0">
            <span>Limit results to the top: </span>
            <span className="query-limit-value"><input type="number" value={queryResultLimit} onChange={evt=>setQueryResultLimit(parseInt((evt.target as HTMLInputElement).value))}/></span>
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
