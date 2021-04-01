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
    <div className="post">
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
          children={showDetail ? body : body.slice(0, 80) + "..."}
        />
      </div>
      <div
        className="text-pink-500 cursor-pointer flex justify-center items-start border-t-4 rounded-b-2xl mt-2 shadow-lg"
        onClick={() => setShowDetail(!showDetail)}
      >
        {!showDetail ? (
          <div className="down h-12 w-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        ) : (
          <div className="up h-12 w-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
