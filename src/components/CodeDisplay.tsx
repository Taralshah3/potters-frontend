import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-core';
import 'prismjs/plugins/autoloader/prism-autoloader';

interface Props {
    code: string;
}

function CodeDisplay(props: Props) {
    const codeRef = useRef<HTMLElement>(null);


    useEffect(() => {
      if (codeRef.current) {
        Prism.highlightElement(codeRef.current,  undefined);
      }
    }, [props.code]);
  
    return (
      <pre >
        <code ref={codeRef} className="language-javascript">
          {props.code}
        </code>
      </pre>
    );
  }

  export default CodeDisplay;
