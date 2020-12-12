import React from "react";
import ProgressIndicator, {Props as InternalProps} from "."
import { stepContext } from "../../contexts";


// const circularIncrement = (low: number, high: number, val: number, doDecrement: boolean = false): number => {
//   if(doDecrement) return Math.abs(circularIncrement(-1 * high, -1 * low, -1 * val, false));
//   if(val === high) return low;
//   return val + 1;
// }
// const oneArgCircularIncrement = circularIncrement.bind(null, 0, 3)



export interface ExternalProps {
  animateClass?: string
}



function withContext<T>(FC: React.FC<InternalProps<T>>, context: React.Context<T>){

  return ( 
    (props: ExternalProps) => (
      <context.Consumer>
        {(currentStep) => <FC step={currentStep} {...props}/>}
      </context.Consumer>
    )
  )

}



export const ProgressIndicatorWithContext = withContext(ProgressIndicator, stepContext)

