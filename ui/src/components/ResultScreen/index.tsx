import React from 'react';
import { TTokenSummary } from '../data.controller/data.types';
import dots from './assets/3 Vertical Dots.svg';
import freqSort from './assets/Frequency Sort.svg';
import lenSort from './assets/Length Sort.svg';
import './index.css';

export type Props = {
  data: TTokenSummary[],
  onNewQuery: ()=>void,
  onDetailedResults: ()=>void,
  onSortByLength: ()=>void,
  onSortByFrequency: ()=>void,
}

export default function ResultScreen({data, onNewQuery, onDetailedResults, onSortByLength, onSortByFrequency}: Props) {

  const coerceToPercentage = coerce.bind(null, 0, 100)

  const [maxLengths, maxFrequencies] = data.reduce(
    (acc, {frequency, length}) => {
      return [ 
        length > acc[0] ? length : acc[0], 
        frequency > acc[1] ? frequency : acc[1] 
      ]
    }, 
    [-1, -1]
  )


  return (
    <div className="ResultScreen w-full h-full flex flex-col">
      
      <header className="component-header lg:pl-12 mb-8 flex align-center">
        <h2>Explore Results</h2>
        <button className="btn btn-tertiary ml-auto flex align-center lg:hidden" onClick={onDetailedResults}>
          <span>More</span>
          <span className="icon"><img src={dots} alt="left arrow"/></span>
        </button>
      </header>

      <div className="word-item__header flex w-full justify-between mb-4">
        <button className="btn btn-tertiary mr-auto flex align-center btn--length" onClick={onSortByLength}>
          <span className={`icon ${maxLengths === data[0].length ? "flip-180" : ""}`}><img src={lenSort} alt="left arrow"/></span>
          <span>Length</span>
        </button>
        <button className="btn btn-tertiary ml-auto flex align-center" onClick={onSortByFrequency}>
          <span>Frequency</span>
          <span className={`icon ${maxFrequencies === data[0].frequency ? "" : "flip-180"}`}><img src={freqSort} alt="left arrow"/></span>
        </button>
      </div>

      <ul className="overflow-y-auto">

        {
          data.map(({key, frequency, length}, index) => (
            <li key={index} className="grid word-item word-item--large-">

              <span className="word-item__key">{key}</span>
              <span className="word-item__frequency-text">{frequency}</span>
              <span className="word-item__length-text ">{length}</span>
              <span className="word-item__frequency-bar" style={{width: `${coerceToPercentage(100*frequency/maxFrequencies)}%`}}></span>
              <span className="word-item__length-bar" style={{width: `${coerceToPercentage(100*length/maxLengths)}%`}}></span>


            </li>
          ))
        }
      </ul>


      <footer className="component-footer lg:hidden">
        <button className="btn btn-secondary w-full mt-8 lg:mt-0" onClick={onNewQuery}><span>New Query</span></button>
      </footer>


    </div>
  );
}

const coerce = (low: number, high: number, val: number) => {
  if(low > high) return val;
  if(val < low) return low;
  if(val > high) return high;
  return val;
}