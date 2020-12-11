import React from 'react';
import ProgressIndicator from '../ProgressIndicator';
import './index.css';


interface Props {
  title?: string
}

export default function ProgressSection({title}: Props) {
  return (
    <div className="progress-section w-full py-12 px-4">
      <section className="super-group">
        <div className="group justify-start"><h2>{title}</h2></div>
        <div className="group my-8"><ProgressIndicator animateClass="animate-accent"/></div>
      </section>
    </div>
  );
}
