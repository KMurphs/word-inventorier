import React from "react";
import { FileInput, Props } from ".";
import { queryContentContext } from "../../contexts";
// React.Context<[string|number, React.Dispatch<React.SetStateAction<string|number>>]>

interface NewProps {
  label: string
}


const WithContext = (Input: React.FC<Props>) => {
  return (props: NewProps) => (

    <queryContentContext.Consumer>
      {([queryContent, setQueryContent]) => <Input onChange={(val) => setQueryContent(val as string)} {...props}/>}
    </queryContentContext.Consumer>

  )
}



export const QueryFileInput: React.FC<any> = WithContext(FileInput)
// export const QueryTextInput: React.FC<any> = WithContext(TextArea)
// export const NumericInputWithContext: React.FC<any> = WithContext(NumericInput)