import React, { useEffect, useRef } from 'react';
import ProgressIndicator from '../ProgressIndicator';
import './index.css';



interface Props{
  exposeLogo: (newEl: HTMLElement)=>void,
}
export default function Header({exposeLogo}: Props) {

  const logo = useRef<HTMLSpanElement | null>(null);
  // logo.current && setTmp(logo.current)
  // console.log(logo)

  useEffect(()=>{
    logo.current && exposeLogo(logo.current)

    return ()=>{}
  }, [logo.current])

  return (
    <div className="Header app-section flex justify-center w-full md:justify-between pt-8 lg:pt-4 max-w-screen-xl mx-auto">
        <h1 className="logo hidden lg:block"><span ref={logo}>Words</span></h1>
        <div className="header-progress flex justify-center md:w-9/12 lg:justify-end flex-grow"><ProgressIndicator/></div>
    </div>
  );
} 
  