import React, { useContext } from "react";
import { TwoRangeInput } from ".";
import { queryMinLengthContext, queryMaxLengthContext } from "../../contexts/context";
import './style.css';

type Props = {
  rangeLow?: number,
  rangeHigh?: number
}


export const TwoRangeInputWithContext = ({ rangeLow, rangeHigh }: Props) => {

  const [queryMinLength, setQueryMinLength] = useContext(queryMinLengthContext);
  const [queryMaxLength, setQueryMaxLength] = useContext(queryMaxLengthContext);

  console.log({queryMinLength, queryMaxLength})

  return (
    <TwoRangeInput valueLow={queryMinLength} valueHigh={queryMaxLength} 
                   setValueLow={setQueryMinLength} setValueHigh={setQueryMaxLength} 
                   rangeLow={rangeLow} rangeHigh={rangeHigh} 
    />
  )
}

TwoRangeInputWithContext.defaultProps = {
  rangeLow: 0,
  rangeHigh: 100
};