import React from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
} from "@codesandbox/sandpack-react";

function Editor() {
  return (
    <SandpackProvider
      template="react"
      files={{
        "/App.js": {
          code: `import React from 'react';

export default function App() {
  return <h1>Hello, Live Code Editor!</h1>;
}`,
          active: true,
        },
      }}
    >
      <SandpackLayout>
        {/* Code Editor */}
        <SandpackCodeEditor style={{ height: "400px" }} />

        {/* Preview Pane */}
        <SandpackPreview style={{ border: "1px solid #ccc", height: "400px" }} />

        {/* Console Output */}
        <SandpackConsole style={{ height: "150px" }} />
      </SandpackLayout>
    </SandpackProvider>
  );
}

export default Editor;
