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
    <div className="TextScreen flex flex-col h-full">
      <header className="component-header">
        <h2>Enter Some Text</h2>
      </header>

      <main className="component-body"> 
        {(currentInputType !== 1) && (<div className="component-body__image"><img src={bodyImage} alt="launch rocket"/></div>)}
        {(currentInputType === 1) && (<div className="component-body__image"><img src={bodyImageAlt} alt="launch rocket"/></div>)}


        {
          // File Upload
          (currentInputType === 0) && (
            <div className="input-group">
              <QueryFileInput label="Enter Link"/>
              <span className="text-muted">Would you prefer entering a <button onClick={evt => handleInputTypeChange(evt, 1)}>http link</button></span>
              <span className="text-muted">Alternatively, enter some text <button onClick={evt => handleInputTypeChange(evt, 2)}>manually</button></span>
            </div>
          )
        }
        {
          // Http Link
          (currentInputType === 1) && (
            <div className="input-group">
              <QueryLinkInput label="Enter Link"/>
              <span className="text-muted">Would you prefer uploading a <button onClick={evt => handleInputTypeChange(evt, 0)}>file</button></span>
              <span className="text-muted">Alternatively, enter some text <button onClick={evt => handleInputTypeChange(evt, 2)}>manually</button></span>
            </div>
          )
        }
        {
          // Text Area
          (currentInputType === 2) && (
            <div className="input-group input-group-with-textarea">
              <QueryTextInput label="Enter Link"/>
              <span className="text-muted">Would you prefer uploading a <button onClick={evt => handleInputTypeChange(evt, 0)}>file</button></span>
              <span className="text-muted">Alternatively, you can enter a <button onClick={evt => handleInputTypeChange(evt, 1)}>http link</button></span>
            </div>
          )
        }

      </main>


      <footer className="component-footer">
        <button className="btn btn-tertiary" onClick={onSetRange}>
          <span>Set Range</span>
          <span className="icon"><img src={leftArrow} alt="left arrow"/></span>
        </button>
        <button className="btn w-full" onClick={onSubmit}><span>Submit</span></button>
      </footer>
    </div>
  );
}
