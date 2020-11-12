import React, { useState } from "react";
import { scrollIDIntoViewHelper } from "../../utils/utils";
import './style.css';

type Props = {
  rangeLow: number,
  rangeHigh: number,
  initialLow?: number,
  initialHigh?: number
}


export const TwoRangeInput = ({ rangeLow, rangeHigh, initialLow, initialHigh }: Props) => {

  const [lowVal, setlowVal] = useState<number>(initialLow || rangeLow);
  const [highVal, sethighVal] = useState<number>(initialHigh || rangeHigh);


  return (
    <div className="two-range-input" style={{"--a": lowVal, "--b": highVal, "--min": rangeLow, "--max": rangeHigh} as React.CSSProperties}>
    
      <div className="track-muted"></div>
      
      <input id="a" type="range" min={rangeLow} max={rangeHigh} step="1" value={lowVal} onInput={evt => setlowVal(Math.min(parseInt((evt.target as HTMLInputElement).value), highVal))} />
      <input id="b" type="range" min={rangeLow} max={rangeHigh} step="1" value={highVal} onInput={evt => sethighVal(Math.max(parseInt((evt.target as HTMLInputElement).value), lowVal))} />
      
      <label htmlFor="a"><output htmlFor="a" style={{"--val": "var(--a)"} as React.CSSProperties}></output></label>
      <label htmlFor="b"><output htmlFor="b" style={{"--val": "var(--b)"} as React.CSSProperties}></output></label>
  
    </div>
  )
}

TwoRangeInput.defaultProps = {
  rangeLow: 0,
  rangeHigh: 100,
  initialLow: 0,
  initialHigh: 100
};