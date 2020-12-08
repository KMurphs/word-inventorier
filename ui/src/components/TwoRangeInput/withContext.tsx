import { queryMaxLengthContext, queryMinLengthContext } from "../../contexts";
import { Props, TwoRangeInput } from ".";

export interface NewProps {
  lowLimit?: number,
  highLimit?: number
}

const WithContext = (Input: React.FC<Props>)=>{
  return (props: NewProps)=>{


    return (
      <queryMinLengthContext.Consumer>
        {
          ([queryMinLength, setQueryMinLength]) => {


            return (
              <queryMaxLengthContext.Consumer>
                {
                  ([queryMaxLength, setQueryMaxLength]) => {


                    return (
                      <Input lowValue={queryMinLength} highValue={queryMaxLength} 
                             onLowValueChange={setQueryMinLength} onHighValueChange={setQueryMaxLength}  
                             {...props}
                      />
                    )


                  }
                }
              </queryMaxLengthContext.Consumer>  
            )

            
          } 
        }
      </queryMinLengthContext.Consumer>
    )
  }
}

export const TwoRangeInputWithContext = WithContext(TwoRangeInput)