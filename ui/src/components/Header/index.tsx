import React from 'react';
import ProgressIndicator from '../ProgressIndicator';
import './index.css';

export default function Header() {
  return (
    <div className="Header flex justify-center lg:justify-between pt-8 lg:pt-4 max-w-screen-xl mx-auto">
        <h1 className="logo hidden lg:block">Words</h1>
        <div className="header-progress flex justify-center lg:justify-end flex-grow"><ProgressIndicator/></div>
    </div>
  );
} 
  