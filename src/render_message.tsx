import React, { useState, memo } from "react";
import Form from "react-bootstrap/Form";
import MarkdownIt from "markdown-it";
import MarkdownItKaTeX from "@traptitech/markdown-it-katex";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "katex/dist/katex.min.css";

const md: MarkdownIt = new MarkdownIt({
  linkify: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
        }</code></pre>`;
      } catch (__) {}
    }

    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
}).use(MarkdownItKaTeX, { throwOnError: false, errorColor: "#aa1111" });

interface Props {
  text: string;
  defaultEnableMd: boolean;
}

function RenderMessage({ text, defaultEnableMd }: Props) {
  const [enableMd, setEnableMd] = useState(defaultEnableMd);

  const mdHtml = md.render(text);

  return (
    <>
      <Form className="switch-markdown border rounded px-1 d-inline-block">
        <Form.Check
          type="switch"
          id="md-switch"
          checked={enableMd}
          label="M"
          onChange={() => {
            setEnableMd(!enableMd);
          }}
        />
      </Form>
      {enableMd ? (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: mdHtml }} />
      ) : (
        <p>{text}</p>
      )}
    </>
  );
}

export default memo(RenderMessage);
