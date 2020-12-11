import React from 'react';
import RangeScreen from '../RangeScreen';
import TextScreen from '../TextScreen';
import bannerImage from './assets/undraw_file_analysis_8k9b 2.svg';
import './index.css';

type Props = {
  onEnterText: ()=>void,
  onSetRange: ()=>void,
  onResults: ()=>void,
  displayTextScreen: boolean,
  displayRangeScreen: boolean,
}
export default function QueryForm({onEnterText, onSetRange, onResults, displayTextScreen, displayRangeScreen}: Props) {
  return (
    <div className="query-form flex w-full h-full">



      <section className="super-group md:flex-6/12 lg:p-8 lg:justify-between relative form-container">
        
        <div className={`group h-full lg:h-auto ${displayTextScreen ? '' : 'hidden lg:flex'}`}> 
          <TextScreen onSubmit={onResults} onSetRange={onSetRange}/>
        </div>
        <div className={`group h-full lg:h-auto ${displayRangeScreen ? '' : 'hidden lg:flex'} lg:pt-12`}> 
          <RangeScreen onSubmit={onResults} onEnterText={onEnterText}/>
        </div>
        
      </section>
      



      <section className="super-group justify-center banner hidden md:flex md:flex-6/12 md:pl-32">

        <div className="group justify-start flex-6/12 flex-col">
          <h1>This will just take a minute!</h1>
          <h2>We just need a couple of details</h2>
        </div>
        <div className="group flex-image-container flex-6/12 justify-start">
          <img className="ml-0" src={bannerImage} alt="Woman reading book"/>
        </div>

      </section>



    </div>
  );
}