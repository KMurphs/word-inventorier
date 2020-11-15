import React from "react";
import './style.css';


export class CSSLoaderEllipsis extends React.Component {
  render() {
    return <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>;
  }
}


export class CSSLoaderDualRing extends React.Component {
  render() {
    return <div className="lds-dual-ring"></div>;
  }
}