import { queryResultsContext } from "../../contexts"
import DetailedResultsScreen, { Props } from "."
import { TTextSummary, TTokenSummary } from "../data.controller/data.types"
import { useState } from "react"



interface ExternalProps {
  onNewQuery: ()=>void,
  onResults: ()=>void,
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
          (results) => {

            if(!results) return ;

            const dataSummary: {[key: string]: TTokenSummary} = {
              "longest": {...(results.longestWord)},
              "shortest": {...(results.shortestWord)},
              "mostFrequent": {...(results.mostFrequentWord)},
              "leastFrequent": {...(results.leastFrequentWord)},
            }

            const querySummary = {
              createdAt: results.results[0]._createdAt, 
              processedIn: Math.round((results.results[0].durationMs || 0) / 10)/100,
            }
            const textSummary = {
              createdAt: results._createdAt, 
              processedIn: results.summaryDurationSec,
              type: results.idType,
              wordCount: results.wordsCount,
              uniqueWordCount: results.uniqueWordsCount
            }
            return (
              <FC {...props} data={(results.results[0].data || []).sort(sortFct)} 
                              onSortByLength={handleOnSortByLength} 
                              onSortByFrequency={handleOnSortByFreq} 
                              queryMeta={querySummary}
                              textMeta={textSummary}
                              tokens={dataSummary}
              />
            )
          } 
        }
      </context.Consumer>
    )
  }
}

const DetailedResultsFromContext = withContext(DetailedResultsScreen, queryResultsContext);
export default DetailedResultsFromContext;