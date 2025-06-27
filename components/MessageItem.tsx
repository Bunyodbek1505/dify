import Image from "next/image";
import React from "react";
import avatarImage from "@/public/avatar.png";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialLight,
  materialDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const customCodeStyle = {
  ...materialDark,
  'pre[class*="language-"]': {
    ...materialDark['pre[class*="language-"]'],
    // backgroundColor: "#1B181B",
    padding: "1em",
    borderRadius: "0.5em",
  },
  code: {
    ...(materialDark.code || {}),
  },
};

export default function MessageItem({
  question,
  answer,
  isLoading,
}: {
  question?: string;
  answer?: string;
  isLoading?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      {/* Question (user) */}
      <div className="flex justify-end">
        <div className="rounded-xl px-4 py-3 shadow-sm bg-[var(--inputArea)] text-[var(--foreground)] max-w-[60%] mr-2 font-medium text-base">
          <Image src={avatarImage} alt="avatar" className="w-10 h-10" />
          {question}
        </div>
      </div>
      {/* Answer (AI) */}
      <div className="flex justify-start">
        <div className="prose rounded-xl px-5 py-3 shadow-sm bg-[var(--aiAnswerBg)] text-[var(--foreground)] max-w-[100%] ml-2 border border-[var(--border)] ">
          <div className="flex items-center mb-2 gap-2">
            <span className="font-semibold text-base">1</span>
          </div>
          {isLoading ? (
            <span className="italic text-gray-400">...</span>
          ) : (
            answer && (
              <ReactMarkdown
                components={{
                  code({ inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={customCodeStyle}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  p: (props) => <p className="mb-2" {...props} />,
                  ul: (props) => <ul className="list-disc pl-5" {...props} />,
                  li: (props) => <li className="mb-1" {...props} />,
                  strong: (props) => (
                    <strong className="font-bold" {...props} />
                  ),
                }}
              >
                {answer}
              </ReactMarkdown>
            )
          )}
        </div>
      </div>
    </div>
  );
}
