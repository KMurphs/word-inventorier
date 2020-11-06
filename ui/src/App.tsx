import React, { useState, useRef } from 'react';
import './App.css';
import { TUIQueryItem, TBookSummary } from './data.controller/data.types';
import Query from './components/Query/Query';
import Modal from './components/Modal/Modal';
import Page from './components/Pages/Page';
import QueryEditor from './components/QueryEditor/QueryEditor';
import DataController from './data.controller/data.controller';
import QueryViewer from './components/QueryViewer/QueryViewer';
import SummaryViewer from './components/SummaryViewer/SummaryViewer';



function App() {

  let dc = useRef<DataController|null>(null);
  (dc.current === null) && (dc.current = new DataController());
  console.log('[App]: Data Controller Version: ', dc.current.getVersion())

  const [isModalActive, setIsModalActive] = useState<boolean>(false)
  const [isEditingQuery, setIsEditingQuery] = useState<boolean>(false)
  const [isViewingResult, setIsViewingResult] = useState<boolean>(false)
  const [isViewingSummary, setIsViewingSummary] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [indexOfQueryOnModal, setIndexOfQueryOnModal] = useState<number>(-1)
  const [hasResults, setHasResults] = useState<boolean>(false)
  const [textToProcess, setTextToProcess] = useState<string>("")
  const [feedback, setFeedback] = useState<string>("")
  const [queries, setQueries] = useState<TUIQueryItem[]>([])
  const [queriesResults, setQueriesResults] = useState<TBookSummary|null>()

  const handleQueryEdit = (queryIndex: number)=>{
    setIsEditingQuery(true)
    setIndexOfQueryOnModal(queryIndex)
    setIsModalActive(true)
  }
  const handleQueryView = (queryIndex: number)=>{
    setIsViewingResult(true)
    setIndexOfQueryOnModal(queryIndex)
    setIsModalActive(true)
  }
  const handleResultSummaryView = () =>{
    setIsViewingSummary(true)
    // setIndexOfQueryOnModal(queryIndex)
    setIsModalActive(true)
  }
  const handleQueryRemoval = (queryIndex: number)=>{
    setQueries(qs => qs.filter((q, index) => index !== queryIndex))
  }
  const resetUi = ()=>{
    setQueries([]);
    setIsEditingQuery(false)
    setIsViewingResult(false)
    setIsViewingSummary(false)
    setIndexOfQueryOnModal(-1)
    setIsModalActive(false)
    setTextToProcess("")
    setIsFetching(false)
    setHasResults(false)
    setFeedback("")
  }
  const handleModalClose = ()=>{
    
    setIsModalActive(false)

    setTimeout(()=>{
      setIsEditingQuery(false)
      setIsViewingResult(false)
      setIsViewingSummary(false)
      setIndexOfQueryOnModal(-1)
    }, 300)
    
  }
  const handleBookProcessing = async ()=>{
    
    setTimeout(()=>{
      setIsFetching(true)
      setHasResults(false)
      setFeedback("Processing Text. This will take a minute... or two...")
    }, 0)
    
    const res = await dc.current?.processBook({book: textToProcess, queries: queries}, ()=>{})
    setQueriesResults(res)
    

    setTimeout(()=>{
      setIsFetching(false)
      setHasResults(true)
      setFeedback("Text was successfully processed... ")
    }, 0)

    setTimeout(()=>{
      setFeedback("")
    }, 3000)
  }
  const handleCopy = (evt: any, text: string)=>{
    evt.preventDefault();
    console.log('[App]: \n', text);
    navigator.clipboard.writeText(text);
  }
  console.warn("[App]: Query Results: ", queriesResults)
  return (
    <main className="App">
      <section className="app-container">

        <section className="book-selector">
          <div className="selector-icons">
            <span className="reset-selection" onClick={evt => resetUi()}><i className="fas fa-reply-all"></i></span>
            {hasResults && (<span className="view-result" onClick={evt => handleResultSummaryView()}><i className="fas fa-eye"></i></span>)}
          </div>

          <textarea onChange={(evt)=>setTextToProcess(evt.target.value)}
                    placeholder="Enter the text to be processed, or its url..."
                    // defaultValue={textToProcess}
                    value={textToProcess}
          >
          </textarea>
          <div className={`progressbar ${isFetching ? 'progressbar--running' : ''}`}></div>

          <div className="feedback">
            {feedback && (<p>{feedback}</p>)}
          </div>
        </section>




        <section className="queries-area">
          {
            queries && (
              queries.map((query, index) => <Query data={query} key={index} hasResults={hasResults} index={index+1} onChange={()=>handleQueryEdit(index)} onView={()=>handleQueryView(index)} onRemove={()=>handleQueryRemoval(index)}/>)
            )
          }
          <div className="add-query" 
               onClick={evt=>setQueries(queries=> [...queries, {minLength: 0,maxLength: 10,topN: 50}])}>
            <i className="fas fa-plus"></i>
            <span>*Add Query</span>
          </div>
        </section>





        
        <section className="submit-button-area">
          <button className="btn btn-main" onClick={evt => handleBookProcessing()}>
            Process Content
          </button>
        </section>






        <section className={`modal-container ${isViewingResult || isViewingSummary ? 'modal-container--bg-white' : ''}`}>
          <Modal isActive={isModalActive} onDeactivate={()=>handleModalClose()} >
            <Page onClose={()=>handleModalClose()}>
              {
                isEditingQuery && (
                  <QueryEditor  data={queries[indexOfQueryOnModal]} 
                              onChange={data => setQueries(qs => {
                                setTimeout(()=>{
                                  setIsEditingQuery(false)
                                }, 300)
                                
                                setIsModalActive(false)
                                return qs.map((q, index) => {
                                  (index === indexOfQueryOnModal) && (q = {...data})
                                  return q
                                })
                              })}
                  />
                )
              }
              {
                isViewingResult && queriesResults && (
                  <QueryViewer data={queriesResults?.results[indexOfQueryOnModal]} onCopy={(evt, text)=>handleCopy(evt, text)}/>
                )
              }

              {
                isViewingSummary && queriesResults && (
                  <SummaryViewer data={queriesResults} onCopy={(evt, text)=>handleCopy(evt, text)}/>
                )
              }
            </Page>
          </Modal>
        </section>       




      </section>
    </main>
  );
}

export default App;
