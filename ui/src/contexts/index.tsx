import React, { useState } from "react";


export const queryContentContext = React.createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(["", ()=>{}])
export const queryMinLengthContext = React.createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, ()=>{}])
export const queryMaxLengthContext = React.createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, ()=>{}])
export const queryResultLimitContext = React.createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, ()=>{}])


interface Props {
  children: React.ReactNode[] | React.ReactNode
}
export const ContextProvider = ({children}: Props) => {

  const [queryContent, setQueryContent] = useState<string>("Hello")
  const [queryMinLength, setQueryMinLength] = useState<number>(0)
  const [queryMaxLength, setQueryMaxLength] = useState<number>(20)
  const [queryResultLimit, setQqueryResultLimit] = useState<number>(50)

  return (
    <queryContentContext.Provider value={[queryContent, setQueryContent]}>
      <queryMinLengthContext.Provider value={[queryMinLength, setQueryMinLength]}>
        <queryMaxLengthContext.Provider value={[queryMaxLength, setQueryMaxLength]}>
          <queryResultLimitContext.Provider value={[queryResultLimit, setQqueryResultLimit]}>
            { children }
          </queryResultLimitContext.Provider>
        </queryMaxLengthContext.Provider>
      </queryMinLengthContext.Provider>
    </queryContentContext.Provider>
  )
}

export const QueryMinLengthSpan = ()=> <queryMinLengthContext.Consumer>{([queryMinLength]) => (<span>{queryMinLength}</span>)}</queryMinLengthContext.Consumer>
export const QueryMaxLengthSpan = ()=><queryMaxLengthContext.Consumer>{([queryMaxLength]) => (<span>{queryMaxLength}</span>)}</queryMaxLengthContext.Consumer>
export const QueryResultLimitSpan = ()=> <queryResultLimitContext.Consumer>{([queryResultLimit]) => (<span>{queryResultLimit}</span>)}</queryResultLimitContext.Consumer>
