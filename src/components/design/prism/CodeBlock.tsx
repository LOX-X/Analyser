import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import { useEffect } from 'react';

function CodeBlock({children}:any) {
  useEffect(() => {
    Prism.highlightAll();
  }, [children]);

  return (
    <div>
    <pre ><code className="lang-js">{children}</code></pre>
    </div>
  )
}

export default CodeBlock;