import React, { useContext, useState } from 'react';
import './index.css';
import bodyImage from './assets/undraw_file_analysis_8k9b.svg'; 
import bodyImageAlt from './assets/undraw_file_analysis_8k9b 2.svg'; 
import leftArrow from './assets/LeftArrow.svg';
import { QueryLinkInput, QueryTextInput } from '../InputWithMovingLabel/withAppContext';
import { QueryFileInput } from '../FileInput/withAppContext';
import { queryContentContext } from "../../contexts";

interface Props {
  onSubmit: (evt: any)=>void,
  onSetRange: (evt: any)=>void
}

export default function TextScreen({onSubmit, onSetRange}: Props) {

  const [currentInputType, setCurrentInputType] = useState<number>(0);
  const [, setQueryContent] = useContext(queryContentContext);


  const handleInputTypeChange = (evt: any, nextInputType: number) => {
    evt.preventDefault();
    setCurrentInputType(nextInputType);
    setQueryContent("");
  }




  return (
    <div className="TextScreen flex flex-col h-full w-full justify-between">
      <header className="component-header lg:pl-12 mb-8">
        <h2><span className="hidden lg:inline-flex query-form-section-number">1</span>Enter Some Text</h2>
      </header>

      <main className="component-body lg:pl-12 flex-2/12 flex flex-col lg:block flex-grow"> 
        {(currentInputType !== 1) && (<div className="component-body__image flex-image-container lg:hidden flex-1/12 flex-grow"><img src={bodyImage} alt="launch rocket"/></div>)}
        {(currentInputType === 1) && (<div className="component-body__image flex-image-container lg:hidden flex-1/12 flex-grow"><img src={bodyImageAlt} alt="launch rocket"/></div>)}


        {
          // File Upload
          (currentInputType === 0) && (
            <div className="input-group mt-12 lg:mt-0 mb-20 lg:mb-0 flex-1/12">
              <QueryFileInput label="Choose From File"/>
              <span className="text-muted">Would you prefer entering a <button onClick={evt => handleInputTypeChange(evt, 1)}>http link</button></span>
              <span className="text-muted">Alternatively, enter some text <button onClick={evt => handleInputTypeChange(evt, 2)}>manually</button></span>
            </div>
          )
        }
        {
          // Http Link
          (currentInputType === 1) && (
            <div className="input-group mt-4 lg:mt-0 mb-20 lg:mb-0 flex-1/12">
              <QueryLinkInput label="Enter Link"/>
              <span className="text-muted">Would you prefer uploading a <button onClick={evt => handleInputTypeChange(evt, 0)}>file</button></span>
              <span className="text-muted">Alternatively, enter some text <button onClick={evt => handleInputTypeChange(evt, 2)}>manually</button></span>
            </div>
          )
        }
        {
          // Text Area
          (currentInputType === 2) && (
            <div className="input-group input-group-with-textarea mt-4 lg:mt-0 mb-20 lg:mb-0 flex-1/12">
              <QueryTextInput label="Enter Text"/>
              <span className="text-muted">Would you prefer uploading a <button onClick={evt => handleInputTypeChange(evt, 0)}>file</button></span>
              <span className="text-muted">Alternatively, you can enter a <button onClick={evt => handleInputTypeChange(evt, 1)}>http link</button></span>
            </div>
          )
        }

      </main>


      <footer className="component-footer lg:hidden">
        <button className="btn btn-tertiary ml-auto" onClick={onSetRange}>
          <span>Set Range</span>
          <span className="icon"><img src={leftArrow} alt="left arrow"/></span>
        </button>
        <button className="btn btn-secondary w-full mt-8 lg:mt-0" onClick={onSubmit}><span>Submit</span></button>
      </footer>
    </div>
  );
}
