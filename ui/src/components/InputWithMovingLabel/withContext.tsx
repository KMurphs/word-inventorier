import React, { useContext } from "react";
import { NumericInput, TextInput, Props } from ".";
import { queryContentContext } from "../../contexts";
// React.Context<[string|number, React.Dispatch<React.SetStateAction<string|number>>]>

interface NewProps {
  label: string
}


const WithContext = (Input: React.FC<Props>) => {
  return (props: NewProps) => (

    <queryContentContext.Consumer>
      {([queryContent, setQueryContent]) => <Input value={queryContent} setValue={(val) => setQueryContent(val as string)} {...props}/>}
    </queryContentContext.Consumer>

  )
}



export const QueryLinkInput: React.FC<any> = WithContext(TextInput)
// export const NumericInputWithContext: React.FC<any> = useWithContext(NumericInput)