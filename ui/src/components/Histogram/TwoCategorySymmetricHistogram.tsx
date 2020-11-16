import React from "react";
import './style.css';




type Props = {
  category1Header: string,
  category2Header: string,
}
// TODO: Remove the hardcoded buttons (or just the styles?)
export const HistogramHeader = ({category1Header, category2Header}: Props)=>{

  return (
    <div className="histogram-header">
      <div className="half-item half-item--left">
        <span className="histogram-btn"><i className="fas fa-filter"></i></span>
        <span>{category1Header}</span>
      </div>
      <div className="half-item half-item--right">
        <span>{category2Header}</span>
        <span className="histogram-btn"><i className="fas fa-filter"></i></span>
      </div>
    </div>
  )

}
HistogramHeader.defaultProps = {
  category1Header: "Length",
  category2Header: "Frequency",
}





type DataPropsContainer = {
  data: DataProps[]
}
type DataProps = {
  label?: string,
  category1Value: number,
  category1Annotation?: string,
  category2Value: number,
  category2Annotation?: string,
}


export const HistogramData = ({data}: DataPropsContainer) => {

  const category1Maximum = Math.max(...data.map(item => item.category1Value))
  const category2Maximum = Math.max(...data.map(item => item.category2Value))

  return (
    <div className="histogram-container">

      {
        data.map((item, index) => (

            <HistogramDataItem  label={item.label} 
                                category1Value={item.category1Value} 
                                category1Maximum={category1Maximum} 
                                category1Annotation={item.category1Annotation} 
                                category2Value={item.category2Value} 
                                category2Maximum={category2Maximum} 
                                category2Annotation={item.category2Annotation}
                                key={index}
                                />

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
}
export const HistogramDataItem = ({
  label, 
  category1Value, category1Annotation, category1Maximum,
  category2Value, category2Annotation, category2Maximum,
}: ItemProps) => {

  return (

    <div className="histogram-bar-container">

      <span className="histogram-bar-label"><span>{label}</span></span>


      <div className="histogram-bar histogram-bar--left">
        <span className="histogram-bar__item"></span>
        <span className="histogram-bar__item histogram-bar__item--main" style={{flexBasis: `${100 * category1Value/category1Maximum}%`}}>
          <span className="histogram-bar__text histogram-bar__text--muted">{category1Annotation}</span>
          <span className="histogram-bar__text">{category1Value}</span>
        </span>
      </div>


      <div className="histogram-bar histogram-bar--right">
        <span className="histogram-bar__item histogram-bar__item--main" style={{flexBasis: `${100 * category2Value/category2Maximum}%`}}>
          <span className="histogram-bar__text">{category2Value}</span>
          <span className="histogram-bar__text histogram-bar__text--muted">{category2Annotation}</span>
        </span>
        <span className="histogram-bar__item"></span>
      </div>

    </div>

  )
}