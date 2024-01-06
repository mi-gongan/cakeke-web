import MDEditor from "@uiw/react-md-editor";
import React, { useEffect, useState } from "react";
import { mdRehypeRewrite } from "../../util/option";
import remarkGfm from "remark-gfm";

function Terms() {
  const [markdown, setMarkdown] = useState(``);

  useEffect(() => {
    fetch("/policy/terms.md")
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);
  return (
    <div
      style={{
        padding: "20px 20px",
      }}
    >
      <MDEditor.Markdown
        source={markdown}
        remarkPlugins={[remarkGfm]}
        style={{
          backgroundColor: "white",
          color: "black",
        }}
        rehypeRewrite={mdRehypeRewrite}
      />
    </div>
  );
}

export default Terms;
