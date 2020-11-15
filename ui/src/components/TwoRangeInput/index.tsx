import React from "react";
import './style.css';

type Props = {
  rangeLow?: number,
  rangeHigh?: number,
  valueLow: number,
  valueHigh: number,
  setValueLow: (newValue: number) => void,
  setValueHigh: (newValue: number) => void,
}


export const TwoRangeInput = ({ rangeLow, rangeHigh, valueLow, valueHigh, setValueLow, setValueHigh}: Props) => {

  // const [lowVal, setlowVal] = useState<number>(initialLow || rangeLow);
  // const [highVal, sethighVal] = useState<number>(initialHigh || rangeHigh);


  return (
    <div className="two-range-input" style={{"--a": valueLow, "--b": valueHigh, "--min": rangeLow, "--max": rangeHigh} as React.CSSProperties}>
    
      <div className="track-muted"></div>
      
      <input id="a" type="range" min={rangeLow} max={rangeHigh} step="1" value={valueLow} onChange={evt => setValueLow(Math.min(parseInt((evt.target as HTMLInputElement).value), valueHigh))} />
      <input id="b" type="range" min={rangeLow} max={rangeHigh} step="1" value={valueHigh} onChange={evt => setValueHigh(Math.max(parseInt((evt.target as HTMLInputElement).value), valueLow))} />
      
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