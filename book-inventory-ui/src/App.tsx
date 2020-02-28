import React, { useState, useRef } from 'react';
import './App.css';
import { TUIQueryItem, TBookSummary } from './data.controller/data.types';
import Query from './components/Query/Query';
import Modal from './components/Modal/Modal';
import { CustomInputNumberUndefined } from './components/CustomInput/CustomInput';
import Page from './components/Pages/Page';
import QueryEditor from './components/QueryEditor/QueryEditor';
import DataController from './data.controller/data.controller';



function App() {

  let dc = useRef<DataController|null>(null);
  (dc.current === null) && (dc.current = new DataController());
  console.log('[App]: Data Controller Version: ', dc.current.getVersion())

  const [isModalActive, setIsModalActive] = useState<boolean>(false)
  const [isEditingQuery, setIsEditingQuery] = useState<boolean>(false)
  const [indexOfQueryOnModal, setIndexOfQueryOnModal] = useState<number>(-1)
  const [hasResults, setHasResults] = useState<boolean>(false)
  const [textToProcess, setTextToProcess] = useState<string>("")
  const [queries, setQueries] = useState<TUIQueryItem[]>([])
  const [queriesResults, setQueriesResults] = useState<TBookSummary|null>()

  const handleQueryEdit = (queryIndex: number)=>{
    setIsEditingQuery(true)
    setIndexOfQueryOnModal(queryIndex)
    setIsModalActive(true)
  }
  const handleQueryView = (queryIndex: number)=>{
    setIsEditingQuery(true)
    setIndexOfQueryOnModal(queryIndex)
    setIsModalActive(true)
  }
  const handleResultSummaryView = () =>{
    setIsEditingQuery(true)
    // setIndexOfQueryOnModal(queryIndex)
    setIsModalActive(true)
  }
  const handleQueryRemoval = (queryIndex: number)=>{
    setQueries(qs => qs.filter((q, index) => index !== queryIndex))
  }
  const resetUi = ()=>{
    setQueries([]);
    setIsEditingQuery(false)
    setIndexOfQueryOnModal(-1)
    setIsModalActive(false)
    setTextToProcess("")
  }
  const handleBookProcessing = async ()=>{
    const res = await dc.current?.processBook({book: textToProcess, queries: queries}, ()=>{})
    setQueriesResults(res)
    setHasResults(true)
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
                    defaultValue={textToProcess}
          >
          </textarea>
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






        <section className="modal-container">
          <Modal isActive={isModalActive} onDeactivate={()=>setIsModalActive(false)}>
            <Page onClose={()=>setIsModalActive(false)}>
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
            </Page>
          </Modal>
        </section>       




      </section>
    </main>
  );
}

export default App;
