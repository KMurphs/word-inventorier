import React from 'react';
import './index.css';

export type TStep = 0|1|2|3
export interface Props<T> {
  step?: T,
  animateClass?: string
}
// at-step-1 at-step-2 at-step-3 at-steps-completed
const ProgressIndicator: React.FC<Props<TStep>> = ({step, animateClass}) => {
  const validStep = step || 0;
  const stepClass = ["at-step-1", "at-step-2", "at-step-3", "at-steps-completed"][validStep]
  return (
    <div className={`app-progress-bar w-full  lg:w-auto ${stepClass}`} /*style={{} as CSSProperties}*/>
      <ul className="grid grid-cols-3 text-xs max-w-lg m-auto con">
        <li className={`${validStep === 0 ? animateClass : ""}`}><span>Enter Text</span></li>
        <li className={`${validStep === 1 ? animateClass : ""}`}><span>Set Range</span></li>
        <li className={`${validStep >=  2 ? animateClass : ""}`}><span>Explore</span></li>
      </ul>
    </div>
  );
}
ProgressIndicator.defaultProps = {
  step: 0,
  animateClass: "animate-primary"
}
export default ProgressIndicator;