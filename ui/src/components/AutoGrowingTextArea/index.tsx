import React, { useState } from "react";
import './style.css';

type Props = {

}


export const AutoGrowingTextArea = ({  }: Props) => {

  const [value, setValue] = useState<string>("");


  return (
    <div className="autogrowing-textarea-container">
      
      <div className="autogrow-textarea" data-replicated-value={value}>
        {/* <textarea name="text" id="text" onInput={this.parentNode.dataset.replicatedValue = this.value"></textarea> */}
        <textarea name="autogrowing-textarea" id="autogrowing-textarea" required rows={1} onInput={evt=>setValue((evt.target as HTMLTextAreaElement).value)}></textarea>
        <label htmlFor="autogrowing-textarea">Enter Text to be processed:</label>
      </div>
      
      

    </div>

  )
}

AutoGrowingTextArea.defaultProps = {

};