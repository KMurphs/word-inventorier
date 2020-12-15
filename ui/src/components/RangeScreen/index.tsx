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
    <div className="RangeScreen flex flex-col h-full w-full justify-between">
      <header className="component-header lg:pl-12 mb-8">
        <h2><span className="hidden lg:inline-flex query-form-section-number">2</span>Set a Range of Lengths</h2>
      </header>

      <main className="component-body lg:pl-12 flex-2/12 flex flex-col lg:block flex-grow"> 
        <div className="component-body__image flex-image-container lg:hidden flex-1/12 flex-grow"><img src={bodyImage} alt="launch rocket"/></div>

        

        <div className="input-group mt-4 lg:mt-0 mb-12 lg:mb-0 flex-1/12" >
          <TwoRangeInputWithContext lowLimit={0} highLimit={50}/>
          <span className="text-muted text-sm mb-4 lg:my-8">
            The Application will retrieve the top <QueryResultLimitSpan /> most frequent words 
            with length between <QueryMinLengthSpan /> and <QueryMaxLengthSpan />
          </span>
          <label htmlFor="query-limit" className="flex ml-auto query-limit-container lg:ml-0 align-baseline">
            <span className="text-muted">Limit results to the top: </span>
            <span className="ml-2 query-limit-value"><input type="number" value={queryResultLimit} onChange={evt=>setQueryResultLimit(parseInt((evt.target as HTMLInputElement).value))}/></span>
          </label>
        </div>

      </main>


      <footer className="component-footer lg:pt-12">
        <button className="btn btn-tertiary flex-row-reverse lg:hidden mr-auto" onClick={onEnterText}>
          <span>Enter New Text</span>
          <span className="icon"><img src={leftArrow} alt="left arrow"/></span>
        </button>
        <button className="btn w-full mt-8 lg:mt-0" onClick={onSubmit}><span>Submit</span></button>
      </footer>
    </div>
  );
}
