import React from 'react';
import './index.css';
import bodyImage from './assets/undraw_maker_launch_crhe.svg';
import bannerImage from './assets/undraw_book_lover_mkck 1.svg';
import leftArrow from './assets/Vectorarrow.svg';


interface Props {
  onExplore: (evt: any)=>void,
  movingLogo: any,
  movingLogoAnchor: any
}
export default function Introduction({onExplore, movingLogo, movingLogoAnchor}: Props) {
  return (
    <div className="Introduction flex h-full">




        <section className="content super-group flex-grow md:flex-6/12 h-full overflow-y-scroll flex-nowrap md:pr-8">

          <div className="group title flex-4/12 mb-4 flex-auto justify-start" >
            <h1 className="mt-12 mb-2"><span className="lg:absolute" ref={movingLogo}>Words</span><span ref={movingLogoAnchor} className="opacity-0">123</span></h1>
            <h2>Words draw a frequency chart from a text, and lets you inspect it!</h2>
          </div>

          <div className="group title-banner flex-2/12 flex-image-container md:hidden">
            <img src={bodyImage} alt="launch rocket"/>
          </div>

          <div className="group steps mt-4 flex-auto justify-start">
            <span>Get Started in 3 easy steps:</span>
            <div className="flex-force-wrap"></div>
            <ul>
              <li className="steps-items flex align-baseline mt-2"><span className="steps-item__icon mr-4 ml-4"><img src={leftArrow} alt="left arrow"/></span><span>Enter Some Text</span></li>
              <li className="steps-items flex align-baseline mt-2"><span className="steps-item__icon mr-4 ml-4"><img src={leftArrow} alt="left arrow"/></span><span>Set a Range of word lengths</span></li>
              <li className="steps-items flex align-baseline mt-2"><span className="steps-item__icon mr-4 ml-4"><img src={leftArrow} alt="left arrow"/></span><span>Look at the results</span></li>
            </ul> 
          </div>

          <div className="group btn-container mt-14 flex-auto justify-center md:justify-start">
            <button className="btn" onClick={onExplore}><span>Start Exploring</span></button>
          </div>

        </section>





        <section className="super-group justify-center banner hidden md:flex md:flex-6/12 md:pl-8">

          <div className="group flex-image-container flex-12/12">
            <img className="m-auto" src={bannerImage} alt="Woman reading book"/>
          </div>

        </section>





    </div>
  );
}


