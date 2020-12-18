import React, { useLayoutEffect, useRef } from 'react';
import { ProgressIndicatorWithContext } from '../ProgressIndicator/withContext';
import './index.css';



interface Props{
}
export default function Footer({}: Props) {



  return (
    <div className="Footer app-section flex flex-col align-center justify-center w-full md:justify-between pt-8 lg:pt-4 max-w-screen-xl mx-auto">


      <div className="app-details mb-24">
        <h2>Word Inventorier App</h2>
        <div>
          <span>Author: </span>
          <span>Stephan K.</span>
          <span>Github Repository: </span>
          <span><a href="https://github.com/KMurphs/word-inventorier" target="_blank" rel="noopener noreferrer">https://github.com/KMurphs/word-inventorier</a></span>
        </div>
      </div>

      <div className="contact-details">
        <h2>Contact Me</h2>
        <p>Want to chat? Or have you got a question/Suggestion? <br/>Drop me a message. I'm always happy to engage with the community</p>
        <div>
          <a href="https://github.com/KMurphs" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
          <a href="https://twitter.com/murphs_k" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
          <a href="https://www.linkedin.com/in/stephane-kibonge/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
          <a href="https://codepen.io/kmurphs" target="_blank" rel="noopener noreferrer"><i className="fab fa-codepen"></i></a>
        </div>
      </div>

    </div>
  );
} 
  