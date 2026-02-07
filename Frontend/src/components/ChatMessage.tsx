import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Message } from "../types";
import { formatTimestamp } from "../utils/detectInputType";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  message: Message;
  index: number;
}

export const ChatMessage = ({ message, index }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`w-full ${
        isUser ? "bg-gray-950" : "bg-gray-900"
      }`}
    >
      <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6 md:px-8 lg:px-10">
        <div className="flex gap-4 md:gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0 flex items-start pt-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${
                isUser
                  ? "bg-blue-600"
                  : "bg-gray-700"
              }`}
            >
              {isUser ? (
                <User className="w-6 h-6" />
              ) : (
                <Bot className="w-6 h-6" />
              )}
            </div>
          </div>

          {/* Message Content */}
          <div className="flex-1 min-w-0 pt-1">
            {isUser ? (
              <p className="text-lg text-gray-50 whitespace-pre-wrap break-words font-medium leading-relaxed">
                {message.content}
              </p>
            ) : (
              <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-sans prose-p:text-gray-100 prose-a:text-blue-400">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-50 font-sans">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-100 font-sans">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-semibold mt-5 mb-2 text-gray-200 font-sans">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-lg font-semibold mt-4 mb-2 text-gray-200 font-sans">
                        {children}
                      </h4>
                    ),
                    p: ({ children }) => (
                      <p className="my-4 text-lg text-gray-100 leading-8 font-normal">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="my-5 ml-8 space-y-3 text-gray-100 list-disc">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="my-5 ml-8 space-y-3 text-gray-100 list-decimal">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-lg leading-8">
                        {children}
                      </li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold text-gray-50 font-sans">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-gray-200 font-sans">
                        {children}
                      </em>
                    ),
                    code: ({ className, children }) => {
                      const isInline = !className;
                      return isInline ? (
                        <code className="bg-gray-800 px-2.5 py-1.5 rounded text-base font-mono text-cyan-300 border border-gray-700">
                          {children}
                        </code>
                      ) : (
                        <code className="block bg-gray-950 p-5 rounded-lg border border-gray-700 overflow-x-auto text-base font-mono text-green-300 my-5 shadow-md">
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="bg-gray-950 border border-gray-700 rounded-lg overflow-hidden my-5 shadow-md">
                        {children}
                      </pre>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-gray-600 pl-5 italic text-gray-300 my-5 bg-gray-800/30 py-3 rounded-r">
                        {children}
                      </blockquote>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline hover:underline font-semibold"
                      >
                        {children}
                      </a>
                    ),
                    table: ({ children }) => (
                      <table className="border-collapse border border-gray-700 w-full my-5">
                        {children}
                      </table>
                    ),
                    th: ({ children }) => (
                      <th className="border border-gray-700 p-3 bg-gray-800 font-bold text-gray-100 text-left">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="border border-gray-700 p-3 text-gray-200">
                        {children}
                      </td>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}

            {/* Timestamp & Tokens */}
            {!isUser && (
              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-800 text-sm text-gray-500">
                <span>{formatTimestamp(message.timestamp)}</span>
                {(message.inputTokens !== undefined ||
                  message.outputTokens !== undefined) && (
                  <span className="font-mono">
                    {message.inputTokens || 0} → {message.outputTokens || 0}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
