import { queryResultsContext } from "../../contexts"
import ResultScreen, { Props } from "."
import { TTextSummary, TTokenSummary } from "../data.controller/data.types"
import { useState } from "react"



interface ExternalProps {
  onNewQuery: ()=>void,
  onDetailedResults: ()=>void,
}

type TSortStrategy = "freqUp" | "freqDown" | "lengthUp" | "lengthDown"

const withContext = (FC: React.FC<Props>, context: React.Context<TTextSummary | null>): React.FC<ExternalProps> => {



  return (props)=>{



    /** Logic  to handle sorting */
    const [sortStrategy, setSortStrategy] = useState<TSortStrategy>("freqUp")


    const handleOnSortByFreq = () => setSortStrategy(strategy => strategy === "freqDown" ? "freqUp" : "freqDown")
    const handleOnSortByLength = () => setSortStrategy(strategy => strategy  === "lengthDown" ? "lengthUp" : "lengthDown")


    const sortFctTemplate = (key: "frequency" | "length", isUp: boolean, a: TTokenSummary, b: TTokenSummary) => (a[key] - b[key]) * (isUp ? 1 : -1)
    const sortFct = ((strategy)=>{
      if(strategy === "freqUp") return sortFctTemplate.bind(null, "frequency", true)
      if(strategy === "lengthUp") return sortFctTemplate.bind(null, "length", true)
      if(strategy === "lengthDown") return sortFctTemplate.bind(null, "length", false)
      return sortFctTemplate.bind(null, "frequency", false)
    })(sortStrategy)





    return (
      <context.Consumer>
        { 
          (results) => (
            <FC {...props} data={(results?.results[0].data || []).sort(sortFct)} 
                            onSortByLength={handleOnSortByLength} 
                            onSortByFrequency={handleOnSortByFreq} 
            />
          ) 
        }
      </context.Consumer>
    )
  }
}

const ResultsFromContext = withContext(ResultScreen, queryResultsContext);
export default ResultsFromContext;