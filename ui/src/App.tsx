import React from 'react';
import './App.css';
import {  useResetURI } from './utils/scrollHelpers';
import Header from './components/Header';


function App() {


  console.log("App refreshed")
  useResetURI()

  

  return (
    <div className="App full-height flex flex-col " >
      
      {/* Header Section  */}
      <section className="top-bar-element h-1 lg:h-2 bg-blue-500 w-full"></section>
      <section className="px-8 app-header"><Header /></section>


      {/* Intro Section  */}
      {/* <section className="introduction"><Home/></section> */}
      {/* <section className="progress-bar-section"><ProgressIndicator /></section> */}


      {/* Form Section  */}
      {/* <section className="introduction"><QueryForm /></section> */}
      {/* <section className="progress-bar-section"><ProgressIndicator /></section> */}


      {/* Result Section  */}
      {/* <section className="introduction"><Results /></section> */}


      {/* Footer */}
      {/* <footer className="hidden lg:block"><Footer/></footer> */}

    </div>
  );
}

export default App;
