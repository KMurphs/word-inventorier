import React from "react";
import './index.css';

export type Props = {
  value: number | string,
  setValue: (newValue: number | string) => void,
  label: string
}
type PropsInternal = Props & {
  type: string
}

const InputWithMovingLabel: React.FC<PropsInternal> = ({value, setValue, label, type}: PropsInternal) => {

  return (
    <div className="input-with-moving-label" >
      <input id="input-1" 
             type={type} 
             required 
             value={value} 
             onChange={evt => setValue((evt.target as HTMLInputElement).value)}
            //  onChange={evt => setValue(parseInt((evt.target as HTMLInputElement).value))}
      />

      <label htmlFor="input-1" className="moving-label">{label}</label>
    </div>
  )
  
}
const TextAreaWithMovingLabel: React.FC<Props> = ({value, setValue, label}: Props) => {

  return (
    <div className="input-with-moving-label" >
      <textarea name="textarea-1"
                id="textarea-1" 
                required 
                value={value} 
                onChange={evt => setValue((evt.target as HTMLTextAreaElement).value)}>
       </textarea>

      <label htmlFor="textarea-1" className="moving-label">{label}</label>
    </div>
  )
  
}


const useWithType = (ReactComponent: React.FC<PropsInternal>, explicitType: string): React.FC<Props> => {
  return (props: Props) => <ReactComponent type={explicitType} {...props}/>
}







export { TextAreaWithMovingLabel as TextArea};
export const TextInput: React.FC<Props> = (props: Props) => useWithType(InputWithMovingLabel, "text")(props)
export const NumericInput: React.FC<Props> = (props: Props) => useWithType(InputWithMovingLabel, "number")(props)
