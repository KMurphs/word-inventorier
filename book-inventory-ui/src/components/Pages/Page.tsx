import React from 'react';
import './Page.css';



type TProps = {
  onClose: ()=>void
}
const Page: React.FC<TProps> = ({children, onClose}) => {

  return (
    <div className="page-component">
      <div className="page-content">
        {children}
      </div>
      <div className="close-page" onClick={evt=>onClose()}><span><i className="fas fa-times-circle"></i></span></div>
    </div>
  )

}

export default Page