import React, { useState } from "react";
import { scrollIDIntoViewHelper } from "../../utils/utils";
import './style.css';

type Props = {
  value: number,
  setValue: (newValue: number) => void,
}


export const InputWithMovingChangingLabel = ({value, setValue}: Props) => {

  return (
    <div className="input-with-moving-label input-with-moving-and-overriding-label" >
      
      <input type="number" id="input-with-moving-label" required value={value} onChange={evt => setValue(parseInt((evt.target as HTMLInputElement).value))}/>
      <label htmlFor="input-with-moving-label" className="moving-label onfocus-label">How many entries to retrieve</label>
      <label htmlFor="input-with-moving-label" className="moving-label overriding-label">Retrieve top <span className="dynamic-value">{value}</span> most frequent words</label>

    </div>
  )

}
InputWithMovingChangingLabel.defaultProps = {};





export const InputWithMovingLabel = ({value, setValue}: Props) => {

  return (
    <div className="input-with-moving-label" >
      
      <input type="text" required value={value} onChange={evt => setValue(parseInt((evt.target as HTMLInputElement).value))}/>
      <span className="moving-label">How many entries to retrieve</span>

    </div>
  )
  
}