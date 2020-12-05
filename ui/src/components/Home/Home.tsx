import React from 'react';
import './index.css';
import bodyImage from './assets/undraw_maker_launch_crhe.svg';
import leftArrow from './assets/Vectorarrow.svg';

interface Props {
  onExplore: (evt: any)=>void
}
export default function Home({onExplore}: Props) {
  return (
    <div className="Home flex flex-col h-full">
        <header className="component-header">
          <h1>Words</h1>
          <h2>Words draw a frequency chart from a text, and lets you inspect it!</h2>
        </header>
        <main className="component-body"> 
          <div className="component-body__image mb-6"><img src={bodyImage} alt="launch rocket"/></div>
          <span>Get Started in 3 easy steps:</span>
          <ul>
            <li><span className="icon"><img src={leftArrow} alt="left arrow"/></span><span>Enter Some Text</span></li>
            <li><span className="icon"><img src={leftArrow} alt="left arrow"/></span><span>Set a Range of word lengths</span></li>
            <li><span className="icon"><img src={leftArrow} alt="left arrow"/></span><span>Look at the results</span></li>
          </ul>
        </main>
        <footer className="component-footer">
          <button className="btn w-full" onClick={onExplore}><span>Start Exploring</span></button>
        </footer>

    </div>
  );
}


