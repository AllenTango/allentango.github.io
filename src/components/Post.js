import { useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const renderers = {
  code: ({ language, value }) => {
    return (
      <SyntaxHighlighter
        style={dracula}
        language={language}
        children={value}
        showLineNumbers={true}
        wrapLongLines={true}
      />
    );
  },
};

function Post({ title, body, labels, created_time, origin_url }) {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div className="post" onClick={() => setShowDetail(!showDetail)}>
      <h2 className="post-title">{title}</h2>
      <div className="flex justify-between">
        <div>
          {labels
            ? labels.map((label) => (
                <span
                  key={label["id"]}
                  className="label"
                  style={{
                    color: "#" + label["color"],
                    borderColor: "#" + label["color"],
                  }}
                >
                  # {label["name"]}
                </span>
              ))
            : ""}
        </div>
        <span className="time text-gray-400">{created_time.slice(0, -10)}</span>
      </div>
      <div className="pt-4">
        <ReactMarkdown
          plugins={[gfm]}
          renderers={renderers}
          children={showDetail ? body : body.slice(0, 150) + "..."}
        />
      </div>
    </div>
  );
}

export default Post;
