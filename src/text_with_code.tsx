import React, { memo } from "react";
import { CopyBlock, dracula } from "react-code-blocks";

interface Props {
  text: string;
}

function TextWithCode({ text }: Props) {
  const lines = text.split("\n");
  const result = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();

    if (line.startsWith("```")) {
      const language = line.slice(3) || "text";
      let j = i + 1;
      while (j < lines.length && lines[j] !== "```") {
        j += 1;
      }
      const code = lines.slice(i + 1, j).join("\n");
      result.push(
        <CopyBlock
          key={`${i}-code`}
          text={code}
          language={language}
          theme={dracula}
        />
      );
      i = j;
    } else {
      result.push(<p key={`${i}-text`}>{line}</p>);
    }
  }

  return <>{result}</>;
}

export default memo(TextWithCode);
