import React from "react";
import animateOnScroll from "../../utils/AnimateOnScroll";
import { thresholdsHelper, useIntersect } from "../../utils/useIntersect";
import './style.css';




type Props = {
  category1Header: string,
  category2Header: string,
  onSort: (byCategory1: boolean) => void,
  isCompact?: boolean
}
// TODO: Remove the hardcoded buttons (or just the styles?)
export const HistogramHeader = ({category1Header, category2Header, onSort, isCompact}: Props)=>{

  return (
    <div className={`histogram-header ${isCompact ? "histogram-header-compact " : " "}`}>
      <div className="half-item half-item--left">
        <span className="histogram-btn" onClick={()=> onSort(true)}><i className="fas fa-filter"></i></span>
        <span>{category1Header}</span>
      </div>
      <div className="half-item half-item--right">
        <span>{category2Header}</span>
        <span className="histogram-btn" onClick={()=> onSort(false)}><i className="fas fa-filter"></i></span>
      </div>
    </div>
  )

}
HistogramHeader.defaultProps = {
  category1Header: "Length",
  category2Header: "Frequency",
}





type DataPropsContainer = {
  data: DataProps[],
  category1Maximum?: number,
  category2Maximum?: number,
  isCompact?: boolean
}
type DataProps = {
  label?: string,
  category1Value: number,
  category1Annotation?: string,
  category2Value: number,
  category2Annotation?: string,
  
}


export const HistogramData = ({data, category1Maximum, category2Maximum, isCompact}: DataPropsContainer) => {

  const category1Max = category1Maximum ? category1Maximum : Math.max(...data.map(item => item.category1Value))
  const category2Max = category2Maximum ? category2Maximum : Math.max(...data.map(item => item.category2Value))

  const [graphRef] = useIntersect({threshold: [.25, .75], onObservedIntersection: (entry) => animateOnScroll(entry, "histogram-visible")});

  return (
    <div className={`histogram-container ${isCompact ? "histogram-compact " : " "}`} ref={graphRef}>

      {
        data.map((item, index) => (
          true
          ? ( <HistogramDataItem  label={item.label} 
                                category1Value={item.category1Value} 
                                category1Maximum={category1Max} 
                                category1Annotation={item.category1Annotation} 
                                category2Value={item.category2Value} 
                                category2Maximum={category2Max} 
                                category2Annotation={item.category2Annotation}
                                key={index}
                                />
            )
          : ( <HistogramDataItem category1Value={item.category2Value} 
                                 category1Maximum={category2Max} 
                                 category2Value={item.category1Value} 
                                 category2Maximum={category1Max} 
                                 key={index}
                                 />

            )

          )
        )
      }
      
    </div>
  )
}

type ItemProps = {
  label?: string,
  category1Value: number,
  category1Maximum: number,
  category1Annotation?: string,
  category2Value: number,
  category2Maximum: number,
  category2Annotation?: string,
  isCompact?: false
}
export const HistogramDataItem = ({
  label, 
  category1Value, category1Annotation, category1Maximum,
  category2Value, category2Annotation, category2Maximum,
}: ItemProps) => {

  const [graphRef] = useIntersect({threshold: thresholdsHelper(4), onObservedIntersection: (entry) => animateOnScroll(entry, "histogram-visible")});

  return (

    <div className="histogram-bar-container" ref={graphRef}>

      <span className="histogram-bar-label"><span>{label}</span></span>


      <div className="histogram-bar histogram-bar--left">
        <span className="histogram-bar__item"></span>
        <span className="histogram-bar__item histogram-bar__item--main" style={{flexBasis: `${100 * category1Value/category1Maximum}%`}}>
          {category1Annotation && <span className="histogram-bar__text histogram-bar__text--muted">{category1Annotation}</span>}
          <span className="histogram-bar__text">{category1Value}</span>
        </span>
      </div>


      <div className="histogram-bar histogram-bar--right">
        <span className="histogram-bar__item histogram-bar__item--main" style={{flexBasis: `${100 * category2Value/category2Maximum}%`}}>
          <span className="histogram-bar__text">{category2Value}</span>
          {category2Annotation && <span className="histogram-bar__text histogram-bar__text--muted">{category2Annotation}</span>}
        </span>
        <span className="histogram-bar__item"></span>
      </div>

    </div>

  )
}