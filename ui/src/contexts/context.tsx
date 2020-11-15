import React, { useContext, useRef, useState } from "react";
import DataController from "../data.controller/data.controller";
import { TTextSummary } from "../data.controller/data.types";


export const queryMinLengthContext = React.createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, ()=>{}]);
export const queryMaxLengthContext = React.createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, ()=>{}]);
export const queryMostFrequentCountContext = React.createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, ()=>{}]);
export const queryTextToProcessContext = React.createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(["", ()=>{}]);
export const dataControllerContext = React.createContext<[Function, boolean, DataController]>([()=>{}, false, new DataController()]);


interface Props {
  children: React.ReactNode[] | React.ReactNode
}
export const QueryLengthRangeProvider = ({children}: Props)=>{

  const [queryMinLength, setQueryMinLength] = useState(0)
  const [queryMaxLength, setQueryMaxLength] = useState(50)
  const [queryMostFrequent, setQueryMostFrequent] = useState(50)
  const [queryText, setQueryText] = useState("")
  const [queryResults, setQueryResults] = useState<TTextSummary | null>(null)
  const isExecutingQuery = useRef(false)

  const dataController = new DataController();

  const executeQuery = async () => {
    
    isExecutingQuery.current = false

    dataController.processText({
      text: queryText,
      queries: [{
        minLength: queryMinLength,
        maxLength: queryMaxLength,
        topN: queryMostFrequent
      }]
    }).then((res) => {
      isExecutingQuery.current = true;
      setQueryResults(res)
      console.log(res);
    });
    
  }

  const waitingForServer = isExecutingQuery.current


  return (
    <dataControllerContext.Provider value={[executeQuery, waitingForServer, dataController]}>
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

/**
 * React Function that will display the minimum length of words of interest for the query
 */
export const DisplayQueryMinLength = ()=>{

  const [queryMinLength] = useContext(queryMinLengthContext);
  return (
    <span>{queryMinLength}</span>
  )

}
/**
 * React Function that will display the maximum length of words of interest for the query
 */
export const DisplayQueryMaxLength = ()=>{

  const [queryMaxLength] = useContext(queryMaxLengthContext);
  return (
    <span>{queryMaxLength}</span>
  )

}
/**
 * React Function that will display the limit to the number of word to return from the query.
 * The backend will return this many most frequent words.
 */
export const DisplayQueryMostFrequentParameter = ()=>{

  const [queryMostFrequent] = useContext(queryMostFrequentCountContext);
  return (
    <span>{queryMostFrequent}</span>
  )

}




