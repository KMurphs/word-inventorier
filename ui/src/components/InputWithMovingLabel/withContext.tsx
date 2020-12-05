import React, { useContext } from "react";
import { NumericInput, TextInput, Props } from ".";
import { queryContentContext } from "../../contexts";
// React.Context<[string|number, React.Dispatch<React.SetStateAction<string|number>>]>

interface Props2 {
  label: string
}
interface InternalProps {
  children: React.ReactNode[] | React.ReactNode
}
const WithContext = (Input: React.FC<Props>) => {
  // const [queryContent, setQueryContent] = useContext(queryContentContext);
  // return (props: Props2) => <Input value={0} setValue={(val) => {}} {...props}/>
  return (props: Props2) => (
      <queryContentContext.Consumer>
        {([queryContent, setQueryContent]) => <Input value={queryContent} setValue={(val) => setQueryContent(val as string)} {...props}/>}
      </queryContentContext.Consumer>
    )


  // return (props: Props2) => <Input value={queryContent} setValue={(val) => setQueryContent(val as string)} {...props}/>
}



// export const QueryLinkInput = (props: Props) => {

//   const [queryContent, setQueryContent] = useContext(queryContentContext);
//   return ( <TextInput value={queryContent} setValue={(val) => setQueryContent(val as string)} {...props}/>)
// }


export const QueryLinkInput: React.FC<any> = WithContext(TextInput)
// export const NumericInputWithContext: React.FC<any> = useWithContext(NumericInput)