import React from 'react';
import './index.css';
import bodyImage from './assets/undraw_file_analysis_8k9b.svg'; 
import { QueryLinkInput } from '../InputWithMovingLabel/withContext';

interface Props {
  onSubmit: (evt: any)=>void
}

export default function TextScreen({onSubmit}: Props) {
  return (
    <div className="TextScreen flex flex-col h-full">
      <header className="component-header">
        <h2>Enter Some Text</h2>
      </header>
      <main className="component-body"> 
        <div className="component-body__image mb-6"><img src={bodyImage} alt="launch rocket"/></div>
        <div className="input-group">
          <QueryLinkInput label="Enter Link"/>
          <span className="text-muted">Would you prefer entering a <a href="#">http link</a></span>
          <span className="text-muted">Alternatively, enter some text <a href="#">manually</a></span>
        </div>
      </main>
      <footer className="component-footer">
        <button className="btn w-full" onClick={onSubmit}><span>Submit</span></button>
      </footer>
    </div>
  );
}
