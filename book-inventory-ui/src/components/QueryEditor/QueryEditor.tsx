import React, { useState } from 'react';


import './QueryEditor.css';
import { TUIQueryItem } from '../../data.controller/data.types';
import { CustomInputNumberUndefined } from '../CustomInput/CustomInput';



enum TUIQueryItemEnum{
  TOPN = 0,
  MIN,
  MAX
}
type TProps = {
  data: TUIQueryItem,
  onChange: (updatedData: TUIQueryItem)=>void
}
const QueryEditor: React.FC<TProps> = ({data, onChange}) => {

  const [localData, _setLocalData] = useState<TUIQueryItem>(data)
  const setLocalData = (val: string, field: TUIQueryItemEnum)=>{
    let tmp: TUIQueryItem = localData;
    (field === TUIQueryItemEnum.TOPN) && (tmp.topN = parseFloat(val));
    (field === TUIQueryItemEnum.MIN) && (tmp.minLength = parseFloat(val));
    (field === TUIQueryItemEnum.MAX) && (tmp.maxLength = parseFloat(val));
    _setLocalData({...tmp});
  }
  return (
              <div className="query-editor">

                <div className="query-item">
                  <div className={"supporting-text"}>Enter minimum length of tokens of interest</div>
                  <CustomInputNumberUndefined value={localData.topN} handleChange={(val)=>setLocalData(val, TUIQueryItemEnum.TOPN)} />
                </div>
                
                <div className="query-item">
                  <div className={"supporting-text"}>Enter minimum length of tokens of interest</div>
                  <CustomInputNumberUndefined value={localData.minLength} handleChange={(val)=>setLocalData(val, TUIQueryItemEnum.MIN)} />
                </div>

                <div className="query-item">
                  <div className={"supporting-text"}>Enter maximum length of tokens of interest</div>
                  <CustomInputNumberUndefined value={localData.maxLength} handleChange={(val)=>setLocalData(val, TUIQueryItemEnum.MAX)} />
                </div>

                <div className="query-item">
                  <button className="btn btn-main" onClick={()=>onChange({...localData})}>Save Query</button>
                </div>
              </div>
  );


}

export default QueryEditor;
