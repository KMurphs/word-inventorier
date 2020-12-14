import React from 'react';
import DetailedResultsFromContext from '../DetailedResultsScreen/withContext';
import ResultScreenFromContext from '../ResultScreen/withContext';
// import bannerImage from './assets/undraw_file_analysis_8k9b 2.svg';
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
    <div className="results flex w-full h-full">



      <section className="super-group justify-center banner hidden lg:flex lg:flex-4/12 md:pl-32">
        
        <div className={`group h-full lg:h-auto ${true ? '' : 'hidden lg:flex'}`}> 
          <h1>Hello</h1>
        </div>
        
      </section>
      


      <section className={`super-group flex-12/12 md:flex-6/12 lg:flex-4/12 lg:p-8 lg:justify-between relative h-full ${displayResultsScreen ? '' : 'hidden lg:flex'}`}>
        
        <div className={`group h-full lg:h-auto `}> 
          <ResultScreenFromContext onNewQuery={onNewQuery} onDetailedResults={onDetailedResults}/>
        </div>
        
      </section>
      


      <section className={`super-group flex-12/12 md:flex-6/12 lg:flex-4/12 lg:p-8 lg:justify-between relative h-full ${displayDetailedResults ? '' : 'hidden lg:flex'}`}>

        <div className={`group h-full lg:h-auto lg:pt-12`}> 
          <DetailedResultsFromContext onNewQuery={onNewQuery} onResults={onResults}/>
        </div>

      </section>



    </div>
  );
}