import React from 'react';
import DetailedResultsFromContext from '../DetailedResultsScreen/withContext';
import ResultScreenFromContext from '../ResultScreen/withContext';
// import bannerImage from './assets/undraw_file_analysis_8k9b 2.svg';
import arrow from './assets/Vector.svg';
import './index.css';

export type Props = {
  displayResultsScreen: boolean, 
  displayDetailedResults: boolean, 
  onNewQuery: ()=>void,
  onDetailedResults: ()=>void,
  onResults: ()=>void
}
export default function Results({displayResultsScreen, displayDetailedResults, onNewQuery, onDetailedResults, onResults}: Props) {
  return (
    <div className="results flex w-full h-full justify-between">



      <section className="super-group justify-start banner hidden xl:flex lg:flex-2/12 md:pl-32-">
        
        <div className={`group h-full lg:h-auto  side-bar justify-start  ${true ? '' : 'hidden lg:flex'}`}> 
          <button onClick={onNewQuery} className="m-auto"><img src={arrow} alt="Button to start over"/></button>
          <h2 className="mt-16 mb-8">Good Exploring!</h2>
          <h3>To restart and submit a new Query, Click on the arrow above!</h3>
        </div>
        
      </section>
      


      <section className={`super-group flex-12/12 md:flex-5/12 xl:flex-4/12 xl:mx-8 -lg:p-8 lg:justify-between relative h-full flex-grow lg:flex-grow-0 ${displayResultsScreen ? '' : 'hidden lg:flex'}`}>
        
        <div className={`group h-full lg:h-auto `}> 
          <ResultScreenFromContext onNewQuery={onNewQuery} onDetailedResults={onDetailedResults}/>
        </div>
        
      </section>
      


      <section className={`super-group detailed-results flex-12/12 md:flex-5/12 xl:flex-4/12 -lg:p-8 lg:justify-between relative h-full flex-grow lg:flex-grow-0 ${displayDetailedResults ? '' : 'hidden lg:flex'}`}>

        <div className={`group h-full lg:h-auto lg:pt-12`}> 
          <DetailedResultsFromContext onNewQuery={onNewQuery} onResults={onResults}/>
        </div>

      </section>



    </div>
  );
}