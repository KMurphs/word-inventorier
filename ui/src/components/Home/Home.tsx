import React from 'react';
import './index.css';
import bodyImage from './assets/undraw_maker_launch_crhe.svg';
import bannerImage from './assets/undraw_book_lover_mkck 1.svg';
import leftArrow from './assets/Vectorarrow.svg';

interface Props {
  onExplore: (evt: any)=>void
}
export default function Home({onExplore}: Props) {
  return (
    <div className="Home flex flex-col h-full lg:flex-wrap">
        <header className="component-header lg:pl-36 lg:w-6/12">
          <h1 className=" lg:opacity-0 ">Words</h1>
          <h2>Words draw a frequency chart from a text, and lets you inspect it!</h2>
        </header>
        <main className="component-body lg:pl-36 lg:w-6/12 lg:pt-8"> 
          <div className="component-body__image mb-6 grid lg:hidden"><img src={bodyImage} alt="launch rocket"/></div>
          <span>Get Started in 3 easy steps:</span>
          <ul>
            <li><span className="icon"><img src={leftArrow} alt="left arrow"/></span><span>Enter Some Text</span></li>
            <li><span className="icon"><img src={leftArrow} alt="left arrow"/></span><span>Set a Range of word lengths</span></li>
            <li><span className="icon"><img src={leftArrow} alt="left arrow"/></span><span>Look at the results</span></li>
          </ul>
        </main>
        <footer className="component-footer lg:pl-36 lg:w-6/12">
          <button className="btn w-full lg:w-80" onClick={onExplore}><span>Start Exploring</span></button>
        </footer>
        <div className=" banner hidden lg:grid flex-force-wrap w-6/12">
          <img className="m-auto" src={bannerImage} alt="launch rocket"/>
        </div>
    </div>
  );
}


