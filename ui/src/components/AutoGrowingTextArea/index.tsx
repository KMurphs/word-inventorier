import React, { useState } from "react";
import './style.css';

type Props = {
  text: string,
  setText: (newValue: string) => void,
}



export const AutoGrowingTextArea = ({ text, setText }: Props) => {

  // const [value, setValue] = useState<string>("");

  return (
    <div className="autogrowing-textarea-container">
      
      <div className="autogrow-textarea" data-replicated-value={text}>
        {/* <textarea name="text" id="text" onInput={this.parentNode.dataset.replicatedValue = this.value"></textarea> */}
        <textarea name="autogrowing-textarea" id="autogrowing-textarea" required rows={1} onInput={evt=>setText((evt.target as HTMLTextAreaElement).value)}></textarea>
        <label htmlFor="autogrowing-textarea">Enter Text to be processed:</label>
      </div>
      
    </div>
  )
}

AutoGrowingTextArea.defaultProps = {};