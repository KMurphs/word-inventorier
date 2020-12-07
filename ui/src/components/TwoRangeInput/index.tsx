import React, { CSSProperties, useEffect, useRef } from 'react';
import './index.css';

export interface Props {
  lowLimit?: number,
  highLimit?: number,
  lowValue: number, 
  onLowValueChange: (newValue: number)=>void,
  highValue: number, 
  onHighValueChange: (newValue: number)=>void,
}

export const TwoRangeInput: React.FC<Props> = ({lowLimit, highLimit, lowValue, highValue, onLowValueChange, onHighValueChange}: Props) => {
  
  const screen = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Chagne the value of the range slider produces a touch move event that scrolls the page horizontally
    // This is a solution to stop the ancestor page from scrolling by stopping the event's propagation here
    // For some reason, this works only in tandem with 
    //      onTouchMoveCapture={evt => { evt.stopPropagation();}}
    // on the parent div "RangeScreen"
    // https://stackoverflow.com/questions/49541173/how-to-prevent-default-handling-of-touch-events
    // https://stackoverflow.com/questions/34522931/example-for-bubbling-and-capturing-in-react-js
    // https://jsbin.com/hilome/edit?js,output
    // https://github.com/facebook/react/issues/6436
    // 
    const node = screen.current;
    const handler = (evt: any)=>{ evt.preventDefault(); evt.stopPropagation(); evt.stopImmediatePropagation();}
    node && node.addEventListener("touchmove", handler, {passive: false})

    return () => { node && node.removeEventListener("touchmove", handler); }
  })


  const handleLowValueChange = (newLowValue: number, currentHighValue: number, evt?: React.FormEvent<HTMLInputElement>)=>{
    if(newLowValue <= currentHighValue) onLowValueChange(newLowValue);
    evt && evt.stopPropagation();
    evt && evt.preventDefault();
  }
  const handleHighValueChange = (newHighValue: number, currentLowValue: number, evt?: React.FormEvent<HTMLInputElement>)=>{
    if(newHighValue >= currentLowValue) onHighValueChange(newHighValue);
    evt && evt.stopPropagation();
    evt && evt.preventDefault();
  }

  return (
    <div className="two-range-input" style={{"--a": lowValue, "--b": highValue, "--min": lowLimit, "--max": highLimit} as CSSProperties} ref={screen}
        onTouchMoveCapture={evt => { /*evt.preventDefault(); */ evt.stopPropagation(); /*evt.nativeEvent.stopImmediatePropagation(); */}}
    >
      <div className="track-muted"></div>
      <input id="a" type="range" min={lowLimit} max={highLimit} step={1} value={lowValue}  onInput={evt => handleLowValueChange(parseInt((evt.target as HTMLInputElement).value), highValue, evt)}/>
      <input id="b" type="range" min={lowLimit} max={highLimit} step={1} value={highValue} onInput={evt => handleHighValueChange(parseInt((evt.target as HTMLInputElement).value), lowValue, evt)}/>
      <output htmlFor="a" style={{"--val": "var(--a)"} as CSSProperties}></output>
      <output htmlFor="b" style={{"--val": "var(--b)"} as CSSProperties}></output>
    </div>
  );
}

TwoRangeInput.defaultProps = {
  lowLimit: -50,
  highLimit: 50,
  lowValue: -50, 
  highValue: 50, 
}