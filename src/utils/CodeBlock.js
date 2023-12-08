import React, { useRef } from 'react';

import 'highlight.js/styles/default.css';

export default function CodeBlock({ language, code }) {
  const preRef = useRef(null);
  
  return (
    <div className="code-block" style={{ position: 'relative'}}>
      <pre>
        <code id={language} ref={preRef} className={language}>
          {code}
        </code>
      </pre>
    </div>
  );
}