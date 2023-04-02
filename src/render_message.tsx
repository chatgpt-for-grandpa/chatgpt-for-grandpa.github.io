import React, { useState, memo } from "react";
import MarkdownIt from "markdown-it";
import MarkdownItKaTeX from "@traptitech/markdown-it-katex";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "katex/dist/katex.min.css";
import "./render_message.scss";
import { TbMarkdown, TbMarkdownOff } from "react-icons/tb";

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
  uuid: string;
  defaultEnableMd: boolean;
}

function RenderMessage({ text, uuid, defaultEnableMd }: Props) {
  const [enableMd, setEnableMd] = useState(defaultEnableMd);

  const checkboxId = `md-checkbox-${uuid}`;
  const mdHtml = md.render(text);

  return (
    <>
      <div className="switch-markdown">
        <input
          type="checkbox"
          id={checkboxId}
          checked={enableMd}
          onChange={() => {
            setEnableMd(!enableMd);
          }}
        />
        <label htmlFor={checkboxId}>
          {enableMd ? <TbMarkdown /> : <TbMarkdownOff />}
        </label>
      </div>
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
