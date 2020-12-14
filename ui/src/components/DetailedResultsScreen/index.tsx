import React, { CSSProperties } from 'react';
import { TTokenSummary } from '../data.controller/data.types';
import './index.css';
import leftArrow from './assets/LeftArrow.svg';
import designElementPrimary from './assets/DesignElementPrimary.svg';
import designElementAccent from './assets/DesignElementAccent.svg';


export type QueryMeta = {
  createdAt: string | undefined;
  processedIn: number;
}
export type TextMeta = {
  createdAt: string | undefined;
  processedIn: number | undefined;
  type: string | undefined;
  wordCount: number | undefined;
  uniqueWordCount: number | undefined;
}
export type Token = {
  title: string;
  category?: number;
  key?: string;
  frequency?: number;
  length?: number;
}
export type Props = {
  data: TTokenSummary[],
  queryMeta: QueryMeta,
  textMeta: TextMeta,
  tokens: {[key: string]: TTokenSummary},
  onNewQuery: ()=>void,
  onResults: ()=>void,
  onSortByLength: ()=>void,
  onSortByFrequency: ()=>void,
}


export default function DetailedResultsScreen({onResults, onNewQuery, tokens, data}: Props) {


  const extremeTokens = data.reduce(
    (acc, item) => {

      return {
        "longest": {...(item.length > acc.longest.length ? item : acc.longest) },
        "shortest": {...(item.length < acc.shortest.length ? item : acc.shortest) },
        "mostFrequent": {...(item.frequency > acc.mostFrequent.frequency ? item : acc.mostFrequent) },
        "leastFrequent": {...(item.frequency < acc.leastFrequent.frequency ? item : acc.leastFrequent) },
      }

    }, 
    {
      "longest": data[0],
      "shortest": data[0],
      "mostFrequent": data[0],
      "leastFrequent": data[0],
    } 
  )
  

  const cards = Object.keys(extremeTokens).map((key) => {

    const titles = {
      "longest": "Longest Word",
      "shortest": "Shortest Word",
      "mostFrequent": "Most Frequent Word",
      "leastFrequent": "Least Frequent Word",
    }

    return { 
      "title": titles[key as "longest" | "shortest" | "mostFrequent" | "leastFrequent" ] ,
      "fromQuery": {...(extremeTokens as any)[key]},
      "fromText": {...tokens[key]},
      "isCategory1": !(["longest", "shortest"].includes(key)),
      "maxFrequency": extremeTokens.mostFrequent.frequency,
      "maxLength": extremeTokens.longest.length,
    }
  })

  


  return (
    <div className="DetailedResultsScreen w-full h-full flex flex-col">


      <header className="component-header lg:pl-12 mb-8 flex flex-col align-start">
        <h2>Explore Results: Details</h2>
        <button className="btn btn-tertiary mr-auto flex align-center lg:hidden" onClick={onResults}>
          <span className="icon"><img src={leftArrow} alt="left arrow"/></span>
          <span>Back</span>
        </button>
      </header>

      <main>
        <ul>
          {
            cards.map((token, index) => (
              <QueryCard title={token.title}
                        key={index}
                        queryWord={token.fromQuery.key} 
                        queryFrequency={token.fromQuery.frequency} 
                        queryLength={token.fromQuery.length} 
                        textFrequency={token.fromText.frequency} 
                        textLength={token.fromText.length} 
                        textWord={token.fromText.key} 
                        colorFrequency={"var(--primary-500)"} 
                        colorFrequencyMuted={"var(--primary-100)"} 
                        colorLength={"var(--accent-600)"} 
                        colorLengthMuted={"var(--accent-100)"} 
                        colorMain={token.isCategory1 ? "var(--primary-500)" : "var(--accent-600)"} 
                        designElement={token.isCategory1 ? designElementPrimary : designElementAccent} 
                        maxFrequency={token.maxFrequency} 
                        maxLength={token.maxLength} 
              />
            ))
          }

        </ul>
      </main>


      <footer className="component-footer lg:hidden">
        <button className="btn btn-secondary w-full my-8 lg:mt-0" onClick={onNewQuery}><span>New Query</span></button>
      </footer>

    </div>
  );
}













type CardProps = {
  title: string,
  queryWord: string,
  textWord: string,
  colorFrequency: string,
  colorFrequencyMuted: string,
  colorLength: string,
  colorLengthMuted: string,
  colorMain: string,
  designElement?: string
  queryFrequency: number,
  queryLength: number,
  textFrequency: number,
  textLength: number, 
  maxFrequency: number, 
  maxLength: number, 
}



const QueryCard = ({
  title, queryWord, textWord, 
  colorFrequency, colorFrequencyMuted, colorLength, colorLengthMuted, colorMain,
  queryFrequency, queryLength, textFrequency, textLength,
  designElement, maxFrequency, maxLength
}: CardProps)=>{

  const ensureInv = (x: number) => x > 1 ? 1 / x : x

  const styles = {
    "--main-color": colorMain,
    "--category-1-color": colorFrequency,
    "--category-2-color": colorLength,
    "--category-1-color--muted": colorFrequencyMuted,
    "--category-2-color--muted": colorLengthMuted,
  } as CSSProperties


  return (

    <li className="query-card" style={styles}>
      


      <h3 className="query-card__title">{title}</h3>


      <h4 className="query-card__word">
        <span>In Query: </span>
        <span className="query-card__main-word">{queryWord}</span>
      </h4>
      <h4 className="query-card__word query-card__word--muted">
        <span>In Text: </span>
        <span className="query-card__secondary-word">{textWord}</span>
      </h4>


      <h4 className="query-card__text-data ">

        <span className="query-card__main-label">Frequency: </span>
        <span className="query-card__main-data--query">{queryFrequency}</span>
        <span className="query-card__main-data--text">{textFrequency}</span>
        <div className="query-card__main-bars">
          <div style={{width:`${100 * ensureInv(queryFrequency / maxFrequency)}%`}}></div>
          <div style={{width:`${100 * ensureInv(textFrequency / maxFrequency)}%`}}></div>
        </div>

        <span className="query-card__secondary-label">Length: </span>
        <span className="query-card__secondary-data--query">{queryLength}</span>
        <span className="query-card__secondary-data--text">{textLength}</span>
        <div className="query-card__secondary-bars">
          <div style={{width:`${100 * ensureInv(queryLength / maxLength)}%`}}></div>
          <div style={{width:`${100 * ensureInv(textLength / maxLength)}%`}}></div>
        </div>

      </h4>


      {/* <div><div style={{width:`${100 * ensureInv(queryFrequency / textFrequency)}%`}}></div></div> */}
      {/* <div><div style={{width:`${100 * ensureInv(queryLength / textLength)}%`}}></div></div> */}


      <span className="design-element"><img src={designElement} alt="Design Element"/></span>



    </li>


  )
}