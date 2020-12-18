import React, { useEffect, useState } from "react";
import DataController from "../components/data.controller/data.controller";
import { TTextSummary } from "../components/data.controller/data.types";
import { TStep } from "../components/ProgressIndicator";


export const queryContentContext = React.createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(["", ()=>{}])
export const queryMinLengthContext = React.createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, ()=>{}])
export const queryMaxLengthContext = React.createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, ()=>{}])
export const queryResultLimitContext = React.createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, ()=>{}])
export const stepContext = React.createContext<TStep>(0)
export const queryResultsContext = React.createContext<TTextSummary | null>(null);
// export const queryResultsContext = React.createContext<TTextSummary | null>(null);
export const dataControllerContext = React.createContext<[boolean, Function]>([false, ()=>{}]);


interface Props {
  children: React.ReactNode[] | React.ReactNode
}
export const ContextProvider = ({children}: Props) => {


  

  // Declaring states that will fill contexts 
  const [queryContent, setQueryContent] = useState<string>("")
  const [queryMinLength, setQueryMinLength] = useState<number>(0)
  const [queryMaxLength, setQueryMaxLength] = useState<number>(20)
  const [queryResultLimit, setQueryResultLimit] = useState<number>(50)

  // const [queryResults, setQueryResults] = useState<TTextSummary | null>(JSON.parse(localStorage.getItem("example") || ""))
  const [queryResults, setQueryResults] = useState<TTextSummary | null>(null)
  const [isExecutingQuery, setIsExecutingQuery] = useState(false)

  // console.log(queryResults?.results[0].data)



  // Declaring state for the app progress
  const currentStep = (()=>{
    if(!queryContent || queryContent === "") return 0;
    if(isExecutingQuery || queryResults) return 2;
    return 1;
  })();
  // console.log({currentStep, queryContent})


  



  useEffect(() => { 

    // Preparing fetch/query effect and function 
    const executeQuery = async () => {
      
      const dataController = new DataController();
      console.log("Fetching: DataController Version: " + dataController.getVersion())

      dataController.processText({
        text: queryContent,
        queries: [{
          minLength: queryMinLength,
          maxLength: queryMaxLength,
          topN: queryResultLimit
        }]
      }).then((res) => {

        return new Promise<TTextSummary>((resolve) => {
          setTimeout(()=>{
            resolve(res);
          }, 500)
        })

      }).then((res) => {
        // isExecutingQuery.current = false;
        setQueryResults(res)
        setIsExecutingQuery(false)
        localStorage.setItem("example", JSON.stringify(res))
        console.log(res);
      });
      

      // if(true){
      //   const res = JSON.parse(localStorage.getItem("example") || "")
      //   setQueryResults(res)
      //   setIsExecutingQuery(false)
        
      //   console.log(res);
      // }

    }

    isExecutingQuery && executeQuery() 
  }, [isExecutingQuery, queryContent, queryMinLength, queryMaxLength, queryResultLimit])








  return (
    <queryContentContext.Provider value={[queryContent, setQueryContent]}>
      <queryMinLengthContext.Provider value={[queryMinLength, setQueryMinLength]}>
        <queryMaxLengthContext.Provider value={[queryMaxLength, setQueryMaxLength]}>
          <queryResultLimitContext.Provider value={[queryResultLimit, setQueryResultLimit]}>
            <stepContext.Provider value={currentStep as TStep}>
              <queryResultsContext.Provider value={queryResults}>
                <dataControllerContext.Provider value={[isExecutingQuery, ()=>setIsExecutingQuery(true)]}>
                  { children }
                </dataControllerContext.Provider>
              </queryResultsContext.Provider>
            </stepContext.Provider>
          </queryResultLimitContext.Provider>
        </queryMaxLengthContext.Provider>
      </queryMinLengthContext.Provider>
    </queryContentContext.Provider>
  )
}

export const QueryMinLengthSpan = ()=> <queryMinLengthContext.Consumer>{([queryMinLength]) => (<span>{queryMinLength}</span>)}</queryMinLengthContext.Consumer>
export const QueryMaxLengthSpan = ()=><queryMaxLengthContext.Consumer>{([queryMaxLength]) => (<span>{queryMaxLength}</span>)}</queryMaxLengthContext.Consumer>
export const QueryResultLimitSpan = ()=> <queryResultLimitContext.Consumer>{([queryResultLimit]) => (<span>{queryResultLimit}</span>)}</queryResultLimitContext.Consumer>
