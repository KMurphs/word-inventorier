import React, { CSSProperties } from 'react';
import './index.css';


interface Props {
}

export default function ProgressIndicator({}: Props) {
  return (
    <div className="app-progress-bar w-full at-step-1 at-step-2 at-step-3 at-steps-completed lg:w-auto " /*style={{} as CSSProperties}*/>
      <ul className="grid grid-cols-3 text-xs max-w-lg m-auto con">
        <li><span>Enter Text</span></li>
        <li><span>Set Range</span></li>
        <li><span>Explore</span></li>
      </ul>
    </div>
  );
}
