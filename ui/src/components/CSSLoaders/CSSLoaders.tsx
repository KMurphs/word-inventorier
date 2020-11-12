import React from "react";
import { scrollIDIntoViewHelper } from "../../utils/utils";
import './CSSLoaders.css';


export class CSSLoaderEllipsis extends React.Component {
  render() {
    return <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>;
  }
}