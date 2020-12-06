import React, { useState } from 'react';
import './index.css';


export interface Props {
  label: string,
  onChange: (fileContent: string) => void
}
export const FileInput = ({onChange}: Props) => {

  const [progress, setProgress] = useState<number>(0)


  const readFile = (file: File | null | undefined)=>{

    const reader = new FileReader();
    reader.onload = function(this: FileReader){ onChange(this.result as string); }
    reader.onprogress = function(this: FileReader, evt: ProgressEvent<FileReader>): any{
      if (evt.loaded && evt.total) {
        // const percent = (evt.loaded / evt.total) * 100;
        setProgress((evt.loaded / evt.total) * 100)
        // console.log(`Progress: ${Math.round(percent)}`);
      }
    }
    file && reader.readAsText(file);
  }



  return (
    <div className="FileReader" style={{"--progress": progress} as React.CSSProperties}>
      <input type="file" onChange={evt => readFile(evt.target.files?.item(0))}/>
    </div>
  );
}


