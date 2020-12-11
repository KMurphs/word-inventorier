import React, { useState } from "react";
import { TStep } from "../components/ProgressIndicator";


export const queryContentContext = React.createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(["", ()=>{}])
export const queryMinLengthContext = React.createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, ()=>{}])
export const queryMaxLengthContext = React.createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, ()=>{}])
export const queryResultLimitContext = React.createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, ()=>{}])
export const stepContext = React.createContext<TStep>(0)


interface Props {
  children: React.ReactNode[] | React.ReactNode
}
export const ContextProvider = ({children}: Props) => {

  const [queryContent, setQueryContent] = useState<string>("Hello")
  const [queryMinLength, setQueryMinLength] = useState<number>(0)
  const [queryMaxLength, setQueryMaxLength] = useState<number>(20)
  const [queryResultLimit, setQueryResultLimit] = useState<number>(50)

  const currentStep = (()=>{
    if(!queryContent || queryContent === "") return 0;
    // if(!queryContent || queryContent === "") return 0;
    return 1;
  })();
  console.log({currentStep})

  return (
    <queryContentContext.Provider value={[queryContent, setQueryContent]}>
      <queryMinLengthContext.Provider value={[queryMinLength, setQueryMinLength]}>
        <queryMaxLengthContext.Provider value={[queryMaxLength, setQueryMaxLength]}>
          <queryResultLimitContext.Provider value={[queryResultLimit, setQueryResultLimit]}>
            <stepContext.Provider value={currentStep as TStep}>
              { children }
            </stepContext.Provider>
          </queryResultLimitContext.Provider>
        </queryMaxLengthContext.Provider>
      </queryMinLengthContext.Provider>
    </queryContentContext.Provider>
  )
}

export const QueryMinLengthSpan = ()=> <queryMinLengthContext.Consumer>{([queryMinLength]) => (<span>{queryMinLength}</span>)}</queryMinLengthContext.Consumer>
export const QueryMaxLengthSpan = ()=><queryMaxLengthContext.Consumer>{([queryMaxLength]) => (<span>{queryMaxLength}</span>)}</queryMaxLengthContext.Consumer>
export const QueryResultLimitSpan = ()=> <queryResultLimitContext.Consumer>{([queryResultLimit]) => (<span>{queryResultLimit}</span>)}</queryResultLimitContext.Consumer>
