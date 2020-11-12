import React, { useState } from "react";
import { scrollIDIntoViewHelper } from "../../utils/utils";
import './style.css';

type Props = {
  rangeMin: number,
  rangeMax: number,
  initialValue?: number
}


export const InputWithMovingChangingLabel = ({initialValue}: Props) => {

  const [val, setVal] = useState<number>(initialValue || 0);


  return (
    <div className="input-with-moving-label input-with-moving-and-overriding-label" >
      
      <input type="number" id="input-with-moving-label" required value={val} onChange={evt => setVal(parseInt((evt.target as HTMLInputElement).value))}/>
      <label htmlFor="input-with-moving-label" className="moving-label onfocus-label">How many entries to retrieve</label>
      <label htmlFor="input-with-moving-label" className="moving-label overriding-label">Retrieve top <span className="dynamic-value">{val}</span> most frequent words</label>

    </div>
  )


}

InputWithMovingChangingLabel.defaultProps = {
  rangeMin: 0,
  rangeMax: 100,
  initialMin: 0,
  initialMax: 100
};


export const InputWithMovingLabel = ({}: Props) => {

  // const [min, setMin] = useState<number>(initialMin || rangeMin);
  // const [max, setMax] = useState<number>(initialMax || rangeMax);


  return (
    <div className="input-with-moving-label" >
      
      <input type="text" required/>
      <span className="moving-label">How many entries to retrieve</span>

    </div>
  )
}