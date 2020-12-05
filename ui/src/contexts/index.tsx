import React, { useState } from "react";


export const queryContentContext = React.createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(["", ()=>{}])

interface Props {
  children: React.ReactNode[] | React.ReactNode
}
export const ContextProvider = ({children}: Props) => {

  const [queryContent, setQueryContent] = useState<string>("Hello")

  return (
    <queryContentContext.Provider value={[queryContent, setQueryContent]}>
      { children }
    </queryContentContext.Provider>
  )
}