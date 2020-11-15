import React, { useContext, useRef, useState } from "react";
import DataController from "../data.controller/data.controller";


export const queryMinLengthContext = React.createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, ()=>{}]);
export const queryMaxLengthContext = React.createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, ()=>{}]);
export const queryMostFrequentCountContext = React.createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, ()=>{}]);
export const queryTextToProcessContext = React.createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(["", ()=>{}]);
export const dataControllerContext = React.createContext<DataController>(new DataController());


interface Props {
  children: React.ReactNode[] | React.ReactNode
}
export const QueryLengthRangeProvider = ({children}: Props)=>{

  const [queryMinLength, setQueryMinLength] = useState(0)
  const [queryMaxLength, setQueryMaxLength] = useState(50)
  const [queryMostFrequent, setQueryMostFrequent] = useState(50)
  const [queryText, setQueryText] = useState("")
  
  // let dc = useRef<DataController|null>(null);
  // (dc.current === null) && (dc.current = new DataController());


  return (
    <dataControllerContext.Provider value={new DataController()}>
      <queryMaxLengthContext.Provider value={[queryMaxLength, setQueryMaxLength]}>
        <queryMinLengthContext.Provider value={[queryMinLength, setQueryMinLength]}>
          <queryMostFrequentCountContext.Provider value={[queryMostFrequent, setQueryMostFrequent]}>
            <queryTextToProcessContext.Provider value={[queryText, setQueryText]}>
              { children }
            </queryTextToProcessContext.Provider>
          </queryMostFrequentCountContext.Provider>
        </queryMinLengthContext.Provider>
      </queryMaxLengthContext.Provider>
    </dataControllerContext.Provider>
  )

}


export const DisplayQueryMinLength = ()=>{

  const [queryMinLength] = useContext(queryMinLengthContext);
  return (
    <span>{queryMinLength}</span>
  )

}
export const DisplayQueryMaxLength = ()=>{

  const [queryMaxLength] = useContext(queryMaxLengthContext);
  return (
    <span>{queryMaxLength}</span>
  )

}
export const DisplayQueryMostFrequentParameter = ()=>{

  const [queryMostFrequent] = useContext(queryMostFrequentCountContext);
  return (
    <span>{queryMostFrequent}</span>
  )

}