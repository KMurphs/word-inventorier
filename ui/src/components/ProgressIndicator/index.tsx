import React, { CSSProperties } from 'react';
import './index.css';


interface Props {
  step?: "at-step-1" | "at-step-2" | "at-step-3" | "at-steps-completed",
  animateClass?: string
}
// at-step-1 at-step-2 at-step-3 at-steps-completed
const ProgressIndicator: React.FC<Props> = ({step, animateClass}) => {
 
  return (
    <div className={`app-progress-bar w-full  lg:w-auto ${step}`} /*style={{} as CSSProperties}*/>
      <ul className="grid grid-cols-3 text-xs max-w-lg m-auto con">
        <li className={`${step === "at-step-1" ? animateClass : ""}`}><span>Enter Text</span></li>
        <li className={`${step === "at-step-2" ? animateClass : ""}`}><span>Set Range</span></li>
        <li className={`${step === "at-step-3" ? animateClass : ""}`}><span>Explore</span></li>
      </ul>
    </div>
  );
}
ProgressIndicator.defaultProps = {
  step: "at-step-1",
  animateClass: "animate-primary"
}
export default ProgressIndicator;